ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
	'impact.font',
	'impact.debug.debug',

	//'game.entities.player',

	'game.levels.main'
)
.defines(function(){
	Game = ig.Game.extend({
		
		// Load a font
		font: new ig.Font( 'media/04b03.font.png' ),
		
		
		init: function() {
			// Initialize your game here; bind keys etc.
			ig.input.bind(ig.KEY.X,           'jump' );

			ig.input.bind(ig.KEY.LEFT_ARROW,  'left' );
			ig.input.bind(ig.KEY.RIGHT_ARROW, 'right');

			this.gravity = 1000;

			this.loadLevel(LevelMain);
		},
		
		update: function() {
			// Update all entities and backgroundMaps
			this.parent();
			
			// Add your own, additional update code here
		},
		
		draw: function() {
			// Draw all entities and backgroundMaps
			this.parent();
			
			
			// Add your own drawing code here
			var x = ig.system.width/2,
				y = ig.system.height/2;
			
			//this.font.draw( 'It Works!', x, y, ig.Font.ALIGN.CENTER );
		}
	});


	// Start the Game with 60fps, a resolution of 320x240, scaled
	// up by a factor of 2
	ig.main( '#canvas', Game, 60, 240, 160, 2 );
	
});