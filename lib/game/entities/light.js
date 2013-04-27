ig.module(
	'game.entities.light'
)
.requires(
	'impact.entity'
)
.defines(function(){
	EntityLight = ig.Entity.extend({
		size:   {x: 8, y: 8},
		animSheet: new ig.AnimationSheet('media/light.png', 8, 8),
		collides: ig.Entity.COLLIDES.FIXED,
		gravityFactor: 0,


		init: function(x, y, settings) {
			this.addAnim('idle', 1, [0]);
			this.light = ig.game.lightManager.addLight(this, {
				angle: 45,   
        angleSpread: 50,   
        radius: 250,         
        color:'rgba(255,255,255,0.1)',  // there is an extra shadowColor option
        useGradients: true, // false will use color/ shadowColor
        shadowGradientStart: 'rgba(0,0,0,0.1)',         // 2-stop radial gradient at 0.0 and 1.0
        shadowGradientStop: 'rgba(0,0,0,0.1)',
        lightGradientStart: 'rgba(255,255,100,0.1)',    // 2-stop radial gradient at 0.0 and 1.0
        lightGradientStop: 'rgba(0,0,0,0.65)',
        pulseFactor: 10,
        lightOffset: {x:0,y:0}      // lightsource offset from the middle of the entity
			});


			this.parent(x, y, settings);
		},

		update: function() {
			this.parent();
			this.light.angle += 1
		}

	});
});