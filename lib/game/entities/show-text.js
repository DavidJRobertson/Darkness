ig.module(
	'game.entities.show-text'
)
.requires(
	'impact.entity', 
	'impact.font'
)
.defines(function(){
	EntityShowText = ig.Entity.extend({	
		_wmDrawBox: true,
		_wmBoxColor: 'rgba(196, 255, 0, 0.7)',
		size: {x:16, y: 16},
		
		text: "Hello!",
		font: 'default',
		tposition: 'entity',
		talign: 'left',
		mode: 'constant',
		enabled: true,
		fo: null,
		gravityFactor: 0,
		collides: ig.Entity.COLLIDES.NONE,
		timer: null,
		
		init: function( x, y, settings ) {
			this.parent( x, y, settings );
			this.fo = new ig.Font('media/' + this.font + '.font.png');
			if (this.mode == 'triggerdisplay') {
				this.enabled = false;
			}
			if (this.timeout && this.enabled){
				this.timer = new ig.Timer(this.timeout);
			}
		},
		triggeredBy: function(entity, trigger) {
			if (this.mode == 'triggerdisplay') {
				this.enabled = true;
			} else if (this.mode == 'triggerhide') {
				this.enabled = false;
			} else if (this.mode == 'triggertoggle') {
				this.enabled = !this.enabled;
			}

			if (this.timeout && this.enabled) {
				this.timer = new ig.Timer(this.timeout);
			}
		},			
		update: function(){
			if (this.enabled && this.timer && this.timer.delta() >= 0) {
				this.enabled = false;
				this.timer = null;
			}
			this.parent();
		},
		draw: function() {
			this.parent();
			if(!ig.game.lightManager) { return } // Don't render in Weltmeister
			if(!this.enabled) { return }

			if (this.tposition == "entity") {
				var x = this.pos.x;
				var y = this.pos.y;
			} else if (this.tposition == "center-x") {
				var x = ig.system.width / 2;
				var y = this.pos.y;
			} else if (this.tposition == "center-y") {
				var x = this.pos.x;
				var y = ig.system.height / 2;
			} else if (this.tposition == "center") {
				var x = ig.system.width / 2;
				var y = ig.system.height / 2;
			} else {
				var x = 0;
				var y = 0
			}

			if (this.talign == "center") {
				var align = ig.Font.ALIGN.CENTER;
			} else if (this.talign == "right") {
				var align = ig.Font.ALIGN.RIGHT;
			} else {
				var align = ig.Font.ALIGN.LEFT;
			}
			this.fo.draw(this.text, x, y, align);
		}

	});
});
