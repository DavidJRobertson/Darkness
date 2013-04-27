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
			this.parent(x, y, settings);
		},

		update: function() {
			this.parent();
		}

	});
});