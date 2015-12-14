var x = 100,y = 100;

var bitmaps = ['sky', 'clouds', 'sun', 'hole', 'mole1', 'mole2', 'mole3', 'boom1', 'boom2', 'hand1', 'hand2', 'tut1', 'tut2', 'tut3', 'vs', 'ground', 'awinz', 'lwinz', 'restart'];
var sprites = {};
var samples = {};
var tutSprite;
var counter = 0;
var cloudcount = 0;
var suncount = 0;

var apressed = false;
var lpressed = false;

var tut = false, movingarm = false, growingmole = false, showmole = false, confumole = false;

var height = -50, hheight = height;

var armx = -132;

var progress = true, awon = false, lwon = false;

var frame = 0;
var introskip = false;

var dosowisko = { enabled: true, alpha: 0, size: 5 };

function checkwin() {
    if (height <= 0) { stop_sample(samples.music); play_sample(samples.lwon); progress = false; lwon = true; }
    if (height >= 120) { stop_sample(samples.music);  play_sample(samples.awon);  progress = false; awon = true;}
}

function apress() {
    if (apressed) return;
    apressed = true;
                        lpressed = false;
                        height+=2;
                        tut=false;
                        checkwin();
                        play_sample(samples.whoosh[~~(Math.random()*3)]);
}

function lpress() {
    if (lpressed) return;
lpressed = true;
                        apressed = false;
                        height-=2;
                        hheight = height;
                        tut=false;
                        play_sample(samples.bam[~~(Math.random()*3)]);
                        checkwin();
}

function arelease() {
    apressed = false;
}

function lrelease() {
    lpressed = false;
}

function install_keys() {

                document.addEventListener('keydown', function(e) {
                    var key = e.which || e.keyCode || event.which;
                    
                    if ((key===27) && (!progress)) {
                        progress = true;
                        tut = true;
                        height = 60;
                        awon = false;
                        lwon = false;hheight = height;
                        play_sample(samples.music, 1.0, 1.0, true);
                        stop_sample(samples.awon);
                        stop_sample(samples.lwon);
                    }
                    if (!progress) return;
                    if (e.repeat) return;
                    if (key === 65) {
                        apress();
                    }
                    if (key === 76) {
                        lpress();

                    }

                });
                
            
                document.addEventListener('keyup', function(e) {
                    var key = e.which || e.keyCode;
                    if (key === 65) {
                        arelease();
                    }
                    if (key === 76) {
                        lrelease();
                    }
                });    
                
                var canv = document.querySelector('#game_canvas');
                canv.addEventListener('touchstart', function(e) {
                    Array.prototype.forEach.call(e.changedTouches, function(touch) {
                        if (touch.clientX - canv.getBoundingClientRect().left < 320) apress();
                        else lpress();
                    });
                });
                canv.addEventListener('touchend', function(e) {
                    Array.prototype.forEach.call(e.changedTouches, function(touch) {
                        if (touch.clientX - canv.getBoundingClientRect().left < 320) arelease();
                        else lrelease();
                    });
                });
}

            function start() {
                play_sample(samples.aaaaa);
                
                setTimeout(function() {
                    if (introskip) return;
                    play_sample(samples.boom);
                    showmole = true;
                    growingmole = true;
                }, 2000);
                setTimeout(function() {
                    if (introskip) return;
                    play_sample(samples.intro1);
                }, 5000);
                setTimeout(function() {
                    if (introskip) return;
                    play_sample(samples.intro2);
                    movingarm = true;
                }, 9000);
                setTimeout(function() {
                    if (introskip) return;
                    play_sample(samples.bam[0]);
                    lpressed = true;
                    hheight = height;
                }, 11000);
                setTimeout(function() {
                    if (introskip) return;
                    lpressed = false;
                    confumole = true;

                }, 12000);
                setTimeout(function() {
                    if (introskip) return;
                    lpressed = false;
                    confumole = false;
                    play_sample(samples.music, 1.0, 1.0, true);

                }, 12800);
                setTimeout(function() {
                    if (introskip) return;
                    skipintro(true);
                }, 13000);
            }

            function skipdosowisko() {
                dosowisko.enabled = false;
                    stop_sample(samples.dosowisko);
                    stop_sample(samples.kbd);
                    stop_sample(samples.key);
                    if (dosowisko.interval) clearInterval(dosowisko.interval);
                    start();
            }
            
            function skipintro(musicplays) {
                introskip = true;
                if (!musicplays) {
                    play_sample(samples.music, 1.0, 1.0, true); }
stop_sample(samples.aaaaa);
stop_sample(samples.intro1);
stop_sample(samples.intro2);
stop_sample(samples.boom);
stop_sample(samples.bam[0]);
movingarm = false;
armx = 0; height = 60; hheight = height;
confumole = false;
lpressed = false; apressed = false;
tut = true;
growingmole = false;
showmole = true;
install_keys();
            }
            
