{exec}                   = require("child_process")
activeEditor             = atom.workspace.getActiveTextEditor()
notifications            = atom.notifications
LoadingView              = null
loadingView              = null

if activeEditor
    filePath             = activeEditor.getPath().split(" ").join("\\ ")
    fileDirectory        = String(filePath).split('/')
    fileName             = fileDirectory[fileDirectory.length - 1]
    fileDirectory.pop()
    fileDirectory        = fileDirectory.join("/")

module.exports           =
    makepkg: ()->
        if activeEditor && /PKGBUILD$/.test filePath
            LoadingView ?= require "./loading-view"
            loadingView ?= new LoadingView()
            loadingView.show()
            exec "cd #{fileDirectory} && makepkg -f", (err, stdout, stderr)->
                loadingView?.hide()
                notifications.addError stderr + "filePath is #{filePath}; fileDirectory is #{fileDirectory}", dismissable: true if err
                notifications.addSuccess "Package built!" unless err
