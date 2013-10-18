function Asteroid(x, y){
	this.x = x;
	this.y = y;
	this.numsides = getRandomNum(5,10);
	this.size = getRandomNum(10,50);
	this.mass = getRandomNum(20,40);
	this.falling = true;
	this.rotation = 0;
	this.rotationSpeed = getRandomNum(1, 5) * 0.01;
	this.xUpdate = getRandomNum(1,3);
	this.xDirection = getRandomNum(1,3) * .5;
}


Asteroid.prototype.draw = function(){
	  context.beginPath();
	context.moveTo (this.x +  this.size * Math.cos(0), this.y +  this.size *  Math.sin(0));          

	for(var i = 0; i <= this.numsides; i++){
		var angle = 2 * Math.PI * (i + this.rotation) / this.numsides;
		var x = this.x + (this.size * Math.cos(angle));
		var y = this.y + (this.size * Math.sin(angle));			
		if (i == 0) context.moveTo(x, y);
		else context.lineTo(x, y);				
	}

    this.rotation += this.rotationSpeed;
	
	//for (var i = 1; i <= this.numsides;i += 1) {
	//	context.lineTo (this.x + this.size * Math.cos(i * 2 * Math.PI / this.numsides), this.y +this.size * Math.sin(i * 2 * Math.PI / this.numsides));
	//}

	context.strokeStyle = "yellow";
	context.lineWidth = 1;
	context.stroke();
	
	/*context.beginPath();
      context.rect(this.x - this.size, this.y-this.size, this.size * 2, this.size * 2);
      context.lineWidth = 1;
      context.strokeStyle = 'white';
      context.stroke();
	
   context.fillStyle = "limegreen";
  context.font = "10px Arial";
  context.fillText("x: " + this.x + " y: " + Math.floor(this.y) + " s: " + this.size, this.x - this.size, this.y + this.size);*/
      
}

function addRandomAsteroid ()
{
	var randX = Math.floor(Math.random()*canvasWidth);
	var randSide = Math.floor(Math.random()*40 + 10);
	asteroids.push(new Asteroid(randX, 0));
}

Asteroid.prototype.update = function(index)
{
    var Fg = (g * 30/1000) * this.mass;
	
	this.checkShipCollision();
	
	if (this.falling)
	{
		this.y += Fg;
		if (this.xDirection == 1                                                 )
		{ this.x -= this.xUpdate}
		else
		{this.x += this.xUpdate;}
		
	}
		
	if (this.y > (canvasHeight))
	{
		asteroids.splice(index,1);
	}
	
}

Asteroid.prototype.checkShipCollision = function()
{
		var boxRange = this.x + this.size;
		var boxBottom = this.y + this.size;
		
		if ((ship.x < boxRange && ship.x > this.x) || ((ship.x + 30)< boxRange && (ship.x + 30) > this.x ))
		{
			if (boxBottom >= canvasHeight - 30)
			{
				//YOU"RE DEAD
				isGameOver = true;
				alert("GAME OVER");
			}
		}
		
}




