ig.module(
	'game.entities.kill'
)
.requires(
	'impact.entity'
)
.defines(function(){
	EntityKill = ig.Entity.extend({
		size: {x: 16, y: 16},
		
		_wmScalable: true,
		_wmDrawBox: true,
		_wmBoxColor: 'rgba(255, 0, 0, 0.35)',
		gravityFactor: 0,
		type: ig.Entity.TYPE.NONE,
		checkAgainst: ig.Entity.TYPE.A,
		collides: ig.Entity.COLLIDES.NEVER,
		
		check: function( other ) {
			other.kill();
		},
		update: function(){}
	});
});