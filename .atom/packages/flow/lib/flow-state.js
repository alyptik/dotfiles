var   log = require('./utils/log')

module.exports = {

    project_path: null,
    target: null,
    system: null,
    is_consumer:false,

    flags: {
        debug: false,
        verbose: false,
        build_only: false,
        launch_only: false
    },

    init:function(state) {

        this.system = this.get_system();
        this.set(state);

        log.debug('state:' + JSON.stringify(this));

    },

    set_project:function(path) {
        this.project_path = path;
        if(this.project_path) this.valid = true;
        log.debug('set: flow file / ' + this.project_path);
    },

    set:function(state) {

        var default_target = atom.config.get('flow.default_build_target') || this.system;

        this.set_project(state.project_path);
        this.target = state.target || default_target;
        this.is_consumer = state.is_consumer;

        if(state.flags) {
            this.flags.debug = state.flags.debug;
            this.flags.verbose = state.flags.verbose;
            this.flags.build_only = state.flags.build_only;
            this.flags.launch_only = state.flags.launch_only;
        }

    }, //set

    unset:function() {
        this.valid = false;
        this.project_path = null;
        this.target = this.system;
        this.is_consumer = false;
            //not sure these should be unset
        // this.flags.debug = false;
        // this.flags.verbose = false;
        // this.flags.build_only = false;
        // this.flags.launch_only = false;
    },

    as_args: function(plus_args) {

        var args = [];

            args.push(this.target);

            args.push('--project');
            args.push(this.project_path);

            if(this.flags.debug) {
                args.push('--debug');
            }

            if(this.flags.verbose) {
                args.push('--log');
                args.push('3');
            }

            if(plus_args) {
                args = args.concat(plus_args);
            }

        return args;
    },

    get_system:function() {
        var s = process.platform;
        switch(s) {
            case 'darwin': return 'mac'; break;
            case 'linux': return 'linux'; break;
            case 'win32': return 'windows'; break;
        }
        return 'unknown';
    },


} //module.exports
