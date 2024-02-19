A Brief Tour of the Makepkg Process: What Makes a Pacman Package
================================================================

Introduction
------------

This is a terse document covering the anatomy of a package built for the pacman
package manager.  

The following example commands can mostly run verbatim to manually create a
package without makepkg.


Building
--------

build()
    This is used for the creation and generation of needful resources and
    files.  This function will create the ``src`` directory which is referred
    to via the ``$srcdir`` variable.

    A typical procedure for most projects might look like this:

.. code-block:: sh

    mkdir src
    # Extract the source into src
    cd src
    ./configure --prefix=/usr
    make


Installation
------------

package()
    The separation of build and installation happens here.  Fakeroot is used to
    maintain appropriate permissions while not actually running as root.  That
    is, the facade of root permission is maintained so long real root privilege
    is not needed.
     
.. code-block:: sh

    mkdir pkg
    cd src/program
    fakeroot -- make DESTDIR=../../pkg install


Metadata
--------

The meat of the data pacman depends on is now generated, this includes a simple
key value pair file called ``.PKGINFO`` and an "mtree", the ``.MTREE``.

A ``.PKGINFO`` is just a simple collection of what one would express in the
PKGBUILD, almost exactly.  Keys with multiple entries are simply repeated.

.. code-block:: sh

    cd pkg
    cat << EOF > .PKGINFO
    pkgname = $pkgname
    pkgver = $pkgver-$pkgrel
    pkgdesc = $pkgdesc

    url = $url
    license = $license

    builddate = $(date -u '+%s')
    size = $(du -sb --apparent-size | awk '{print $1}')

    arch = $(uname -m)

    depend = libfoo
    depend = libbar
    depend = libbaz

    makedepend = buildlibfoo
    makedepend = buildlibbar
    makedepend = buildlibbaz
    EOF

An mtree is essentially a way to generate a map of a directory structure with
all kinds of attributes included, such as permissions, uids, etc.  This allows
pacman to easily know what the attributes should be so that any issues can be
cross-checked when using the ``-Qk`` option.

Bsdtar is then used to generate the ``.MTREE`` file.  This disables !all of the
attributes and then enables a selected few.

When creating the mtree, the ``.PKGINFO`` file needs to be first in the 
archive.

.. code-block:: sh

    cd pkg
    fakeroot -- env LANG=C bsdtar -czf .MTREE --format=mtree --options='!all,use-set,type,uid,gid,mode,time,size,md5,sha256,link' .PKGINFO *

Package
-------

All that remains is to generate a tarball of our package.  We use fakeroot
again as with everything during the package phase.

.. code-block:: sh

    cd pkg
    fakeroot -- env LANG=C bsdtar -cf - .MTREE .PKGINFO * | xz -c -z - > $pkgname-$pkgver-$pkgrel-$arch.tar.xz


Example
-------

.. code-block:: sh

    #!/usr/bin/env bash
    # Basic makepkg which just creates a package for antimicro, built from git.

    # Because I don't do any error handling, just bail if any command fails for
    # any reason.
    set +e 

    startdir="$PWD"
    srcdir="$startdir"/src
    pkgdir="$startdir"/pkg

    # The pkgrel just indicates the version of the build itself, independent of
    # the pkgver, although a pkgver bump resets the pkgrel to 1.
    pkgrel=1
    arch=$(uname -m)

    # Check for all dependencies.  This command will return any which are
    # missing, each one on a newline.
    pacman -T cmake qt5-tools libxtst qt5-base sdl2 libxkbcommon-x11

    # Build.
    mkdir -p "$srcdir"
    cd "$srcdir"
    git clone git://github.com/Ryochan7/antimicro --depth 1

    cd antimicro
    pkgver="$(git describe | sed 's/-/.r/; s/-/./')" # No hyphens allowed in the version.
    cmake -DMAKE_INSTALL_PREFIX=/usr -DUSE_SDL2=ON
    make

    # Installation.
    mkdir -p "$pkgdir"
    fakeroot -- make DESTDIR="$pkgdir" install

    # Package.
    cd "$pkgdir"
    cat <<EOF > .PKGINFO
    pkgname = antimicro-git
    pkgver = $pkgver-$pkgrel
    pkgdesc = Map keyboard and mouse actions to gamepad buttons, inspired by qjoypad.
    url = https://github.com/Ryochan7/antimicro
    builddate = $(date -u '+%s')
    packager = Unknown Packager
    size = $(du -sb --apparent-size "$pkgdir" | awk '{print $1}')
    arch = $arch
    license = GPL3
    conflict = antimicro
    provides = antimicro
    depend = libxtst
    depend = qt5-base
    depend = sdl2
    depend = libxkbcommon-x11
    makedepend = cmake
    makedepend = qt5-tools
    EOF

    fakeroot -- env LANG=C bsdtar -czf .MTREE --format=mtree --options='!all,use-set,type,uid,gid,mode,time,size,md5,sha256,link' .PKGINFO *
    fakeroot -- env LANG=C bsdtar -cf - .MTREE .PKGINFO * | xz -c -z - > "$startdir"/antimicro-git-"$pkgver-$pkgrel-$arch".pkg.tar.xz

    # Test.
    cd "$startdir"
    namcap antimicro-git-"$pkgver-$pkgrel-$arch".pkg.tar.xz
