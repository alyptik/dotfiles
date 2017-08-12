/* @flow */

export function getMessage(type: ?string = 'Error', filePath: ?string, range: ?Object): Object {
  const message = {
    type,
    text: 'Some Message',
    filePath,
    range,
    version: 1,
  }
  return message
}

export function getLinter(name: ?string = 'some'): Object {
  return {
    name,
    grammarScopes: [],
    lint() {},
  }
}

export function dispatchCommand(target: Object, commandName: string) {
  atom.commands.dispatch(atom.views.getView(target), commandName)
}
