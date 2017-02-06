var canvasWidth = 1280;
var canvasHeight = 800;

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
//设定宽高
canvas.width = canvasWidth;
canvas.height = canvasHeight;
//创建图片
var image = new Image();
//剪辑区域
var clippingRegion = {
    x : 600 ,
    y : 500 ,
    r : 50
};
    image.src = 'src/img.jpg';
image.onload = function () {
    initCanvas();
};


//初始化
function initCanvas() {
    draw(image , clippingRegion);
}
//剪辑
function setClippingRegion(clippingRegion) {
    // 开始路径绘制
    ctx.beginPath();
    ctx.arc( clippingRegion.x , clippingRegion.y , clippingRegion.r , 0 , Math.PI * 2 , false )
    ctx.clip();
}
function draw(image , clippingRegion) {
    //清空
    ctx.clearRect( 0 , 0 , canvasWidth , canvasHeight);

    ctx.save();
    setClippingRegion(clippingRegion);
    ctx.drawImage(image,0,0);
    ctx.restore();
}