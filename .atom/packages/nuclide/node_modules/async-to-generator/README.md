# async-to-generator

This is Babel's [`asyncToGenerator`](https://github.com/babel/babel/blob/v6.17.0/packages/babel-helpers/src/helpers.js#L216-L245) helper without any dependencies. When used in combination with [`babel-plugin-transform-async-to-module-method`](https://babeljs.io/docs/plugins/transform-async-to-module-method/), it serves as an alternative to using [`babel-plugin-transform-runtime`](https://babeljs.io/docs/plugins/transform-runtime/) – which carries with it `core-js` and attempts to polyfill `Promise`.

## Usage

Add the [`babel-plugin-transform-async-to-module-method`](https://babeljs.io/docs/plugins/transform-async-to-module-method/) transform, and in your `.babelrc`:

```json
{
  "plugins": [
    ["transform-async-to-module-method", {
      "module": "async-to-generator",
      "method": "default"
    }]
  ]
}
```
