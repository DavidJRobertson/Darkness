ig.module(
	'game.entities.player'
)
.requires(
	'impact.entity'
)
.defines(function(){
	EntityPlayer = ig.Entity.extend({
		size:   {x: 8, y: 14},
		animSheet: new ig.AnimationSheet('media/player.png', 8, 14),
		type: ig.Entity.TYPE.A,
		collides: ig.Entity.COLLIDES.PASSIVE,
		checkAgainst: ig.Entity.TYPE.NONE,
		bounciness: 0,

		health: 10,

		maxVel: {x: 60, y: 240},

		accelDef:    {ground: 400, air: 200},
		frictionDef: {ground: 400, air: 100},
		jump: 130,

		wasStanding: false,

		init: function(x, y, settings) {
			this.friction.y = 0;
			this.parent(x, y, settings);

			this.highJumpTimer = new ig.Timer();
			this.addAnim('idle', 1, [0]);
		},

		update: function() {
			this.friction.x = this.standing ? this.frictionDef.ground : this.frictionDef.air;


			if (ig.input.state('left')) {
				this.accel.x = -(this.standing ? this.accelDef.ground : this.accelDef.air);
				this.flip    = true;
			} else if (ig.input.state('right')) {
				this.accel.x = this.standing ? this.accelDef.ground : this.accelDef.air;
				this.flip    = false;
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