'use babel';

import EventEmitter from 'events';

export default class Registry extends EventEmitter {
  constructor() {
    super();
    this.uniqueId = 0;
    this.tasks = [];
  }

  begin(id, description) {
    const task = {
      id,
      description,
      uniqueId: this.uniqueId++,
      time: {
        start: new Date(),
        end: null
      }
    };
    this.tasks.push(task);
    this.emit('begin', task);
  }

  end(id, success = true) {
    const index = this.tasks.findIndex(task => task.id === id);
    if (-1 === index) {
      return;
    }

    const task = this.tasks.splice(index, 1)[0];
    task.success = success;
    task.time.end = new Date();
    this.emit('end', task);
  }

  _getTasks() {
    return this.tasks;
  }
}
