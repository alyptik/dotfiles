
//The calls within this module will use the flow state
// that is current, unless called .flow directly with your
// own arguments. The rest will assume the current state.

var   exec = require('./utils/exec')
    , state = require('./flow-state')
    , log = require('./utils/log')


module.exports = {

    flow: function(args, ondataout, ondataerr) {
        var pre_args = ['run','flow'];
        var use_args = pre_args.concat(args);
        log.debug('running: flow ' + args.join(' '));
        var haxelib_path = atom.config.get('haxe.haxelib_path') || 'haxelib';
        return exec(haxelib_path, use_args, ondataout, ondataerr);
    },

    info: function() {
        return this.flow([
            '--project', state.project_path,
            'info', state.target
        ]);
    },

    hxml: function() {
        return this.flow([
            '--project', state.project_path,
            'info', state.target, '--hxml'
        ]);
    },

    build: function(plus_args, ondataout, ondataerr) {
        return this.cmd('build', plus_args, ondataout, ondataerr);
    },

    run: function(plus_args, ondataout, ondataerr) {
        return this.cmd('run', plus_args, ondataout, ondataerr);
    },

    launch: function(plus_args, ondataout, ondataerr) {
        return this.cmd('launch', plus_args, ondataout, ondataerr);
    },

    cmd: function(cmd, plus_args, ondataout, ondataerr) {
        var args = [cmd];
            args = args.concat(state.as_args(plus_args));
        return this.flow(args, ondataout, ondataerr);
    }

} //module.exports
