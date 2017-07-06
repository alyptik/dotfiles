
module.exports = {
    default_build_target: {
        title: 'Default build target',
        description: 'Configure the default build target. Blank means the current user platform. Options are mac, windows, linux, android, ios, web. Some targets are unavailable from specific platforms (see Flow: Set Target)',
        type: 'string',
        default: ''
    },

    debug_logging: {
        title:'Debug Logging',
        description: 'Enable to get more in depth logging for debugging problems with the package',
        type: 'boolean',
        default:'false'
    },

    build_selectors: {
        title:'Haxe Build: additional allowed file scopes',
        description: 'When running the build command, these file scopes will also be allowed to trigger a build.',
        type: 'string',
        default:'source.flow, source.json'
    },

}
