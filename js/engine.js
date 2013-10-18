//Globals
var boxes = [];
var lasers = [];
var context;
var theCanvas;
var canvasHeight;
var canvasWidth;
var mouseX;
var mouseY;
var boxSide = 50;
var ship;
var counter = 0;
var score = 0;
var theLoop;
var isGameOver = false;
var keys = {};
var asteroids = [];
var explosion = [];

//Gravity
var g = 4.9;

function canvasSupport () {
     return Modernizr.canvas;
}

function canvasApp(){
   
   
   
   if (!canvasSupport()) {
          return;
     }else{
      theCanvas = document.getElementById("canvas");
      context = theCanvas.getContext("2d");
      canvasHeight = theCanvas.height;
      canvasWidth = theCanvas.width;
      showStats();
	  ship = new Ship((canvasWidth/2) - 30);
	  ship.draw();
	  showScore();
      theLoop = setInterval(drawScreen, 15);
   }

     function showStats(){
   	$('#cWidth').html(canvasWidth);
   	$('#cHeight').html(canvasHeight);
   	$('#xLoc').html(mouseX);
   	$('#yLoc').html(mouseY);
	
   }
   
   function showScore()
   {
		//$('#TheScore').html(score);
		 context.fillStyle = "limegreen";
		context.font = "bold 20px Consolas";
		context.fillText(score, canvasWidth - (score.toString().length *12), 20);
		$("#heat").html(ship.gunHeat);
   }
   

   function drawScreen() {
      // count each draw
	  counter++;
	  if (! isGameOver)
	  {
	  	  handleKeys();
	      context.clearRect(0, 0, 900, 700);
		  context.fillStyle = 'transparent';
		  context.fillRect(0, 0, 900, 700);
		  showScore();
		  ship.draw();
		  
		  if (counter % 30 == 0)
		  {
			 addRandomAsteroid();
			 if (ship.gunHeat > 5) {
				ship.gunHeat -=5;
				if (ship.disableGun && ship.gunHeat < 50) {ship.disableGun = false;}
			 }
		  }
		  for (var i=0; i<boxes.length; i++)
		  {
		    boxes[i].draw();
			boxes[i].update(i);

		  }   
		  
		  for (var c=0; c<lasers.length; c++)
		  {
			lasers[c].draw();
			lasers[c].update(c);
		  }

          for (var a=0; a<asteroids.length; a++)
		{
			asteroids[a].draw();
			asteroids[a].update(a);
		}		  
		
		for (var a=0; a<explosion.length; a++)
		{
			explosion[a].draw();
			explosion[a].update(a);
		}
			
	   ship.drawGauge();
	  }
  	}
  
// Get mouse location  
	$('canvas').mousemove(function(e) {
    	var pos = findPos(this);
    	mouseX = e.pageX - pos.x;
    	mouseY = e.pageY - pos.y;
    	showStats();
    });
    
    $('canvas').mousedown(function(e){
    	//boxes.push(new Box(mouseX - (boxSide/2), mouseY - (boxSide/2), boxSide, boxSide, 'cornsilk'));
    	asteroids.push(new Asteroid(mouseX, mouseY, "blue"));
		drawScreen();
    });
   
    $('#canvasWrapper').keydown(function (event) {
		keys[event.which] = true;
		handleKeys();
		
   });
   
   $("#canvasWrapper").keyup(function(event){
		delete keys[event.which];
		handleKeys();
   });
   
   function handleKeys(){
		for (var i in keys)
		{
			if (!keys.hasOwnProperty(i)) continue;
			if (i == 37){
				ship.update(-4);
			}
			else if (i == 39)
			{
				ship.update(4);
			}
			else if (i == 38 || i == 32)
			{
				if (!ship.disableGun)
				{
					lasers.push(new Laser(ship.x + 15, canvasHeight - 30));
					ship.gunHeat ++;
					if(ship.gunHeat >= 100) {ship.disableGun = true;}
				}
			}
		}
		
   }

  
}