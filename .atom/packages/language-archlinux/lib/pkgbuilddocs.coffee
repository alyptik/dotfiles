{exec}        = require("child_process")
activeEditor  = atom.workspace.getActiveTextEditor()
notifications = atom.notifications

module_export =
    pkgbuilddocs: ()->
        if activeEditor
          exec "xdg-open https://wiki.archlinux.org/index.php/PKGBUILD", (err, stdout, stderr)->
                notifications.addError stderr + "Opening https://wiki.archlinux.org/index.php/PKGBUILD in your web browser failed!", dismissable: true if err
                notifications.addSuccess "PKGBUILD documentation has been opened in your default web browser." unless err
