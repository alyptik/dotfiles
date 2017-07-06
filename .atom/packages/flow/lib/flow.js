
        //lib code
var   log  = require('./utils/log')
    , state = require('./flow-state')
    , flow = require('./flow-call')
    , build = require('./flow-build')
    , StatusView = require('./flow-status')
        //node built in
    , path = require('path')

module.exports = {

    config: require('./flow-config'),

        //the project info that isn't serialized
    project_hxml: null,
    project_valid: false,
        //reference to completion service
    haxe_plugin: null,
        //internal
    disposables:[],

//Lifecycle

    activate:function(serialized_state) {

        this._init_internal();
        this.project_valid = false;

        log.init();
        state.init(serialized_state);

        this.status = new StatusView(this);

        if(state.valid) {
                //if we have a flow file in the state,
                //we set it and fetch the hxml etc
                //but don't override the consumer if not in that state
            var dont_set_consumer = !state.is_consumer;
            this.set_flow_file(state.project_path, dont_set_consumer);
        }

        //{ label: 'Set as active HXML file', command: 'haxe:set-hxml-file'}
        atom.contextMenu.add({
            "atom-text-editor" : [
                { type: 'separator' },
                { label: 'Set as active flow file', command: 'flow:set-flow-file', shouldDisplay:this.display_context.bind(this) },
                { type: 'separator' }
            ],
            ".tree-view .file": [
                { type: 'separator' },
                { label: 'Set as active flow file', command: 'flow:set-flow-file', shouldDisplay:this.display_context_tree.bind(this) },
                { type: 'separator' }
            ]
        });

    },

    deactivate:function() {
        log.dispose();
    },

    serialize:function() {
        return state;
    },

//Implementation

    fetch_hxml: function() {

        return new Promise(function(resolve, reject){

            var fetch = flow.hxml();

            fetch.then(function(res) {
                if(state.is_consumer) {
                    log.success('flow info updated for ' + state.project_path);
                } else {
                    log.msg('flow info updated for ' + state.project_path);
                }
                resolve( res.out );
            });

        });

    }, //fetch_hxml

    update_hxml: function(dont_set_consumer) {

        // log.debug('begin: updating project hxml');

        var hxml = this.fetch_hxml();

        hxml.then(function(hxml_string){

            this.project_hxml = hxml_string;

            if(!dont_set_consumer) {
                this.set_as_consumer();
            }

            // log.debug('end: updating project hxml');

        }.bind(this));

    }, //update_hxnot_as_consumerml


    set_as_consumer: function() {

        var cwd = path.dirname(state.project_path);

        state.is_consumer = this.haxe_plugin.set_completion_consumer({
            name: 'flow',
                //when we lost consumer state
            onConsumerLost: this.consumer_lost.bind(this),
                //tell haxe plugin we handle the builds
            does_build: true,
                //the callback when a build is triggered
            onRunBuild: build.onrunbuild.bind(build),
            onBuildSelectorQuery: this.get_build_selectors.bind(this),
                //our hxml information
            hxml_content: this.project_hxml,
            hxml_cwd: cwd
        });

    }, //set_as_consumer

    get_build_selectors: function() {

        var list = atom.config.get('flow.build_selectors');

        if(list) {
            list = list.split(',');
            list = list.map(function(l) { return l.trim(); });
        }

        return list || [];

    }, //get_build_selectors

    consumer_lost:function() {
        log.debug('flow / lost consumer state to haxe plugin. Re-set a flow project to make it active.');
        state.is_consumer = false;
    },

    invalidate:function(reason) {
        this.project_valid = false;
        log.error(reason);
    },

//Services

    completion_hook: function(haxe_plugin) {
        this.haxe_plugin = haxe_plugin;
    },

//API

    set_flow_file:function( project_path, dont_set_consumer ) {

        if(!project_path) {
            return this.invalidate('flow file set to invalid path (given:`'+project_path+'`)');
        }

        state.set_project(project_path);
        this.update_hxml(dont_set_consumer);
        this.status.update_flow_file(state.project_path);

    }, //set_flow_file

    set_target:function( target ) {

        log.debug('set: flow target / ' + target);

        state.target = target;
        this.update_hxml();
        this.status.update_target(state.target);

    }, //set_target

//Commands

    show_status: function() {
        this.status.show();
    },

    show_target: function() {
        this.status.show(true);
    },

    set_flow_file_from_treeview: function() {

        var treeview = atom.packages.getLoadedPackage('tree-view');
        if(!treeview) return;

        treeview = require(treeview.mainModulePath);

        var package_obj = treeview.serialize();
        var file_path = package_obj.selectedPath;

        this.set_flow_file( file_path );

    }, //set_flow_file_from_treeview

//Menu handling

    display_context: function(event) {
        var editor = atom.workspace.getActiveTextEditor();
        var scope = editor.getRootScopeDescriptor();
        return (scope.scopes.indexOf('source.flow') != -1);
    },

    display_context_tree: function(event) {
        var key = '.flow';
        var val = event.target.innerText || '';
        return val.indexOf(key, val.length - key.length) !== -1;
    },

//Internal conveniences

    _init_internal:function() {
        this._command('set-flow-file', this.set_flow_file_from_treeview.bind(this) );
        this._command('status', this.show_status.bind(this) );
        this._command('set-target', this.show_target.bind(this) );
        this._command('toggle-log-view', log.toggle.bind(log) );
        this._command('clear-project', state.unset.bind(state) );
    },

    _destroy_commands:function() {
        for(var i = 0; i < this.disposables.length; ++i) {
            this.disposables[i].dispose();
        }
    },

    _command:function(name, func) {
        var cmd = atom.commands.add('atom-workspace', 'flow:'+name, func);
        this.disposables.push(cmd);
        return cmd;
    }
} //module.exports
