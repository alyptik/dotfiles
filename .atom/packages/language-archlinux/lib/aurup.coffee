{exec}             = require("child_process")
aurUpView          = require('./aurUpView')
mksrcinfo          = require('./mksrcinfo')
updpkgsums         = require('./updpkgsums')
activeEditor       = atom.workspace.getActiveTextEditor()

if activeEditor
    filePath       = activeEditor.getPath().split(" ").join("\\ ")
    fileDirectory  = String(filePath).split('/')
    fileName       = fileDirectory[fileDirectory.length - 1]
    fileDirectory.pop()
    fileDirectory  = fileDirectory.join("/")

module.exports     =
    aurup: ()->
        @updpkgsums
        @mksrcinfo
        @aurUpView = new aurUpView()
