function Laser(x, y){
	this.x = x;
	this.y = y;
	this.width = 2;
	this.height = 10;
	this.color = "limegreen";
	this.mass = 80;
	this.onscreen = true;
}

Laser.prototype.draw = function(){
	  context.beginPath();
      context.rect(this.x, this.y, this.width, this.height);
      context.fillStyle = this.color;
      context.fill();      
}

Laser.prototype.update = function(index)
{
    var Fg = (g * 30/1000) * this.mass;
	this.checkCollision(index);
	if (this.onscreen)
	{
		this.y -= Fg;
	}
	if (this.y <= 0 - this.height)
	{
		this.onscreen = false;
		lasers.splice(index,1);
	}
}

Laser.prototype.checkCollision = function(index)
{
	 var laserX = this.x;
	 var laserY = this.y;
	 var currentAsteroid;
	 
	 for (var i=0; i<asteroids.length; i++)
      {
		 currentAsteroid = asteroids[i];
		 //context.rect(this.x - this.size, this.y-this.size, this.size * 2, this.size * 2);
		 xStart = currentAsteroid.x - currentAsteroid.size;
		 xEnd = xStart + currentAsteroid.size * 2;
		 
		 yStart = currentAsteroid.y - currentAsteroid.size;
		 yEnd = yStart + currentAsteroid.size * 2;
		 
         if (laserX >= xStart && laserX <= xEnd)
		 {
			// in the X range now check y
			if (laserY >= yStart && laserY <= yEnd)
			{
				//HIT!!
				explode(laserX, laserY);
				asteroids.splice(i,1);
				lasers.splice(index, 1);
				score += Math.round(100/currentAsteroid.size * 100);
			}
		 }
      }   
}