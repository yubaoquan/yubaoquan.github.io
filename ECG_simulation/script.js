var c=document.getElementById("myCanvas");
var ctx=c.getContext("2d");
var penWidth = 3,
    penColor = '#fff',
    eraserWidth = 5
    eraserColor = '#000';
var eraseDistance = 10,
    eraseWidth = 10;

var lineHeight = 80,//横线高度
    middle = 150,//中点x坐标
    jumpHeight = 50,//波峰高度
    upDistance = 25,//爬升过程的水平路程
    downDistance = 7,//下降过程的总水平路程
    halfJumpDistance;//上升距离
var pointX = 0,
    pointY = 100;
var k1, k2, b1, b2, b3;
var turn1, turn2, turn3, turn4;
var a = {
    x: middle,
    y: lineHeight - jumpHeight
}, b = {
    x: middle,
    y: lineHeight + jumpHeight
};
var speed = 2;
initParam();
animloop();

document.querySelector('#btn').addEventListener('click', function() {
    middle = pointX + upDistance + downDistance;
    a.x = middle;
    b.x = middle;
    initParam();
});
function initParam() {
    halfJumpDistance = upDistance + downDistance;
    turn1 = middle - halfJumpDistance;
    turn2 = middle - downDistance;
    turn3 = middle + downDistance;
    turn4 = middle + halfJumpDistance;
    k1 = - jumpHeight / upDistance;
    k2 = 2 * jumpHeight / (2 * downDistance);
    var x1 = turn1,
        x2 = turn2,
        y1 = lineHeight,
        y2 = lineHeight - jumpHeight;
    b1 = (y1 * x2 - y2 * x1) / (x2 - x1);

    x1 = x2,
    x2 = turn3,
    y1 = y2,
    y2 = lineHeight + jumpHeight;
    b2 = (y1 * x2 - y2 * x1) / (x2 - x1);

    x1 = x2,
    x2 = turn4,
    y1 = y2,
    y2 = lineHeight;
    b3 = (y1 * x2 - y2 * x1) / (x2 - x1);
    //---------------------------------------------
}
function animloop() {
    render();
    requestAnimationFrame(animloop);
};

function render() {
    erase(pointX - penWidth - eraseDistance);
    pointX = getX();
    pointY = getY(pointX);
    drawCircle(pointX, pointY, penWidth, penColor);
    var x2 = pointX - eraseDistance - eraseWidth - penWidth;
    drawCircle(x2, getY(x2), penWidth, penColor);
}

function getX() {
    return (pointX > 300 + eraseDistance) ? 0 : pointX + speed;
}

function getY(x) {
    if (x >= turn1 && x < turn2) return k1 * x + b1;
    if (x >= turn2 && x < turn3) return k2 * x + b2;
    if (x >= turn3 && x < turn4) return k1 * x + b3;
    return lineHeight;

}

function drawCircle(x, y, r, color) {
    ctx.save();
    ctx.fillStyle = color || ctx.fillStyle;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI);
    ctx.fill();
    ctx.restore();
}

function erase(x, color) {
    ctx.save();
    ctx.fillStyle = color || eraserColor || ctx.fillStyle;
    ctx.fillRect(x, 0, 10, 150);
    ctx.restore();
    ctx.fillRect(x - eraseWidth, 0, 10, 150);
}
