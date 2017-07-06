#!/usr/bin/env python2
#
# Based on
# <http://www.eurion.net/python-snippets/snippet/Webkit%20Browser.html>

# A python and gtkwebkit web browser

import pygtk
import gtk
import webkit
import sys
import os
pygtk.require('2.0')


class Browser:
    try:
        startpage = sys.argv[1]
    except:
        startpage = "file:///"
    try:
        startpage.index("://")
    except:
        startpage = "http://" + startpage

    def __init__(self):
        ''' Browser initialization '''

        # Define main window
        self.window = gtk.Window(gtk.WINDOW_TOPLEVEL)
        self.window.set_size_request(850, 550)
        self.window.set_resizable(True)
        self.window.connect("delete_event", self.delete_event)
        self.window.connect("destroy", self.destroy)

        # Define Webkit
        self.web_view = webkit.WebView()
        self.web_view.open(self.startpage)

        # Set custom css style
        self.web_view.get_settings().set_property('user-stylesheet-uri', 'file://' +
                                                  os.path.expanduser("~/.local/share/style.css"))
        self.web_view.get_settings().set_property('enable-frame-flattening', 'TRUE')

        # Create a table to contain everything
        self.interface = gtk.Table(rows=2, columns=1)
        self.interface.set_col_spacings(5)
        self.interface.set_row_spacings(2)

        # Create and attach webkit browser window
        self.viewport = gtk.ScrolledWindow(None, None)
        self.viewport.add(self.web_view)
        self.interface.attach(self.viewport, 0, 6, 1, 2, xoptions=gtk.EXPAND |
                              gtk.FILL, yoptions=gtk.EXPAND | gtk.FILL)

        # Create and attach gtk back button
        self.backbutton = gtk.ToolButton(gtk.STOCK_GO_BACK)
        self.backbutton.connect("clicked", self.goback)
        self.interface.attach(self.backbutton, 0, 1, 0, 1,
                              xoptions=gtk.SHRINK, yoptions=gtk.SHRINK)

        # Create and attach gtk forward button
        self.forwardbutton = gtk.ToolButton(gtk.STOCK_GO_FORWARD)
        self.forwardbutton.connect("clicked", self.goforward)
        self.interface.attach(self.forwardbutton, 1, 2, 0,
                              1, xoptions=gtk.SHRINK, yoptions=gtk.SHRINK)

        # Create and attach gtk entry bar for typing in and display URLs
        self.urlbar = gtk.Entry()
        self.urlbar.connect("activate", self.gourlbar)
        self.interface.attach(
            self.urlbar,
            2,
            3,
            0,
            1,
            xoptions=gtk.EXPAND | gtk.FILL,
            yoptions=gtk.SHRINK)

        # Create and attach gtk zoom out button
        self.zoomoutbutton = gtk.ToolButton(gtk.STOCK_ZOOM_OUT)
        self.zoomoutbutton.connect("clicked", self.dozoomout)
        self.interface.attach(self.zoomoutbutton, 3, 4, 0,
                              1, xoptions=gtk.SHRINK, yoptions=gtk.SHRINK)

        # Create and attach gtk zoom in button
        self.zoominbutton = gtk.ToolButton(gtk.STOCK_ZOOM_IN)
        self.zoominbutton.connect("clicked", self.dozoomin)
        self.interface.attach(self.zoominbutton, 4, 5, 0,
                              1, xoptions=gtk.SHRINK, yoptions=gtk.SHRINK)

        # Create and attach gtk menu button
        self.menubutton = gtk.ToolButton(gtk.STOCK_INDEX)
        self.menubutton.connect("clicked", self.showmenu)
        self.interface.attach(self.menubutton, 5, 6, 0, 1,
                              xoptions=gtk.SHRINK, yoptions=gtk.SHRINK)

        # When a website is loaded redraw is called
        self.web_view.connect("load_committed", self.redraw)

        # Add our table to the main window and display it
        self.window.add(self.interface)
        self.window.show_all()

    def showmenu(self, widget, data=None):
        ''' Show a menu '''
        self.menugohome = gtk.MenuItem("Prev")
        self.menugohome.connect("activate", self.gohome)
        self.menugohome.add(self.menugohome)

        #self.menuOpt1 = gtk.MenuItem("Shuffle")
        #self.menuOpt1("activate", self.savepageas)
        # self.add(self.menuOpt)

        #self.menuOpt2 = gtk.RadioMenuItem(None, "Loop")
        #self.menuOpt2.connect("activate", self.nullmenuitem)
        # self.add(self.menuOpt2)

    def savepageas(self, widget, data=None):
        uri = self.savepageas.get_text()
        self.web_view.download_uri(uri)

    def gohome(self, widget, data=None):
        self.web_view.open(startpage)

    def gourlbar(self, widget, data=None):
        ''' Open the url entered into the urlbar, Adding http:// if needed '''
        url = self.urlbar.get_text()
        try:
            url.index("://")
        except:
            url = "http://" + url
        self.urlbar.set_text(url)
        self.web_view.open(url)

    def goback(self, widget, data=None):
        ''' Go Back one page '''
        self.web_view.go_back()

    def goforward(self, widget, data=None):
        ''' Go forward one page '''
        self.web_view.go_forward()

    def dozoomin(self, widget, data=None):
        ''' Zoom page in '''
        oldzoom = self.web_view.get_zoom_level()
        self.web_view.set_zoom_level(oldzoom + 0.07)

    def dozoomout(self, widget, data=None):
        ''' Zoom page out '''
        oldzoom = self.web_view.get_zoom_level()
        self.web_view.set_zoom_level(oldzoom - 0.07)

    def refresh(self, widget, data=None):
        ''' Reload current page '''
        self.web_view.reload()

    def redraw(self, widget, data=None):
        ''' Redraw user interface. Set urlbar text and clickability of buttons '''
        self.urlbar.set_text(widget.get_main_frame().get_uri())
        self.backbutton.set_sensitive(self.web_view.can_go_back())
        self.forwardbutton.set_sensitive(self.web_view.can_go_forward())

    def delete_event(self, widget, event, data=None):
        return False

    def destroy(self, widget, data=None):
        gtk.main_quit()

    def main(self):
        gtk.main()

if __name__ == "__main__":
    browser = Browser()
    browser.main()
