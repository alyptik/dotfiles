/* @flow */
import path from 'path'
import {spawn} from 'child_process'
import {insertAutocompleteToken, promisedExec, processAutocompleteItem} from './helpers'
import {filter} from 'fuzzaldrin'
import { CompositeDisposable } from 'atom'
import {exec, find} from 'atom-linter'
import type {AutocompleteProvider} from './types'

module.exports =
  { config:
      { pathToFlowExecutable:
          { type: 'string'
          , default: 'flow'
          }
      }
  , activate(){
      console.log('activating autocomplete-flow')

      // getting custom value
      this.lastConfigError = {}
      this.subscriptions = new CompositeDisposable()
      this.cmdString = 'flow'
      this.subscriptions.add(atom.config.observe('autocomplete-flow.pathToFlowExecutable', (pathToFlow) => {
        this.cmdString = pathToFlow || 'flow'
      }))
      if (atom.inDevMode()) {
        console.log('activating... autocomplete-flow')
      }
    }
  , deactivate(){
      if (atom.inDevMode()) {
        console.log('deactivating... autocomplete-flow')
      }
      exec(this.cmdString, ['stop'], {}).catch(() => null)
      this.subscriptions.dispose()
    }
  , getCompletionProvider(): AutocompleteProvider {
      const that = this
      const provider =
        { selector: '.source.js, .source.js.jsx, .source.jsx'
        , disableForSelector: '.source.js .comment, source.js .keyword'
        , inclusionPriority: 1
        , excludeLowerPriority: true
        , async getSuggestions({editor, bufferPosition, prefix}){
            if (!prefix) {
              return []
            }
            const file = editor.getPath()
            const currentContents = editor.getText()
            const cursor = editor.getLastCursor()
            const line = cursor.getBufferRow()
            const col = cursor.getBufferColumn()

            const flowConfig = find(file, '.flowconfig')
            if (!flowConfig) {
              if (!that.lastConfigError[file] ||
                  that.lastConfigError[file] + 5 * 60 * 1000 < Date.now()) {
                atom.notifications.addWarning(
                '[Autocomplete-Flow] Missing .flowconfig file.'
                , { detail: 'To get started with Flow, run `flow init`.'
                  , dismissable: true,
                  }
                )
                that.lastConfigError[file] = Date.now()
              }
              return []
            }

            let options = {}
            const args = ['autocomplete', '--json', file]

            // const [cwd] = atom.project.relativizePath(file)
            options.cwd = path.dirname(file) //cwd

            try {
              const stringWithACToken = insertAutocompleteToken(currentContents, line, col)
              const result = await promisedExec(that.cmdString, args, options, stringWithACToken)
              if (!result || !result.length) {
                return []
              }
              // If it is just whitespace and punctuation, ignore it (this keeps us
              // from eating leading dots).
              const replacementPrefix = /^[\s.]*$/.test(prefix) ? '' : prefix
              const candidates = result.map(item => processAutocompleteItem(replacementPrefix, item))

              // return candidates
              return filter(candidates, replacementPrefix, { key: 'displayText' })
            } catch (e) {
              const errorM: string = String(e).toLowerCase()
              if ( errorM.includes('rechecking')
                || errorM.includes('launching')
                || errorM.includes('processing')
                || errorM.includes('starting')
                || errorM.includes('spawned')
                || errorM.includes('logs')
                || errorM.includes('initializing')
              ) {
                return []
              }
              console.log('[autocomplete-flow] ERROR:', e)
              return []
            }
          }
        }

      return provider
    }
  }