function main()
{
	//enable_debug('debug');
	allegro_init_all("game_canvas", 320, 180);
        	canvas.mozImageSmoothingEnabled = false;
	canvas.webkitImageSmoothingEnabled = false;
	canvas.msImageSmoothingEnabled = false;
	canvas.imageSmoothingEnabled = false;
        sky = load_bmp('sky.png');
        
        bitmaps = bitmaps.forEach(function(name) {
            sprites[name] = load_bmp(name+'.png');
        });
        samples.aaaaa = load_sample('aaaaa.ogg');
        samples.boom = load_sample('boom.ogg');
        samples.intro1 = load_sample('intro1.ogg');
        samples.intro2 = load_sample('intro2.ogg');
        samples.bam = [load_sample('bam.ogg'), load_sample('badum.ogg'), load_sample('lubudu.ogg')];
        samples.whoosh = [load_sample('whoosh.ogg'), load_sample('kh.ogg'), load_sample('siu.ogg')];
        samples.music = load_sample('music.ogg');
        samples.lwon = load_sample('lwinz.ogg');
        samples.awon = load_sample('awinz.ogg');
        samples.dosowisko = load_sample('dosowisko.ogg');
        samples.kbd = load_sample('kbd.ogg');
        samples.key = load_sample('key.ogg');
        
        font = create_font('monospace');
        
        dosowisko.checkerboard = create_bitmap(320, 180);
        for (var i=0; i<=320; i=i+2) {
            for (var j=0; j<=180; j=j+2) {
                putpixel(dosowisko.checkerboard, i, j, makecol(0, 0, 0, 64));
            }
        }
        
        tutSprite = sprites.tut1;
        
	ready(function(){
            
                play_sample(samples.dosowisko);
                dosowisko.length = 1;
                
                setTimeout(function() {
                    play_sample(samples.kbd);

                    dosowisko.interval = setInterval(function() {
                        dosowisko.length++;
                    }, 90);
                }, 2000);
                
                setTimeout(function() {
                    stop_sample(samples.kbd);
                    clearInterval(dosowisko.interval);
                    dosowisko.interval = null;
                    dosowisko.length = 42;
                }, 3500);

                setTimeout(function() {
                    play_sample(samples.key);
                    dosowisko.blank = true;
                }, 5200);                
                
                setTimeout(function() {

                    if (!dosowisko.enabled) return;
                           skipdosowisko();
                }, 6500);
                

                document.addEventListener('keydown', function(e) {
                    var key = e.which || e.keyCode || event.which;
                    
                    if ((key===27) && (dosowisko.enabled)) {
                        skipdosowisko();
                    } else if ((key===27) && (!introskip)) {
                        skipintro();
                    }
                    

                });                
                
		loop(function(){
                    counter++;
                    x++;
                    cloudcount-= 5;
                    suncount--;
                    dosowisko.alpha+=1.5;
                    dosowisko.size-=0.08;
                    if (counter % 30 === 0) dosowisko.cursor = !dosowisko.cursor;
                    if (cloudcount < -290) cloudcount = 290;
                    if (suncount < -320) suncount = 0;
                    if (counter % 10 === 0) {
                        if (counter % 30 === 0) { tutSprite = sprites.tut1; }
                        else if (counter % 20 === 0) { tutSprite = sprites.tut2; }
                        else { tutSprite = sprites.tut3; }
                        
                        
                    }
                    
                        if (movingarm) {
                            armx+=2;
                            if (armx===0) movingarm = false;
                        }
                        if (growingmole) {
                            height+=1;
                            if (height===60) growingmole = false;
                        }
                        
                    if (!frame) frame = requestAnimationFrame(draw);

                },BPS_TO_TIMER(60));
                var draw = function() {
                        frame = 0;
                        clear_to_color(canvas,makecol(255,255,255));
                        draw_sprite(canvas, sprites.sky, 320/2, 180/2);
                        draw_sprite(canvas, sprites.sun, 320/2 + suncount, 180/2);
                        draw_sprite(canvas, sprites.sun, 320 + 320/2 + suncount, 180/2);
                        draw_sprite(canvas, sprites.clouds, 320/2 + cloudcount, 180/2);
                        draw_sprite(canvas, sprites.ground, 320/2, 180/2);
                        if (showmole) {
                            draw_sprite(canvas, sprites.hole, 320/2, 180/2);
                            if (progress) {
                            if (confumole) {
                                
                                blit(sprites.mole2, canvas, 5, Math.max(0, -100 + height), 0, -Math.min(0,-100 + height + 5) - 5, 320, 155 + Math.min(0,-100 + height + 5));
                            } else {
                                if (apressed) {
                            blit(sprites.mole3, canvas, 5, Math.max(0,-100 + height), 0, -Math.min(0,-100 + height + 5) - 5, 320, 155 + Math.min(0,-100 + height + 5));                                    
                                } else {
                            blit(sprites.mole1, canvas, 5, Math.max(0,-100 + height), 0, -Math.min(0,-100 + height + 5) - 5, 320, 155 + Math.min(0,-100 + height + 5));
                                }
                            }
                            }
                        }

                    if (progress) {
                        if (lpressed) {                            
                            draw_sprite(canvas, sprites.boom1, 320/2, 180/2 + 20 - hheight);
                            draw_sprite(canvas, sprites.hand2, 320/2, 180/2 + 20 - hheight);
                        } else {
                            draw_sprite(canvas, sprites.hand1, 320/2 - armx, 180/2);
                        }
                    }
                        //draw_sprite(canvas, sprites.mole1, 320/2, 180/2);
                        if (tut) {
                        draw_sprite(canvas, sprites.vs, 320/2, 180/2);
                        draw_sprite(canvas, tutSprite, 320/2, 180/2);
                        }
                        
                        if (lwon) {
                           draw_sprite(canvas, sprites.lwinz, 320/2, 180/2); 
                        }
                        if (awon) {
                           draw_sprite(canvas, sprites.awinz, 320/2, 180/2); 
                        }
                        
                        if (!progress) {
                                                       draw_sprite(canvas, sprites.restart, 320/2, 180/2); 

                        }
                        
                        //	textout(canvas,font,"Hello World!",x,y,24,makecol(0,0,0));

                        if (dosowisko.enabled) {
                                clear_to_color(canvas,makecol(0,0,0));
                                if (!dosowisko.blank) {
                                clear_to_color(canvas,makecol(35, 31, 32));
textout_centre (canvas, font, ("# dosowisko.net".slice(0, dosowisko.length)) + (dosowisko.cursor ? "_" : " "), 320/2, 180/2 + (28 + Math.max(0,dosowisko.size))/2, 28 + Math.max(0,dosowisko.size), makecol(255,255,255, Math.min(255, dosowisko.alpha)));
                                draw_sprite(canvas, dosowisko.checkerboard, 320/2, 180/2);
                                }
                        }
                        
                };
	});
	return 0;
}
END_OF_MAIN();

 