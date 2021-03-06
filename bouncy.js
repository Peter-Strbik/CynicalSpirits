var c = document.getElementById("slate");
var ctx = c.getContext("2d");
var startButton = document.getElementById("start");
var stopButton = document.getElementById("stop");
var addButton = document.getElementById("add");
var flockButton = document.getElementById("flock");
var disperseButton = document.getElementById("disperse");
var filterButton = document.getElementById("filter");
var removeButton = document.getElementById("remove");
// NEED HTML

function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

ctx.fillStyle = "#00ff00";

var balls = []
var ID;

var makeBall = function(){
    var xDir = 1 * Math.random();
    var yDir = 1 * Math.random();
    var speed = 10 * Math.random();
    var color = getRandomColor();
    var radius = 10 + 30 * Math.random();
    var xPos = Math.floor((Math.random() * (c.width - 2 * radius)) + radius);
    var yPos = Math.floor((Math.random() * (c.height - 2 * radius)) + radius);
    var wallBounce = function(){
    	xPos += speed * xDir;
    	yPos += speed * yDir;
    	if (Math.abs(xPos-c.width/2) >= c.width/2 - radius){
	    xDir = xDir * -1;
	}
	if (Math.abs(yPos-c.height/2) >= c.height/2 - radius){
	    yDir = yDir * -1;
        }
    };
    var checkSelf = function(ball2){
	return xPos == ball2.x && yPos == ball2.y && radius == ball2.r;
    };
    var distanceBetween = function(ball2){
	return Math.pow((xPos - ball2.x),2) + Math.pow((yPos - ball2.y),2) <= Math.pow((radius + ball2.r),2);
	};
    var ballBounce = function(x,y,xv,yv,c,bool){
    	for (i = 0; i < balls.length; i++) {
		if (!checkSelf(balls[i])){
			if (distanceBetween(balls[i])){
				xDir = xDir * -1;
				yDir = yDir * -1;
				balls[i].flip();
			};	
		};
	};
    };
    var flip = function(){
    	xDir *= -1;
    	yDir *= -1;
    };
    var drawBall = function(){
    	ctx.fillStyle = color;
    	ctx.beginPath();
	ctx.arc(xPos, yPos, radius, 0, 2 * Math.PI);
	ctx.fill();
	ctx.stroke();
    };
 
    
    return {
    	bounce : wallBounce,
    	draw : drawBall,
    	collide : ballBounce,
    	x : xPos,
    	y : yPos,
    	xV : xDir,
    	yV : yDir,
	speed : speed,
    	r : radius,
    	flip : flip
    };
};





var addBall = function(){ balls.push(makeBall());}

var drawBall = function(){
    window.cancelAnimationFrame(ID);
    var animate = function(){
	ctx.clearRect(0,0,500,500);
	for (i = 0; i < balls.length; i++) {
		balls[i].bounce();
		//balls[i].collide();
    		balls[i].draw();
	}
	ID = requestAnimationFrame(animate);
    };

    animate()

};

var stopBall = function(){
    cancelAnimationFrame(ID);
};

var flock = function(){
    balls = balls.map( function(x) { x.xV = 1; x.yV = 1; x.speed = 5;});
};

var disperse = function(){
    balls = balls.map( function(x) { x.xV = (Math.random() * 2) - 1; x.yV = (Math.random() * 2) - 1; x.speed = Math.random() * 10; });
};

var filter = function(){
    
};

startButton.addEventListener("click", drawBall);
stopButton.addEventListener("click", stopBall);
addButton.addEventListener("click", addBall);
flockButton.addEventListener("click", flock);
disperseButton.addEventListener("click", disperse);


	
