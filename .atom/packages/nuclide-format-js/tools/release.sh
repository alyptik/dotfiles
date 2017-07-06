#/bin/bash

set -e

npm run build

# Checkout a detached head so we don't advance master when we publish
git checkout --detach $(git rev-parse HEAD)

# "apm" doesn't honor ".npmignore" files. As a workaround, ".npmignore" is
# merged into ".gitignore":
cat >> .gitignore <<- EOF
############################
## !!!AUTO GENERATED !!! ###
############################
EOF
cat .npmignore >> .gitignore

# Commit built files & remove newly ignored ones.
VERSION_TAG=v$(node -p 'require("./package.json").version')
git ls-files --ignored --exclude-standard -z | xargs -0 git rm --cached
git add --all
git commit --message="Committing changes in preparation for publishing $VERSION_TAG"
git tag $VERSION_TAG

echo
echo "If you're statisfied with what is to be published, then run:"
echo
echo "    git push master"
echo "    git push origin $VERSION_TAG"
echo "    apm publish --tag $VERSION_TAG"
echo "    npm publish"
echo
