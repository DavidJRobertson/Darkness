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
		offset: {x: 8,  y: 4},
		animSheet: new ig.AnimationSheet('media/player.png', 32, 32),
		type: ig.Entity.TYPE.A,
		collides: ig.Entity.COLLIDES.PASSIVE,
		checkAgainst: ig.Entity.TYPE.NONE,
		bounciness: 0,
		zIndex: 1,

		health: 10,

		maxVel: {x: 120, y: 480},

		accelDef:    {ground: 400, air: 200},
		frictionDef: {ground: 500, air: 250},
		jump: 260,

		wasStanding: false,
		flip: false,
		flippedAnimOffset: 24,

		init: function(x, y, settings) {
			this.friction.y = 0;
			this.parent(x, y, settings);

			this.idleTimer     = new ig.Timer();
			this.highJumpTimer = new ig.Timer();

			this.addAnim('idle',   1,	   [0]);
      this.addAnim('run',    0.15, [0, 1]);

      this.addAnim('idleup', 1, 	 [2]);
      this.addAnim('runup',  0.15, [2, 3]);


      this.ouchSound = new ig.Sound('media/sounds/ouch.*');

			if (ig.game.lightManager) { // Don't crash Weltmeister
				this.light = ig.game.lightManager.addLight(this, {
					angle: this.flip ? 180 : 0,   
	        angleSpread: 60,   
	        radius: 200,         
	        color:'rgba(255,255,255,0.1)',  // there is an extra shadowColor option
	        useGradients: true, // false will use color/ shadowColor
	        shadowGradientStart: 'rgba(0,0,0,0.1)',         // 2-stop radial gradient at 0.0 and 1.0
	        shadowGradientStop: 'rgba(0,0,0,0.1)',
	        lightGradientStart: 'rgba(255,255,100,0.2)',    // 2-stop radial gradient at 0.0 and 1.0
	        lightGradientStop: 'rgba(255,255,100,0.03)',
	        pulseFactor: 5,
        	lightOffset: {x: this.flip ? -7 : 7, y:7}      // lightsource offset from the middle of the entity
				});
			}
		},
    kill: function() {
    	this.ouchSound.play()
      ig.game.lightManager.removeLight(this.light);
      this.parent();
      ig.game.loadLevelDeferred(ig.global['Level' + ig.game.currentLevel]);
      ig.game.deathCount++;
    },

		update: function() {
      this.moved = false;
			this.friction.x = this.standing ? this.frictionDef.ground : this.frictionDef.air;


			if (ig.input.state('left')) {
				this.accel.x = -(this.standing ? this.accelDef.ground : this.accelDef.air);
				this.moved = true;
				this.flip    = true;
				this.light.angle = 180;
			} else if (ig.input.state('right')) {
				this.accel.x = this.standing ? this.accelDef.ground : this.accelDef.air;
				this.moved = true;
				this.flip    = false;
				this.light.angle = 0;
			} else {
				this.accel.x = 0
			}

			if (this.standing && ig.input.pressed('jump')) {
				this.vel.y = -this.jump;
			}

			if (this.flip) {
				this.light.angle = 180;
			} else {
				this.light.angle = 0;
			}
			if (ig.input.state('up')) {
				this.light.angle += this.flip ? 50 : -50;
			} 

			this.wasStanding = this.standing;
			this.parent();
			this.setAnimation();
		},
		setAnimation: function () {
      if (this.standing && this.currentAnim.loopCount > 0) {
        if (this.moved) {
          this.currentAnim = this.anims.run;
          if (ig.input.state('up')) {
        		this.currentAnim = this.anims.runup;
        	} else {
          	this.currentAnim = this.anims.run;
        	}
          this.idle = false;
        } else {
        	if (ig.input.state('up')) {
        		this.currentAnim = this.anims.idleup;
        	} else {
          	this.currentAnim = this.anims.idle;
        	}
        }
      } 

      this.currentAnim.flip.x = this.flip;
      if (this.flip) {
        //this.currentAnim.tile += this.flippedAnimOffset;
        this.light.lightOffset.x = -7;
      } else {
        this.light.lightOffset.x = 7;
      }

    }

	});
});