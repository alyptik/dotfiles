[![Build Status](https://travis-ci.org/fgnass/diffparser.svg?branch=master)](https://travis-ci.org/fgnass/diffparser)

# Unified diff parser for Node and the browser

This project is a ES2015 version of
https://github.com/sergeyt/parse-diff.

It comes with a full test suite and in addition to line numbers also provides `position` information as required by the [GitHub Comments API](https://developer.github.com/v3/pulls/comments/#create-a-comment).

```js
import parse from 'diffparser';

const diff = `
diff --git a/file b/file
index 123..456 789
--- a/file
+++ b/file
@@ -1,2 +1,2 @@
- line1
+ line2
`;

parse(diff);
```

This will return an array (one entry per file) with the following structure:

```json
[
  {
    "from": "file",
    "to": "file",
    "chunks": [
      {
        "content": "@@ -1,2 +1,2 @@",
        "changes": [
          {
            "type": "del",
            "del": true,
            "ln": 1,
            "position": 1,
            "content": "- line1"
          },
          {
            "type": "add",
            "add": true,
            "ln": 1,
            "position": 2,
            "content": "+ line2"
          }
        ],
        "oldStart": 1,
        "oldLines": 2,
        "newStart": 1,
        "newLines": 2
      }
    ],
    "deletions": 1,
    "additions": 1,
    "index": [
      "123..456",
      "789"
    ]
  }
]
```

## Optional Rename Detection

You can pass `{ findRenames: true }` as option in order to detect renamed files:

```js
const diff = `
diff --git a/bar b/bar
new file mode 100644
index 0000000..4e4b354
--- /dev/null
+++ b/bar
@@ -0,0 +1,2 @@
+this is a
+sample file
diff --git a/foo b/foo
deleted file mode 100644
index 4e4b354..0000000
--- a/foo
+++ /dev/null
@@ -1,2 +0,0 @@
-this is a
-sample file
`;

parse(diff, { findRenames: true });
```

This will return the following array:

```js
[
  {
    "renamed": true,
    "from": "foo",
    "to": "bar"
  }
]
```

# License

MIT
