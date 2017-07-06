{View}                    = require 'space-pen'
{TextEditorView}          = require 'atom-space-pen-views'
path                      = require "path"
{exec}                    = require "child_process"
name                      = atom.config.get 'language-archlinux.username'
email                     = atom.config.get 'language-archlinux.email'
activeEditor              = atom.workspace.getActiveTextEditor()
notifications             = atom.notifications
LoadingView               = null
loadingView               = null

if activeEditor
    filePath              = activeEditor.getPath().split(" ").join("\\ ")
    preferredPath         = atom.config.get('language-archlinux.preferredPath')
    if preferredPath
      fileDirectory       = preferredPath
    else
      fileDirectory       = String(filePath).split('/')
      fileName            = fileDirectory[fileDirectory.length - 1]
      fileDirectory.pop()
      fileDirectory       = fileDirectory.join("/")

module.exports            =
    class pkgInputView extends View
        detaching: false
        @content: ->
          @div =>
            @div "Please enter the name of the AUR package you wish to create.\n\n"
            @span style: "font-weight: bold;", "Note"
            @span ": it has \nto be all lower case, with no spaces, semicolons or full stops (also known as periods:"
            @code "."
            @span "). Dashes should be used to separate name \ncomponents normally separated by \nwhitespace. If your package is built from git sources it should have the "
            @code "-git"
            @span " suffix."
            @subview 'PKG', new TextEditorView(mini: true)
            @div "Please enter the URL of the AUR package you wish to create. If your package \nis built from git sources this URL should be to your package's upstream git repository."
            @subview 'URL', new TextEditorView(mini: true)
            @label 'Escape (', style: 'float: left;'
            @kbd   'Esc', style: 'float: left;'
            @label ') to exit', style: 'float: left;'
            @label 'Enter (\u21B5) to confirm', style: 'float: right;'

        initialize: ->
            atom.commands.add 'atom-text-editor', 'core:confirm', => @confirm()
            atom.commands.add 'atom-text-editor', 'core:cancel', => @detach()
            @attach()

        toggle: ->
            if @hasParent()
                @detach
            else
                @attach()

        detach: ->
            return unless @hasParent()
            @detaching    = true
            PKGFocused    = @PKG.isFocused
            URLFocused    = @URL.isFocused
            @PKG.setText('')
            @URL.setText('')
            @panel.destroy()
            super
            @detaching    = false

        confirm: ->
          if activeEditor
            pkg           = @PKG.getText()
            _pkg          = pkg.replace("-git", "")
            url           = @URL.getText()
            LoadingView  ?= require "./loading-view"
            loadingView  ?= new LoadingView()
            dirname       = path.join(__dirname, '..')
            loadingView.show()
            if pkg != _pkg
              exec "git clone ssh+git://aur@aur.archlinux.org/#{pkg}.git #{fileDirectory}/#{pkg} && if ! [ -f #{fileDirectory}/#{pkg}/PKGBUILD ]; then cp #{dirname}/resources/git/PKGBUILD #{fileDirectory}/#{pkg}/PKGBUILD && sed -i -e 's/<PKG>/#{pkg}/g' -e 's|<NAME>|#{name}|g' -e 's|<EMAIL>|#{email}|g' -e 's/<\_PKG>/#{_pkg}/g' -e 's|<URL>|#{url}|g' #{fileDirectory}/#{pkg}/PKGBUILD; fi", (err, stdout, stderr)->
                loadingView?.hide()
                notifications.addError "#{err}", dismissable: true if err
                notifications.addSuccess "#{pkg}'s AUR git repository has been cloned to #{fileDirectory}/#{pkg}." unless err
                pkgpath = "#{fileDirectory}/#{pkg}/PKGBUILD"
                atom.workspace.open(pkgpath) unless err
            else
              exec "git clone ssh+git://aur@aur.archlinux.org/#{pkg}.git #{fileDirectory}/#{pkg} && if ! [ -f #{fileDirectory}/#{pkg}/PKGBUILD ]; then cp #{dirname}/resources/default/PKGBUILD #{fileDirectory}/#{pkg}/PKGBUILD && sed -i -e 's/<PKG>/#{pkg}/g' -e 's/<NAME>/#{name}/g' -e 's/<EMAIL>/#{email}/g' #{fileDirectory}/#{pkg}/PKGBUILD; fi", (err, stdout, stderr)->
                loadingView?.hide()
                notifications.addError "#{err}", dismissable: true if err
                notifications.addSuccess "#{pkg}'s AUR git repository has been cloned to #{fileDirectory}/#{pkg}." unless err
                pkgpath = "#{fileDirectory}/#{pkg}/PKGBUILD"
                atom.workspace.open(pkgpath) unless err
            @detach()

        attach: ->
            @panel       ?= atom.workspace.addModalPanel(item: this)
            @panel.show()
            @PKG.focus()
            @URL.focus()
