'use babel'

import {CompositeDisposable} from 'atom'
import {MODE_CLASS} from '../constants'

export default {
  modalPanel: null,
  subscriptions: null,
  isEnabled: false,
  editor: null,
  editorView: null,
  capitalizeNextDisposable: null,
  isCapitalizing: false,

  activate (state) {
    this.capitalizeNextDisposable = new CompositeDisposable()
    this.subscriptions = new CompositeDisposable()
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'camel-case-mode:toggle': () => this.toggle(),
      'camel-case-mode:capitalize-next': () => this.capitalizeNext()
    }))
  },

  deactivate () {
    this.subscriptions.dispose()
  },

  serialize () {
    return null
  },

  enable () {
    this.isEnabled = true
    this.editor = atom.workspace.getActiveTextEditor()
    this.editorView = atom.views.getView(this.editor)
    this.editorView.classList.add(MODE_CLASS)
    this.editor.onDidDestroy(() => this.disable)
  },

  disable () {
    this.isEnabled = false
    this.isCapitalizing = false
    this.capitalizeNextDisposable && this.capitalizeNextDisposable.dispose()
    this.editorView && this.editorView.classList.remove(MODE_CLASS)
    this.editorView = null
  },

  toggle () {
    return this.isEnabled
      ? this.disable()
      : this.enable()
  },

  capitalizeNext () {
    if (this.isCapitalizing) {
      this.disable()
      return this.editor.insertText(' ')
    }

    this.isCapitalizing = true

    this.capitalizeNextDisposable = new CompositeDisposable(
      this.editor.onWillInsertText(({text, cancel}) => {
        if (!text || text.length !== 1) return
        if (text === '\n') {
          return this.disable()
        }
        cancel()
        this.capitalizeNextDisposable.dispose()
        this.editor.insertText(text.toUpperCase())
        this.isCapitalizing = false
      })
    )
  }
}
