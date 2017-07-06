
var   state = require('./flow-state')
      run = require('./flow-call')
      log = require('./utils/log')

module.exports = {

    run: function() {

        atom.notifications.addInfo('flow / running build...');
        log.info('Running build...', true, true);

        var flow = null;

            if(state.flags.build_only) {
                flow = run.build(null, this._logi, this._loge);
            } else if(state.flags.launch_only) {
                flow = run.launch(null, this._logi, this._loge);
            } else {
                flow = run.run(null, this._logi, this._loge);
            }

        flow.then(function(res) {
            if(res.code) {
                atom.notifications.addWarning('flow / build failed. check log.');
                log.error('build failed', false, true);
            } else {
                // atom.notifications.addSuccess('flow / build succeeded');
                log.success('Finished', false, true);
            }
        });

    }, //run


        //from haxe trigger,
        //passes some info we could use
        //but since flow is self contained
        //it will just defer
    onrunbuild: function(e) {
        if(!state.valid) {
            atom.notifications.addWarning('flow / no flow file active');
        } else {
            this.run();
        }
    },


    _logi: function(s) {
        log.msg(s, false, true);
    }, //

    _loge: function(s) {
        log.error(s, false, true);
    }, //

} //module.exports
