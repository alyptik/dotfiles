{exec}            = require("child_process")
activeEditor      = atom.workspace.getActiveTextEditor()
notifications     = atom.notifications

if activeEditor
    filePath      = activeEditor.getPath().split(" ").join("\\ ")
    fileDirectory = String(filePath).split('/')
    fileName      = fileDirectory[fileDirectory.length - 1]
    fileDirectory.pop()
    fileDirectory = fileDirectory.join("/")

module.exports    =
    namcap: ()->
        if activeEditor && /PKGBUILD$/.test filePath
            exec "cd #{fileDirectory} && namcap #{fileName}", (err, stdout, stderr)->
                notifications.addError stderr + "command is: namcap #{filePath}", dismissable: true if err
                notifications.addSuccess "Your PKGBUILD seems fine.\nBuild a package from it and run namcap \non said package to perform further checks." unless err
