{View}                          = require 'space-pen'
{TextEditorView}                = require 'atom-space-pen-views'
path                            = require "path"
{exec}                          = require "child_process"
activeEditor                    = atom.workspace.getActiveTextEditor()
notifications                   = atom.notifications
LoadingView                     = null
loadingView                     = null

if activeEditor
    filePath                    = activeEditor.getPath().split(" ").join("\\ ")
    fileDirectory               = String(filePath).split('/')
    fileName                    = fileDirectory[fileDirectory.length - 1]
    fileDirectory.pop()
    fileDirectory               = fileDirectory.join("/")
    pkg                         = fileDirectory.substring(0, fileDirectory.lastIndexOf('/'));

module.exports                  =
    class pkgInputView extends View
        detaching: false
        @content: ->
            @div "Please enter your commit message, remember to keep it short and informative.", =>
                @subview 'selectEditor', new TextEditorView(mini: true)

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
            @detaching          = true
            selectEditorFocused = @selectEditor.isFocused
            @selectEditor.setText('')
            @panel.destroy()
            super
            @detaching          = false

        confirm: ->
          if activeEditor
            commit = @selectEditor.getText()
            LoadingView        ?= require "./loading-view"
            loadingView        ?= new LoadingView()
            dirname             = path.join(__dirname, '..')
            loadingView.show()
            exec "cd #{fileDirectory} && git add --all && git commit -m '#{commit}' && git push origin master", (err, stdout, stderr)->
              loadingView?.hide()
              notifications.addError "#{pkg} has not been updated successfully.\n#{err}", dismissable: true if err
              notifications.addSuccess "#{pkg} has been updated in the <abbr title='Arch User Repository'>AUR</abbr>." unless err
              pkgpath           = "#{fileDirectory}/PKGBUILD"
              atom.workspace.open(pkgpath) unless err
            @detach()

        attach: ->
            @panel             ?= atom.workspace.addModalPanel(item: this)
            @panel.show()
            @selectEditor.focus()
