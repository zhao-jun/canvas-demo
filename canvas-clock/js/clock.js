var oCanvas = document.getElementById("myCanvas");
var ctx = oCanvas.getContext("2d");
var ctxWidth = ctx.canvas.width;
var ctxHeight = ctx.canvas.height;
var r = ctxWidth/2;
var rem = ctxWidth / 300;

function drawBackground() {
    ctx.save();
    ctx.translate(r,r);
    ctx.beginPath();
    ctx.lineWidth = 10 * rem;
    ctx.arc(0, 0, r-ctx.lineWidth/2, 0, 2*Math.PI, true);
    ctx.stroke();


    var hourNumber = [3,4,5,6,7,8,9,10,11,12,1,2];
    for (var i=0;i<hourNumber.length;i++){
        var rad = 2 *Math.PI / 12 * i;
        var x = Math.cos(rad) * (r - 30 * rem);
        var y = Math.sin(rad) * (r - 30 * rem);
        ctx.font=20 *rem + "px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText( hourNumber[i], x, y);
    }

    for (var i=0;i<60;i++){
        var rad = 2 *Math.PI / 60 * i;
        var x = Math.cos(rad) * (r - 15 * rem);
        var y = Math.sin(rad) * (r - 15 * rem);
        ctx.beginPath();
        i%5!==0?ctx.fillStyle = "#ccc":ctx.fillStyle = "#000";
        ctx.arc(x, y, 2*rem, 0, 2*Math.PI, true);
        ctx.fill();
    }

}

function drawHour(hour,minute) {
    ctx.save();
    ctx.beginPath();
    var rad = 2 * Math.PI / 12 * hour;
    var mrad = 2 * Math.PI / 12 / 60 * minute;
    ctx.rotate(rad + mrad);
    ctx.lineWidth = 6 * rem;
    ctx.moveTo(0, 10 * rem);
    ctx.lineTo(0, -r/2 + 10 * rem);
    ctx.lineCap = "round";
    ctx.stroke();
    ctx.restore();      /*转换是永久的*/
}

function drawMinute(minute,second) {
    ctx.save();
    ctx.beginPath();
    var mrad = 2 * Math.PI / 60 * minute;
    var srad = 2 * Math.PI / 60 / 60 * second;
    ctx.rotate(mrad + srad);
    ctx.lineWidth = 3 * rem;
    ctx.moveTo(0, 10 * rem);
    ctx.lineTo(0, - r +45 * rem);
    ctx.lineCap = "round";
    ctx.stroke();
    ctx.rotate(2*Math.PI/ 12 *5);
    ctx.restore();
}
function drawSecond(second) {
    ctx.save();
    ctx.beginPath();
    ctx.rotate(2 * Math.PI / 60 * second);
    ctx.lineWidth = 3 * rem;
    ctx.fillStyle = "#d20c0c";
    ctx.moveTo(-2  * rem, 20 * rem);
    ctx.lineTo(2 * rem, 20 * rem);
    ctx.lineTo(1, - r+18 * rem);
    ctx.lineTo(-1, -r+18 * rem);
    // ctx.lineTo(-2, 0);  多余
    ctx.fill();
    ctx.rotate(2*Math.PI/ 12 *5);
    ctx.restore();
}
function  drawDot() {
    ctx.beginPath();
    ctx.fillStyle = "#fff";
    ctx.arc(0, 0, 3 * rem, 0, 2*Math.PI, true);
    ctx.fill();
    ctx.restore();
}




function draw() {
    var myTime = new Date;
    var hour = myTime.getHours();
    var minute = myTime.getMinutes();
    var second = myTime.getSeconds();
    ctx.clearRect(0, 0, ctxWidth,ctxHeight);
    drawBackground();
    drawHour(hour,minute);
    drawMinute(minute,second);
    drawSecond(second);
    drawDot();
}
draw();
setInterval(draw,1000);








