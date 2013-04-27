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
		jump: 120,

		wasStanding: false,
		canHighJump: false,
		highJumpTimer: null,
		moved: false,

		init: function(x, y, settings) {
			this.friction.y = 0;
			this.parent(x, y, settings);

			this.highJumpTimer = new ig.Timer();
			this.addAnim('idle', 1, [0]);
		},

		update: function() {
			this.moved = false;
			this.friction.x = this.standing ? this.frictionDef.ground : this.frictionDef.air;


			if (ig.input.state('left')) {
				this.accel.x = -(this.standing ? this.accelDef.ground : this.accelDef.air);
				this.flip    = true;
				this.moved   = true;
			} else if (ig.input.state('right')) {
				this.accel.x = this.standing ? this.accelDef.ground : this.accelDef.air;
				this.flip    = false;
				this.moved   = true;
			} else {
				this.accel.x = 0
			}

			this.wantsJump = this.wantsJump || ig.input.pressed('jump')
			if (this.standing && (ig.input.pressed('jump') || (!this.wasStanding && this.wantsJump && ig.input.state('jump')))) {
				ig.mark('jump');
				this.wantsJump = false;
				this.canHighJump = true;
				this.highJumpTimer.set(0.2);
				this.vel.y = -this.jump*1.25;
			} else if (this.canHighJump) {
				var d = this.highJumpTimer.delta();
				if (ig.input.state('jump')) {
					var f = Math.max(0, d > 0 ? ig.system.tick - d : ig.system.tick);
					this.vel.y -= this.jump * f * 6.5;
				} else {
					this.canHighJump = false;
				} 
				if (d > 0) {
					this.canHighJump = false;
				}
			}

			this.wasStanding = this.standing;
			this.parent();
		}

	});
});