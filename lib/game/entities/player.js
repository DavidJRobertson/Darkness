ig.module(
	'game.entities.player'
)
.requires(
	'impact.entity'
)
.defines(function(){
	EntityPlayer = ig.Entity.extend({
		name: 'player',
		size:   {x: 16, y: 28},
		animSheet: new ig.AnimationSheet('media/player.png', 16, 28),
		type: ig.Entity.TYPE.A,
		collides: ig.Entity.COLLIDES.PASSIVE,
		checkAgainst: ig.Entity.TYPE.NONE,
		bounciness: 0,
		zIndex: 1,

		health: 10,

		maxVel: {x: 120, y: 480},

		accelDef:    {ground: 400, air: 200},
		frictionDef: {ground: 400, air: 100},
		jump: 260,

		wasStanding: false,


		init: function(x, y, settings) {
			this.friction.y = 0;
			this.parent(x, y, settings);

			this.highJumpTimer = new ig.Timer();
			this.addAnim('idle', 1, [0]);
			if (ig.game.lightManager) { // Don't crash Weltmeister
				this.light = ig.game.lightManager.addLight(this, {
					angle: 0,   
	        angleSpread: 60,   
	        radius: 100,         
	        color:'rgba(255,255,255,0.1)',  // there is an extra shadowColor option
	        useGradients: true, // false will use color/ shadowColor
	        shadowGradientStart: 'rgba(0,0,0,0.1)',         // 2-stop radial gradient at 0.0 and 1.0
	        shadowGradientStop: 'rgba(0,0,0,0.1)',
	        lightGradientStart: 'rgba(255,255,100,0.2)',    // 2-stop radial gradient at 0.0 and 1.0
	        lightGradientStop: 'rgba(255,255,100,0.03)',
	        pulseFactor: 5,
        	lightOffset: {x:0,y:0}      // lightsource offset from the middle of the entity
				});
			}
		},

		update: function() {
			this.friction.x = this.standing ? this.frictionDef.ground : this.frictionDef.air;


			if (ig.input.state('left')) {
				this.accel.x = -(this.standing ? this.accelDef.ground : this.accelDef.air);
				this.flip    = true;
				this.light.angle = 180;
			} else if (ig.input.state('right')) {
				this.accel.x = this.standing ? this.accelDef.ground : this.accelDef.air;
				this.flip    = false;
				this.light.angle = 0;
			} else {
				this.accel.x = 0
			}

			if( this.standing && ig.input.pressed('jump') ) {
				this.vel.y = -this.jump;
			}

			this.wasStanding = this.standing;
			this.parent();
		}

	});
});