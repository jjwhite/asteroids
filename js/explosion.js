

function Shrapnel (x,y, xMotion, yMotion)
{
	this.x = x;
	this.y = y;
    this.xMotion = xMotion;
	this.yMotion = yMotion;
	this.numsides = getRandomNum(5,8);
	this.size = getRandomNum(4,10);
	this.mass = 20;
	this.fade = 1.0;
	this.visible = true;
}

Shrapnel.prototype.draw = function(){
	context.beginPath();
	context.moveTo (this.x +  this.size * Math.cos(0), this.y +  this.size *  Math.sin(0));          

	for (var i = 1; i <= this.numsides;i += 1) {
		context.lineTo (this.x + this.size * Math.cos(i * 2 * Math.PI / this.numsides), this.y +this.size * Math.sin(i * 2 * Math.PI / this.numsides));
	}

	context.strokeStyle = "rgba(255, 255, 0," +  this.fade + ")";
	context.lineWidth = 1;
	//context.globalAlpha = this.fade;
	context.stroke();
      
}

Shrapnel.prototype.update = function(index){
	 var Fg = (g * 30/1000) * this.mass;
	if (this.visible)
	{
	    this.x +=  this.xMotion;
		this.y += Fg;
		this.y -= this.yMotion;
		this.fade -= 0.05;
	}
		
	if (this.fade <= 0)
	{
		this.visible = false;
		explosion.splice(index,1);
	}
}

function explode(x, y)
{
	explosion.push(new Shrapnel(x - getRandomNum(0, 20), y - getRandomNum(0, 20), getRandomNum(0,5), 0));
	explosion.push(new Shrapnel(x - getRandomNum(0, 20), y - getRandomNum(0, 20), getRandomNum(0,5) * -1, 5));
	explosion.push(new Shrapnel(x - getRandomNum(0, 20), y - getRandomNum(0, 20), getRandomNum(0,5) , 5));
	explosion.push(new Shrapnel(x - getRandomNum(0, 20), y - getRandomNum(0, 20), getRandomNum(0,5) * -1, 0));
	explosion.push(new Shrapnel(x - getRandomNum(0, 20), y - getRandomNum(0, 20), getRandomNum(0,5), 3));
}
