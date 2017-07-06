'use babel';

import StatusBarView from './status-bar-view';
import Registry from './registry';

export default {
  activate() {
    this.registry = new Registry();
    this.views = [];
    this.tasksBegun = [];
    this.tasksEnded = [];

    this.registry.on('begin', ::this.beginTask);
    this.registry.on('end', ::this.endTask);
  },

  deactivate() {
    this.views.forEach(view => view.dispose());
  },

  provideRegistry() {
    return this.registry;
  },

  beginTask(task) {
    this.tasksBegun.push(task);
    this.views.forEach(view => view.beginTask(task));
  },

  endTask(task) {
    this.tasksEnded.push(task);
    this.views.forEach(view => view.endTask(task));
  },

  consumeStatusBar(statusBar) {
    this.addView(new StatusBarView(statusBar));
  },

  addView(view) {
    this.views.push(view);
    this.tasksBegun.forEach(task => view.beginTask(task));
    this.tasksEnded.forEach(task => view.endTask(task));
  }
};
