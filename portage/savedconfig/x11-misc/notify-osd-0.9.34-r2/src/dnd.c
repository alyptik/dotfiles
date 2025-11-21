/*******************************************************************************
**3456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789
**      10        20        30        40        50        60        70        80
**
** notify-osd
**
** dnd.c - implements the "do not disturb"-mode, e.g. gsmgr, presentations
**
** Copyright 2009 Canonical Ltd.
**
** Authors:
**    Mirco "MacSlow" Mueller <mirco.mueller@canonical.com>
**    David Barth <david.barth@canonical.com>
**
** This program is free software: you can redistribute it and/or modify it
** under the terms of the GNU General Public License version 3, as published
** by the Free Software Foundation.
**
** This program is distributed in the hope that it will be useful, but
** WITHOUT ANY WARRANTY; without even the implied warranties of
** MERCHANTABILITY, SATISFACTORY QUALITY, or FITNESS FOR A PARTICULAR
** PURPOSE.  See the GNU General Public License for more details.
**
** You should have received a copy of the GNU General Public License along
** with this program.  If not, see <http://www.gnu.org/licenses/>.
**
*******************************************************************************/

#include "config.h"
#include <stdlib.h>

#include <glib.h>
#include <glib-object.h>

#include <dbus/dbus-glib.h>

#include <X11/Xproto.h>
#include <X11/Xlib.h>
#include <X11/Xutil.h>
#include <X11/Xatom.h>
#include <gdk/gdkx.h>

#include <libwnck/libwnck.h>

#include "dbus.h"

static DBusGProxy *gsmgr = NULL;

gboolean
dnd_is_xscreensaver_active ()
{
	GdkDisplay *display = gdk_display_get_default ();

	Atom XA_BLANK =
		gdk_x11_get_xatom_by_name_for_display(display, "BLANK");
	Atom XA_LOCK =
		gdk_x11_get_xatom_by_name_for_display(display, "BLANK");
	Atom XA_SCREENSAVER_STATUS =
		gdk_x11_get_xatom_by_name_for_display(display,
						      "_SCREENSAVER_STATUS");
	gboolean active = FALSE;

	Atom type;
	int format;
	int status;
	unsigned long nitems, bytesafter;
	unsigned char* data = NULL;

	Display *dpy = gdk_x11_get_default_xdisplay ();
	Window   win = gdk_x11_get_default_root_xwindow ();

	gdk_error_trap_push ();
	status = XGetWindowProperty (dpy, win,
				     XA_SCREENSAVER_STATUS,
				     0, 999, False, XA_INTEGER,
				     &type, &format, &nitems, &bytesafter,
				     (unsigned char **) &data);
	gdk_flush ();
	gdk_error_trap_pop_ignored ();

	if (status == Success
	    && type == XA_INTEGER
	    && nitems >= 3
	    && data != NULL)
	{
		CARD32* tmp_data = (CARD32*) data;

		active = (tmp_data[0] == XA_BLANK || tmp_data[0] == XA_LOCK)
			&& ((time_t)tmp_data[1] > (time_t)666000000L);

		g_debug ("Screensaver is currently active");
	}

	if (data != NULL)
		free (data);

	return active;
}

static DBusGProxy*
get_screensaver_proxy (void)
{
	if (gsmgr == NULL)
	{
		DBusGConnection *connection = dbus_get_connection ();
		gsmgr = dbus_g_proxy_new_for_name (connection,
						   "org.gnome.ScreenSaver",
						   "/org/gnome/ScreenSaver",
						   "org.gnome.ScreenSaver");
	}

	return gsmgr;
}	

gboolean
dnd_is_screensaver_inhibited ()
{
	GError  *error = NULL;
	gboolean inhibited = FALSE;
	char **list;

	if (! get_screensaver_proxy ())
		return FALSE;

	if (dbus_g_proxy_call_with_timeout (
		    gsmgr, "GetInhibitors", 2000, &error,
		    G_TYPE_INVALID,
		    G_TYPE_STRV, &list,
		    G_TYPE_INVALID))
	{
		if (error)
		{
			g_warning ("dnd_is_screensaver_inhibited(): "
			           "got error \"%s\"\n",
			           error->message);
			g_error_free (error);
			error = NULL;
		}

		/* if the list is not empty, the screensaver is inhibited */
		if (*list)
		{
			inhibited = TRUE;
			g_debug ("Screensaver has been inhibited");
		}
		g_strfreev (list);
	}

	return inhibited;
}

gboolean
dnd_is_screensaver_active ()
{
	GError  *error = NULL;
	gboolean active = FALSE;;

	if (! get_screensaver_proxy ())
		return FALSE;

	dbus_g_proxy_call_with_timeout (
		gsmgr, "GetActive", 2000, &error,
		G_TYPE_INVALID,
		G_TYPE_BOOLEAN, &active,
		G_TYPE_INVALID);

	if (error)
	{
		g_warning ("dnd_is_screensaver_active(): Got error \"%s\"\n",
		           error->message);
		g_error_free (error);
		error = NULL;
	}

	if (active)
		g_debug ("Gnome screensaver is active");

	return active;
}

static gboolean
dnd_is_online_presence_dnd ()
{
	/* TODO: ask FUSA if we're in DND mode */

	return FALSE;
}

static int
is_fullscreen_cb (WnckWindow *window, WnckWorkspace *workspace)
{
	if (wnck_window_is_visible_on_workspace (window, workspace)
		&& wnck_window_is_fullscreen (window))
	{
		return 0;
	} else {
		return 1;
	}
}

gboolean
dnd_has_one_fullscreen_window (void)
{
	gboolean result;

	WnckScreen *screen = wnck_screen_get_default ();
	wnck_screen_force_update (screen);
	WnckWorkspace *workspace = wnck_screen_get_active_workspace (screen);
	GList *list = wnck_screen_get_windows (screen);
	GList *item = g_list_find_custom (list, workspace, (GCompareFunc) is_fullscreen_cb);
	result = item != NULL;
#ifdef HAVE_WNCK_SHUTDOWN
	wnck_shutdown ();
#endif
	return result;
}

/* Tries to determine whether the user is in "do not disturb" mode */
gboolean
dnd_dont_disturb_user (void)
{
	return (dnd_is_online_presence_dnd()
		|| dnd_is_xscreensaver_active()
		|| dnd_is_screensaver_active()
		|| dnd_is_screensaver_inhibited()
		|| dnd_has_one_fullscreen_window()
		);
}
