var c = document.getElementById("slate");
var ctx = c.getContext("2d");
var dvdButton = document.getElementById("dvd");
var stopButton = document.getElementById("stop");
var addButton = document.getElementById("add");
// NEED HTML


ctx.fillStyle = "#00ff00";

var balls = []
var ID;

var makeBall = function(){
    var xDir = 1;
    var yDir = 1;
    var speed = 10 * Math.random();
    var xPos = Math.floor((Math.random() * (c.width - 20)) + 10);
    var yPos = Math.floor((Math.random() * (c.height - 20)) + 10);
    var wallBounce = function(){
    	xPos += speed * xDir;
    	yPos += speed * yDir;
    	if (Math.abs(xPos-c.width/2) >= c.width/2 - 10){
	    xDir = xDir * -1;
	}
	if (Math.abs(yPos-c.height/2) >= c.height/2 - 10){
	    yDir = yDir * -1;
        }
    }
    var drawBall = function(){
    	ctx.beginPath();
	ctx.arc(xPos, yPos, 10, 0, 2 * Math.PI);
	ctx.fill();
    }
    return {
    	bounce : wallBounce,
    	draw : drawBall
    };
};

var addBall = function(){ balls.push(makeBall());}

var drawBall = function(){
    window.cancelAnimationFrame(ID);
    var animate = function(){
	ctx.clearRect(0,0,500,500);
	for (i = 0; i < balls.length; i++) {
		balls[i].bounce();
    		balls[i].draw();
	}
	ID = requestAnimationFrame(animate);
    };

    animate()

};

var stopBall = function(){
    cancelAnimationFrame(ID);
};


dvdButton.addEventListener("click", drawBall);
stopButton.addEventListener("click", stopBall);
addButton.addEventListener("click", addBall);

	
