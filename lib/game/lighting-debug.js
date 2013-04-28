ig.module(
    'game.lighting-debug'
)
.requires(
    'impact.debug.menu',
    'plugins.lights'
)
.defines(function(){
    ig.debug.addPanel({
        type: ig.DebugPanel,
        name: 'lighting',
        label: 'Lighting',



        // Toggle switches for this panel
        options: [
            {
                name: 'Enable lighting',
                object: ig.LightManager,
                property: '_enabled'
            }
        ]
    });

});