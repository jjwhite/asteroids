function Ship(x){
	this.x = x;
	this.y = canvasHeight - 30;
	this.width = 30;
	this.height = 30;
	this.image = "images/ship.png";
	this.gunHeat = 0;
	this.disableGun = false;
}

Ship.prototype.draw = function(){
	  var rocket = new Image();
	  rocket.src = this.image;
	  context.drawImage(rocket, this.x, this.y);
	  
	  //context.beginPath();
      //context.rect(this.x, this.y, this.width, this.height);
      //context.fillStyle = this.color;
      //context.fill();      
}

Ship.prototype.drawGauge = function(){
	 context.beginPath();
     context.rect(canvasWidth - 35, canvasHeight-10, 35, this.gunHeat * -4);
     if (this.gunHeat <= 50)
	 {
		context.fillStyle = "limegreen";
	 }
	 else if (this.gunHeat >50 && this.gunHeat < 80)
	 {
		context.fillStyle = "orange";
	 }
	 else 
	 {
		context.fillStyle = "red";
	 }
     context.fill();      
}


Ship.prototype.update = function(movement){
	
	var newLoc = this.x + movement;
	if (newLoc < canvasWidth - 30 && newLoc >= 0)
	{
			this.x = this.x + movement;
	}
	this.draw();
}