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
    mksrcinfo: ()->
        if activeEditor && /PKGBUILD$/.test filePath
            exec "cd #{fileDirectory} && makepkg --printsrcinfo > .SRCINFO", (err, stdout, stderr)->
                notifications.addError stderr + "cd #{fileDirectory} && mksrcinfo", dismissable: true if err
                notifications.addSuccess ".SRCINFO updated" unless err
