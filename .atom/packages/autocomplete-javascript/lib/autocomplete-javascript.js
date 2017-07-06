'use babel';

import AutocompleteJavascriptView from './autocomplete-javascript-view';
import { CompositeDisposable } from 'atom';

export default {

  autocompleteJavascriptView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.autocompleteJavascriptView = new AutocompleteJavascriptView(state.autocompleteJavascriptViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.autocompleteJavascriptView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'autocomplete-javascript:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.autocompleteJavascriptView.destroy();
  },

  serialize() {
    return {
      autocompleteJavascriptViewState: this.autocompleteJavascriptView.serialize()
    };
  },

  toggle() {
    console.log('AutocompleteJavascript was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
