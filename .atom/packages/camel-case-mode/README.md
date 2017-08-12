# camelCaseMode

press a key to enable *__camelCaseMode__*, which capitalises the letter pressed
after `space`. so like:

please<kbd>space</kbd>help<kbd>space</kbd>me<kbd>space</kbd>mrs<kbd>space</kbd>jones comes out like `pleaseHelpMeMrsJones`

you can press space again to get out of *__camelCaseMode__*

can enable some kind of indication for yoself that you in camelCaseMode by way of

```less
// styles.less
.camel-case-mode {
  border: 1px solid #ff2a50;
}
```

(`.camel-case-mode` is set on `atom-text-editor`)

## TODO

* write tests
* deactivate on <kbd>C-c</kbd>, <kbd>C-g</kbd>, <kbd>Esc</kbd>
* apologise to everybody for everything i've ever done
* meet a princess and live in a castle
* or a prince
