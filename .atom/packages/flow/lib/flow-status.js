
        //dep code
var   views = require('atom-space-pen-views')
    , SelectListView = views.SelectListView
        //lib code
    , extend = require('./utils/extend')
    , state = require('./flow-state')


function FlowStatus(_flow) {

    FlowStatus.__super__.constructor.apply(this, arguments);

    this.flow = _flow;
    this.status_items = [
        { tag:'flow',
            text:'flow file',
            desc:'none set'
        },
        { tag:'target',
            text:'flow target',
            desc:state.target },
        { tag:'debug',
            text:'Toggle debug build',
            desc:'currently: '+ state.flags.debug
        },
        { tag:'verbose',
            text:'Toggle verbose build',
            desc:'currently: '+ state.flags.verbose
        },
        { tag:'build-only',
            text:'Toggle build only',
            desc:'currently: '+ state.flags.build_only
        },
        { tag:'launch-only',
            text:'Toggle launch only',
            desc:'currently: '+ state.flags.launch_only
        }
    ];


    this.all_targets = {
        "mac": { target:'mac', text:'Mac', desc:'desktop, native mac app' },
        "linux": { target:'linux', text:'Linux', desc:'desktop, native linux app' },
        "windows": { target:'windows', text:'Windows', desc:'desktop, native windows app' },
        "android": { target:'android', text:'Android', desc:'mobile, native android app' },
        "ios": { target:'ios', text:'iOS', desc:'mobile, native ios project' },
        "web": { target:'web', text:'Web', desc:'web, web based app' }
    }

    this.unavailable_targets = {
        'windows':'mac, ios, linux',
        'linux':'mac, ios, windows',
        'mac':'windows, linux'
    }

    this.available_targets = {
        'windows': ['windows','web','android'],
        'mac': ['mac','web','android','ios'],
        'linux': ['linux','web','android','ios'],
    }

    this.targets = [
        { target:'unavailable', text:'unavailable from ' + state.system, desc:this.unavailable_targets[state.system] }
    ];

    var list = this.available_targets[state.system];
    for(var i = 0; i < list.length; ++i) {
        var t = list[i];
        this.targets.push( this.all_targets[t] );
    }

    this.menu_map = {};
    this.target_map = {};
    for(var i = 0; i < this.status_items.length; ++i) {
        this.menu_map[this.status_items[i].tag] = i;
    }

    for(var i = 0; i < this.targets.length; ++i) {
        this.target_map[this.targets[i].text.toLowerCase()] = i;
    }

}


extend(FlowStatus, SelectListView);


FlowStatus.prototype.update_flag = function(tag, state) {
    var index = this.menu_map[tag];
    var flag = this.status_items[index];
    flag.desc = 'currently: ' + state;
}

FlowStatus.prototype.update_flow_file = function(filename) {
    var index = this.menu_map['flow'];
    var item = this.status_items[index];
    item.desc = filename;
}

FlowStatus.prototype.update_target = function(targetname) {
    var index = this.menu_map['target'];
    var item = this.status_items[index];
    item.desc = targetname;
}

FlowStatus.prototype.show = function(show_targets) {

    this.panel = atom.workspace.addModalPanel({item: this});
    this.panel.show();
    this.storeFocusedElement();

    if(!state.valid) {
        atom.notifications.addWarning('flow / no flow file active');
    } else {
        if(show_targets) {
            this.showing_targets = true;
            this.setItems(this.targets);
        } else {
            this.showing_targets = false;
            this.setItems(this.status_items);
        }
    }


    this.focusFilterEditor();

}

FlowStatus.prototype.cancelled = function() {
    this.hide();
}

FlowStatus.prototype.hide = function() {
    this.panel.hide();
}

FlowStatus.prototype.viewForItem = function(item) {

     var res = '<li class="two-lines">';
         res += '<div class="primary-line">'+item.text+'</div>';
         res += '<div class="secondary-line">'+item.desc+'</div>';
         res += '</li>';

     return res;
}

FlowStatus.prototype.getFilterKey = function() {
    return 'text';
}

FlowStatus.prototype.confirmed = function(item) {

    this.cancel();

    if(this.showing_targets) {

        if(item.target != 'unavailable') {
            this.flow.set_target( item.target );
        }

    } else {

        switch(item.tag) {
            case 'flow':
                atom.open({pathsToOpen:[ item.desc ]});
            break;
            case 'target':
                this.show(true);
            break;
            case 'debug':
                state.flags.debug = !state.flags.debug;
                this.update_flag(item.tag, state.flags.debug);
            break;
            case 'verbose':
                state.flags.verbose = !state.flags.verbose;
                this.update_flag(item.tag, state.flags.verbose);
            break;
            case 'build-only':
                state.flags.build_only = !state.flags.build_only;
                if(state.flags.build_only) state.flags.launch_only = false;
                this.update_flag(item.tag, state.flags.build_only);
            break;
            case 'launch-only':
                state.flags.launch_only = !state.flags.launch_only;
                if(state.flags.launch_only) state.flags.build_only = false;
                this.update_flag(item.tag, state.flags.launch_only);
            break;
        }
    }

}


module.exports = FlowStatus;
