function Box(x, y, width, height, color){
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.color = color;
	this.mass = Math.floor(Math.random()*71);
	this.falling = true;
}

Box.prototype.draw = function(){
	  context.beginPath();
      context.rect(this.x, this.y, this.width, this.height);
      context.fillStyle = this.color;
      context.fill();
      context.lineWidth = 1;
      context.strokeStyle = 'black';
      context.stroke();
      
}

function addRandomBox ()
{
	var randX = Math.floor(Math.random()*canvasWidth);
	var randSide = Math.floor(Math.random()*40 + 10);
	boxes.push(new Box(randX, 0-randSide, randSide, randSide, 'brown'));
}

Box.prototype.update = function(index)
{
    var Fg = (g * 30/1000) * this.mass;
	
	this.checkShipCollision();
	
	if (this.falling)
	{
		this.y += Fg;
		
	}
		
	if (this.y > (canvasHeight))
	{
		boxes.splice(index,1);
	}
	
}

Box.prototype.checkShipCollision = function()
{
		var boxRange = this.x + this.width;
		var boxBottom = this.y + this.height;
		
		if (ship.x < boxRange && ship.x > this.x)
		{
			if (boxBottom >= canvasHeight - 30)
			{
				//YOU"RE DEAD
				isGameOver = true;
				alert("GAME OVER");
			}
		}
		
}

Box.prototype.checkBoxCollision = function()
{
	for (var i=0; i<boxes.length; i++)
    {
    	//figure out if we have another box within our x coord
    	var xRange = this.width + this.x;
    	
    	if (boxes[i].x == this.x && boxes[i].y == this.y)
    	{
    	}
    	
    	else if (boxes[i].x >= this.x && boxes[i].x <= xRange)
    	{
  
    		if(this.y + this.height >= boxes[i].y)
    		{
    		    
    			this.y = boxes[i].y - this.height;
    			this.falling = false;
    		}
    	}
    }   

}

