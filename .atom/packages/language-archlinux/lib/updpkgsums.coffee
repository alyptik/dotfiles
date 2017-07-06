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
    updpkgsums: ()->
        if activeEditor && /PKGBUILD$/.test filePath
            exec "updpkgsums #{filePath}", (err, stdout, stderr)->
                notifications.addError stderr + "command is: updpkgsums #{filePath}", dismissable: true if err
                notifications.addSuccess "PKGBUILD checksums updated" unless err
