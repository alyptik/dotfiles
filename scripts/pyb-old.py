#!/usr/bin/env python2
#
# [SNIPPET_NAME: Webkit Browser]
# [SNIPPET_CATEGORIES: Webkit, PyGTK]
# [SNIPPET_DESCRIPTION: Create a simple browser using the webkit API]
# [SNIPPET_AUTHOR: Andy Breiner <breinera@gmail.com>]
# [SNIPPET_LICENSE: GPL]
# [SNIPPET_DOCS: http://ardoris.wordpress.com/2009/04/26/a-browser-in-14-lines-using-python-and-webkit, http://www.aclevername.com/articles/python-webgui]

import pygtk
pygtk.require('2.0')
import gtk

#you need to import webkit and gobject, gobject is needed for threads
import webkit
import gobject

class Browser:
    default_site = "http://search.yahoo.com/"

    def delete_event(self, widget, event, data=None):
        return False

    def destroy(self, widget, data=None):
        gtk.main_quit()

    def __init__(self):
        gobject.threads_init()
        self.window = gtk.Window(gtk.WINDOW_TOPLEVEL)
        self.window.set_resizable(True)
        self.window.connect("delete_event", self.delete_event)
        self.window.connect("destroy", self.destroy)

        #webkit.WebView allows us to embed a webkit browser
        #it takes care of going backwards/fowards/reloading
        #it even handles flash
        self.web_view = webkit.WebView()
        self.web_view.open(self.default_site)

        toolbar = gtk.Toolbar()

        #create the back button and connect the action to
        #allow us to go backwards using webkit
        self.back_button = gtk.ToolButton(gtk.STOCK_GO_BACK)
        self.back_button.connect("clicked", self.go_back)

        #same idea for forward button
        self.forward_button = gtk.ToolButton(gtk.STOCK_GO_FORWARD)
        self.forward_button.connect("clicked", self.go_forward)

        #again for refresh
        refresh_button = gtk.ToolButton(gtk.STOCK_REFRESH)
        refresh_button.connect("clicked", self.refresh)

        #add the buttons to the toolbar
        toolbar.add(self.back_button)
        toolbar.add(self.forward_button)
        toolbar.add(refresh_button)

        #entry bar for typing in and display URLs, when they type in a site
        #and hit enter the on_active function is called
        self.url_bar = gtk.Entry()
        self.url_bar.connect("activate", self.on_active)

        #anytime a site is loaded the update_buttons will be called
        self.web_view.connect("load_committed", self.update_buttons)

        scroll_window = gtk.ScrolledWindow(None, None)
        scroll_window.add(self.web_view)
        

        vbox = gtk.VBox(False, 0)
        vbox.pack_start(toolbar, False, True, 0)
        vbox.pack_start(self.url_bar, False, True, 0)
        vbox.add(scroll_window)

        self.window.add(vbox)
        self.window.show_all()

    def on_active(self, widge, data=None):
        '''When the user enters an address in the bar, we check to make
           sure they added the http://, if not we add it for them.  Once
           the url is correct, we just ask webkit to open that site.'''
        url = self.url_bar.get_text()
        try:
            url.index("://")
        except:
            url = "http://"+url
        self.url_bar.set_text(url)
        self.web_view.open(url)

    def go_back(self, widget, data=None):
        '''Webkit will remember the links and this will allow us to go
           backwards.'''
        self.web_view.go_back()

    def go_forward(self, widget, data=None):
        '''Webkit will remember the links and this will allow us to go
           forwards.'''
        self.web_view.go_forward()

    def refresh(self, widget, data=None):
        '''Simple makes webkit reload the current back.'''
        self.web_view.reload()

    def update_buttons(self, widget, data=None):
        '''Gets the current url entry and puts that into the url bar.
           It then checks to see if we can go back, if we can it makes the
           back button clickable.  Then it does the same for the foward
           button.'''
        self.url_bar.set_text( widget.get_main_frame().get_uri() )
        self.back_button.set_sensitive(self.web_view.can_go_back())
        self.forward_button.set_sensitive(self.web_view.can_go_forward())

    def main(self):
        gtk.main()

if __name__ == "__main__":
    browser = Browser()
    browser.main()
