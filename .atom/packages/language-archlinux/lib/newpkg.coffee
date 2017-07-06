pkgInputView        = require('./pkgInputView')
module.exports      =
    newpkg: ()->
        @newpkgview = new pkgInputView()
