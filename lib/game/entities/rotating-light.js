ig.module(
	'game.entities.rotating-light'
)
.requires(
	'game.entities.light'
)
.defines(function(){
	EntityRotatingLight = EntityLight.extend({
		rotationalVelocity: 60,

		update: function() {
			this.light.angle += this.rotationalVelocity * ig.system.tick;
			this.parent();			
		}
	});
});