ig.module(
	'game.entities.pointing-light'
)
.requires(
	'game.entities.light'
)
.defines(function(){
	EntityPointingLight = EntityLight.extend({
		target: {1: 'player'},

		update: function() {
			if (ig.game.namedEntities[this.target[1]]) {
				this.light.angle = this.angleTo(ig.game.namedEntities[this.target[1]]).toDeg();
			}

			this.parent();			

		}
	});
});