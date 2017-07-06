'use babel';

export default class StatusBarView {

  constructor(statusBar) {
    this.statusBar = statusBar;
    this.elements = {};
    this.tasks = [];

    this.setupView();
    this.tile = this.statusBar.addRightTile({ item: this.elements.root, priority: -1000 });
  }

  setupView() {
    this.elements.root = document.createElement('div');
    this.elements.gear = document.createElement('span');

    this.elements.root.classList.add('inline-block', 'busy');
    this.elements.gear.classList.add('icon-gear');

    this.elements.root.appendChild(this.elements.gear);
  }

  dispose() {
    this.tile.destroy();
    this.tooltip && this.tooltip.dispose();
  }

  beginTask(task) {
    this.tasks.push({
      ...task,
      finished: false
    });

    this.tasks = this.tasks.slice(-atom.config.get('busy.taskBacklog'));

    this.elements.gear.classList.add('is-busy');

    this.setTooltip();
  }

  endTask(endedTask) {
    const index = this.tasks.findIndex(t => t.uniqueId === endedTask.uniqueId);
    this.tasks[index] = { ...endedTask, finished: true };

    if (!this.tasks.find(t => !t.finished)) {
      this.elements.gear.classList.remove('is-busy');
    }

    this.setTooltip();
  }

  buildTooltipRow(task) {
    let classes = [ 'icon-gear', 'spin' ];
    if (task.finished && task.success ) {
      classes = [ 'icon-check' ];
    } else if (task.finished && !task.success) {
      classes = [ 'icon-x', 'text-error' ];
    }

    const durationText = task.finished ?
      `(${((task.time.end - task.time.start) / 1000).toFixed(1)} s)` : '';

    return `<span class="${classes.join(' ')}"></span> ${task.description} ${durationText}`;
  }

  setTooltip() {
    this.tooltip && this.tooltip.dispose();
    const title = this.tasks.map(::this.buildTooltipRow).join('<br />');
    this.tooltip = atom.tooltips.add(this.elements.root, { title });
  }
}
