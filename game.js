var x = 100,y = 100;

var bitmaps = ['sky', 'clouds', 'sun', 'hole', 'mole1', 'mole2', 'boom1', 'boom2', 'hand1', 'hand2', 'tut1', 'tut2', 'tut3', 'vs', 'ground'];
var sprites = {};
var tutSprite;
var counter = 0;
var cloudcount = 0;
var suncount = 0;

var apressed = false;
var lpressed = false;

var tut = true;

var height = 60, hheight = height;;

function main()
{
	enable_debug('debug');
	allegro_init_all("game_canvas", 320, 180);
        	canvas.mozImageSmoothingEnabled = false;
	canvas.webkitImageSmoothingEnabled = false;
	canvas.msImageSmoothingEnabled = false;
	canvas.imageSmoothingEnabled = false;
        sky = load_bmp('sky.png');
        
        bitmaps = bitmaps.forEach(function(name) {
            sprites[name] = load_bmp(name+'.png');
        });
        
        tutSprite = sprites.tut1;
        
	ready(function(){
            
            
                document.addEventListener('keydown', function(e) {
                    var key = e.which || e.keyCode;
                    if (key === 65) {
                        apressed = true;
                        lpressed = false;
                        height+=2;
                        tut=false;
                    }
                    if (key === 76) {
                        lpressed = true;
                        apressed = false;
                        height-=2;
                        hheight = height;
                        tut=false;
                    }
                });
                
            
                document.addEventListener('keyup', function(e) {
                    var key = e.which || e.keyCode;
                    if (key === 65) {
                        apressed = false;
                    }
                    if (key === 76) {
                        lpressed = false;
                    }
                });
            
		loop(function(){
                    counter++;
                    x++;
                    cloudcount-= 5;
                    suncount--;
                    if (cloudcount < -290) cloudcount = 290;
                    if (suncount < -320) suncount = 0;
                    if (counter % 10 === 0) {
                        if (counter % 30 === 0) { tutSprite = sprites.tut1; }
                        else if (counter % 20 === 0) { tutSprite = sprites.tut2; }
                        else { tutSprite = sprites.tut3; }
                        
                    }
                },BPS_TO_TIMER(60));
                var draw = function() {
                        clear_to_color(canvas,makecol(255,255,255));
                        draw_sprite(canvas, sprites.sky, 320/2, 180/2);
                        draw_sprite(canvas, sprites.sun, 320/2 + suncount, 180/2);
                        draw_sprite(canvas, sprites.sun, 320 + 320/2 + suncount, 180/2);
                        draw_sprite(canvas, sprites.clouds, 320/2 + cloudcount, 180/2);
                        draw_sprite(canvas, sprites.ground, 320/2, 180/2);
                        draw_sprite(canvas, sprites.hole, 320/2, 180/2);

                        blit(sprites.mole1, canvas, 0, -100 + height, -5, -5, 320, 155);


                        if (lpressed) {                            
                            draw_sprite(canvas, sprites.boom1, 320/2, 180/2 + 20 - hheight);
                            draw_sprite(canvas, sprites.hand2, 320/2, 180/2 + 20 - hheight);
                        } else {
                            draw_sprite(canvas, sprites.hand1, 320/2, 180/2);
                        }
                        //draw_sprite(canvas, sprites.mole1, 320/2, 180/2);
                        if (tut) {
                        draw_sprite(canvas, sprites.vs, 320/2, 180/2);
                        draw_sprite(canvas, tutSprite, 320/2, 180/2);
                        }
                        
                        //	textout(canvas,font,"Hello World!",x,y,24,makecol(0,0,0));

                        requestAnimationFrame(draw);
                };
                draw();
	});
	return 0;
}
END_OF_MAIN();

 