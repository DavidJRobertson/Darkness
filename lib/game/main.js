ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
	'impact.font',
	'plugins.lights',

	'game.entities.player',
	'game.entities.light',
	'game.entities.rotating-light',
	'game.entities.pointing-light',
	'game.entities.show-text',
	'game.entities.kill',
	'game.entities.delay',
	'game.entities.levelchange',
	'game.entities.trigger',
	'game.entities.void',
	'game.entities.hurt',
	'game.entities.mover',

	'game.levels.title',
	'game.levels.tutorial',

	'game.levels.one',
	'game.levels.two',
	'game.levels.three',
	'game.levels.four',
	'game.levels.end'

	//,'impact.debug.debug'
	//,'game.lighting-debug'
)
.defines(function(){
	Game = ig.Game.extend({
		
		// Load a font
		font: new ig.Font( 'media/04b03.font.png' ),
		lightManager: '',
		currentLevel: 'End',

		deathCount: 0,
		
		init: function() {
			// Initialize your game here; bind keys etc.
			ig.input.bind(ig.KEY.X,           'jump' );

			ig.input.bind(ig.KEY.UP_ARROW,    'up'   );
			ig.input.bind(ig.KEY.LEFT_ARROW,  'left' );
			ig.input.bind(ig.KEY.RIGHT_ARROW, 'right');

			this.gravity = 600;
			this.lightManager = new ig.LightManager();

			this.loadLevel(ig.global['Level' + this.currentLevel]);
		},		
		update: function() {
			// Update all entities and backgroundMaps
			this.parent();
			this.lightManager.update();
			// Add your own, additional update code here
		},
		
		draw: function() {
			// Draw all entities and backgroundMaps
			this.parent();
			
			// Add your own drawing code here
			var x = ig.system.width/2,
				y = ig.system.height/2;
			
			//this.font.draw( 'It Works!', x, y, ig.Font.ALIGN.CENTER );
		},
		show_collision_layer: function(enabled) {
			if (enabled) {
				var cm = this.collisionMap
				var bg = new ig.BackgroundMap(cm.tilesize, cm.data, 'media/debug.png');
				this.backgroundMaps = [bg];
			} else {
				this.backgroundMaps = [];
			}
		}

	});

	ig.main( '#canvas', Game, 60, 640, 480, 1 );
	
});
