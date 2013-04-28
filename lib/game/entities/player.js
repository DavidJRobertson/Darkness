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
		frictionDef: {ground: 400, air: 100},
		jump: 260,

		wasStanding: false,
		flip: false,
		flippedAnimOffset: 24,

		init: function(x, y, settings) {
			this.friction.y = 0;
			this.parent(x, y, settings);

			this.idleTimer     = new ig.Timer();
			this.highJumpTimer = new ig.Timer();

			this.addAnim('idle',    1, 		[0]);
			this.addAnim('scratch', 0.3,  [2, 1, 2, 1, 2], true);
      this.addAnim('shrug',   0.3,  [3, 3, 3, 3, 3, 3, 4, 3, 3], true);
      this.addAnim('run',   	0.07, [6, 7, 8, 9, 10, 11]);
      this.addAnim('jump',  	1,    [15]);
      this.addAnim('fall',  	0.4,  [12, 13]);
      this.addAnim('land',  	0.15, [14]);
      this.addAnim('die',   	0.07, [18, 19, 20, 21, 22, 23, 16, 16, 16]);
      this.addAnim('spawn', 	0.07, [16, 16, 16, 23, 22, 21, 20, 19, 18]);


			if (ig.game.lightManager) { // Don't crash Weltmeister
				this.light = ig.game.lightManager.addLight(this, {
					angle: this.flip ? 180 : 0,   
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
			if (this.currentAnim == this.anims.spawn) {
        this.currentAnim.update();
        if (this.currentAnim.loopCount) {
          this.currentAnim = this.anims.idle.rewind();
        } else {
          return;
        }
      }
      if (this.currentAnim == this.anims.die) {
        this.currentAnim.update();
        if (this.currentAnim.loopCount) {
          this.kill();
        }
        return;
      }

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

			if( this.standing && ig.input.pressed('jump') ) {
				this.vel.y = -this.jump;
			}

			this.wasStanding = this.standing;
			this.parent();
			this.setAnimation();
		},
		setAnimation: function () {
      if ((!this.wasStanding && this.standing)) {
        this.currentAnim = this.anims.land.rewind();
      } else if (this.standing && (this.currentAnim != this.anims.land || this.currentAnim.loopCount > 0)) {
          if (this.moved) {
            if (this.standing) {
              this.currentAnim = this.anims.run;
            }
            this.idle = false;
          } else {
              if (!this.idle || this.currentAnim.stop && this.currentAnim.loopCount > 0) {
                this.idle = true;
                this.idleTimer.set(Math.random() * 4 + 3);
                this.currentAnim = this.anims.idle;
              }
              if (this.idleTimer.delta() > 0) {
                this.idleTimer.reset();
                this.currentAnim = [this.anims.scratch, this.anims.shrug].random().rewind();
              }
          }
      } else if (!this.standing) {
        if (this.vel.y < 0) {
          this.currentAnim = this.anims.jump;
        } else {
          if (this.currentAnim != this.anims.fall) {
            this.anims.fall.rewind();
          }
          this.currentAnim = this.anims.fall;
        }
        this.idle = false;
      }
      this.currentAnim.flip.x = this.flip;
      if (this.flip) {
        this.currentAnim.tile += this.flippedAnimOffset;
      }
    },
    collideWith: function (other, axis) {
      if (axis == 'y' && this.standing && this.currentAnim != this.anims.die) {
        this.currentAnim.update();
   		  this.setAnimation();
      }
    },
    receiveDamage: function (amount, from) {
      if (this.currentAnim != this.anims.die) {
        this.currentAnim = this.anims.die.rewind();
        //for (var i = 0; i < 3; i++) {
        //  ig.game.spawnEntity(EntityPlayerGib, this.pos.x, this.pos.y);
        //}
        //ig.game.spawnEntity(EntityPlayerGibGun, this.pos.x, this.pos.y);
        //this.sfxDie.play();
      }
    },

	});
});