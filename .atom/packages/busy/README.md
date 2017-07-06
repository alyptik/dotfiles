# Busy (as always!)

An indicator which let's you know some background tasks is currently being run.

![busy gif](https://raw.githubusercontent.com/noseglid/atom-busy/master/busy.gif)

## API

In your `package.json`
```json
  "consumedServices": {
    "busy": {
      "versions": {
        "^1.0.0": "consumeBusy"
      }
    }
  }
```

Consume the provided registry
```javascript
consumeBusy(registry) {
  this.busyRegistry = registry;
}
```

#### `begin(identifier, text)`
Call when a long running task has begun.
```javascript
this.busyRegistry.begin('packageName.uniqueIdentifier', 'Description of long running task');
```

  * `identifier`: A unique identifier, prefixed with your package name to avoid collisions.
  * `text`: Text describing the long running task. Displayed when hovering the busy-wheel.

#### `end(identifier[, success])`
Call to signal that the long running task has ended
```javascript
this.busyRegistry.end('packageName.uniqueIdentifier')
```

  * `identifier`: The identifier of the task specified when calling `begin`.
  * `success`: Whether the operation succeeded or not. Default `true`.

## Integrations

_Feel free to add your integration to this list_

  * [build](http://atom.io/packages/build)
  * [java-autocomplete-minus](http://atom.io/packages/java-autocomplete-minus)
