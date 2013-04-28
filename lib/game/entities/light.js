ig.module(
	'game.entities.light'
)
.requires(
	'impact.entity'
)
.defines(function(){
	EntityLight = ig.Entity.extend({
		size:   {x: 16, y: 16},
		animSheet: new ig.AnimationSheet('media/light.png', 16, 16),
		collides: ig.Entity.COLLIDES.NONE,
		gravityFactor: 0,
		zIndex: 10,

		angle: 45,
		angleSpread: 50,
		radius: 200,

		init: function(x, y, settings) {
			this.parent(x, y, settings);

			this.addAnim('idle', 1, [0]);
			if (ig.game.lightManager) { // Don't crash Weltmeister
				this.light = ig.game.lightManager.addLight(this, {
					angle:       this.angle,   
	        angleSpread: this.angleSpread,   
	        radius:      this.radius,         
	        color:'rgba(255,255,255,0.1)',  // there is an extra shadowColor option
	        useGradients: true, // false will use color/ shadowColor
	        shadowGradientStart: 'rgba(0,0,0,0.1)',         // 2-stop radial gradient at 0.0 and 1.0
	        shadowGradientStop: 'rgba(0,0,0,0.1)',
	        lightGradientStart: 'rgba(255,255,100,0.2)',    // 2-stop radial gradient at 0.0 and 1.0
	        lightGradientStop: 'rgba(255,255,100,0.03)',
	        pulseFactor: 0,
	        lightOffset: {x:0,y:0}      // lightsource offset from the middle of the entity
				});
			}

			
		}
	});
});