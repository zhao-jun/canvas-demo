var canvasWidth = window.innerWidth;
var canvasHeight = window.innerHeight;

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
//设定宽高
canvas.width = canvasWidth;
canvas.height = canvasHeight;
//创建图片
var image = new Image();
//剪辑区域
var radius = 50;
var clippingRegion = {
    x : -1,
    y : -1,
    r : radius
};
//图片相对于canvas定位
var leftMargin = 0, topMargin = 0;

image.src = 'src/img.jpg';
image.onload = function () {
    //设置包裹层大小
    $('#blur-div').css('width',canvasWidth + 'px');
    $('#blur-div').css('height',canvasHeight + 'px');
    //设置图片大小
    $('#blur-image').css('width',image.width + 'px');
    $('#blur-image').css('height',image.height + 'px');
    //图片定位
    topMargin = (image.height - canvas.height)/2;
    leftMargin = (image.width - canvas.width)/2;
    $('#blur-image').css('top',-topMargin + 'px');
    $('#blur-image').css('left',-leftMargin + 'px');

    initCanvas();
};

//初始化
function initCanvas() {
    //剪辑区域不一定在整个image上，添加偏移
    var theLeft = leftMargin < 0 ? -leftMargin : 0;
    var theTop = topMargin < 0 ? -topMargin : 0;
    clippingRegion = {
        x : Math.random() * (canvasWidth - 2 * radius - 2 * theLeft) + radius + theLeft,
        y : Math.random() * (canvasHeight - 2 * radius - 2 * theTop) + radius + theTop,
        r : radius
    };
    draw(image , clippingRegion);
}
//剪辑
function setClippingRegion(clippingRegion) {
    // 开始路径绘制
    ctx.beginPath();
    ctx.arc( clippingRegion.x , clippingRegion.y , clippingRegion.r , 0 , Math.PI * 2 , false );
    ctx.clip();
}
function draw(image , clippingRegion) {
    //清空
    ctx.clearRect( 0 , 0 , canvasWidth , canvasHeight);

    ctx.save();
    setClippingRegion(clippingRegion);
    ctx.drawImage(image,
        Math.max(leftMargin,0),Math.max(topMargin,0),
        Math.min(canvas.width,image.width),Math.min(canvas.height,image.height),
        leftMargin < 0 ? -leftMargin : 0,topMargin < 0 ? -topMargin : 0,
        Math.min(canvas.width,image.width),Math.min(canvas.height,image.height)
    );
    ctx.restore();
}
//定时器
var timerShow,timerReset;
//重置
function reset() {
    clearInterval(timerShow);
    //避免多次点击创建多个定时器
    if(clippingRegion.r == radius) {
        //绘制一次改变初始位置
        initCanvas();
        return;
    }
    //逐渐缩小
    timerReset = setInterval(function () {
        clippingRegion.r -= 20;
        if(clippingRegion.r == radius ) {
            clearInterval(timerReset);
        }
        draw(image , clippingRegion);
    },30)
}
//显示
function show() {
    //避免多次点击创建多个定时器
    if (clippingRegion.r > canvas.width +canvas.height ) return;
    clearInterval(timerReset);
    //逐渐放大
    timerShow = setInterval(function () {
        clippingRegion.r += 20;
        //两边之和大于第三边
        if (clippingRegion.r > canvas.width +canvas.height ) {
            clearInterval(timerShow)
        }
        draw(image , clippingRegion);
    },30)

}