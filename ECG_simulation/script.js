var c=document.getElementById("myCanvas");
var ctx=c.getContext("2d");
var canvasW = +c.getAttribute('width'),
    canvasH = +c.getAttribute('height');

var config = {
    penWidth: 3,
    penColor: '#fff',
    eraserWidth: 5,
    eraserColor: '#000',
    eraseDistance: 10,
    eraseWidth: 10,
    lineHeight: canvasH / 2,//横线高度
    middle: canvasW / 2,//中点x坐标
    jumpHeight: 50,//波峰高度
    upDistance: 25,//爬升过程的水平路程
    downDistance: 10,//下降过程的总水平路程
    halfJumpDistance: null,//上升距离
    unitShape: 'rect',
    speed: 2
};

var pointX = 0,
    pointY = 100;
var k1, k2, b1, b2, b3;
var turn1, turn2, turn3, turn4;
var a = {
    x: config.middle,
    y: config.lineHeight - config.jumpHeight
}, b = {
    x: config.middle,
    y: config.lineHeight + config.jumpHeight
};
NodeList.prototype.forEach = NodeList.prototype.forEach || [].forEach;
initParam();
animloop();
document.querySelectorAll('button').forEach(function(btn) {
    btn.addEventListener('click', function() {
        if (btn.dataset.opType == 'incOrDec') {
            config[btn.dataset.property] += +btn.dataset.inc;
        }
        if (btn.dataset.property == 'unitShape') {
            config[btn.dataset.property] = btn.dataset.unitShape;
        }
        if (btn.dataset.property == 'middle') {
            config.middle = pointX + config.upDistance + config.downDistance;
            a.x = config.middle;
            b.x = config.middle;
        }
        initParam();
    });
});

function initParam() {
    a.x = config.middle;
    a.y = config.lineHeight - config.jumpHeight;
    b.x = config.middle;
    b.y = config.lineHeight + config.jumpHeight;

    config.halfJumpDistance = config.upDistance + config.downDistance;
    turn1 = config.middle - config.halfJumpDistance;
    turn2 = config.middle - config.downDistance;
    turn3 = config.middle + config.downDistance;
    turn4 = config.middle + config.halfJumpDistance;
    k1 = - config.jumpHeight / config.upDistance;
    k2 = 2 * config.jumpHeight / (2 * config.downDistance);
    var x1 = turn1,
        x2 = turn2,
        y1 = config.lineHeight,
        y2 = config.lineHeight - config.jumpHeight;
    b1 = (y1 * x2 - y2 * x1) / (x2 - x1);

    x1 = x2,
    x2 = turn3,
    y1 = y2,
    y2 = config.lineHeight + config.jumpHeight;
    b2 = (y1 * x2 - y2 * x1) / (x2 - x1);

    x1 = x2,
    x2 = turn4,
    y1 = y2,
    y2 = config.lineHeight;
    b3 = (y1 * x2 - y2 * x1) / (x2 - x1);
    //---------------------------------------------
    document.querySelectorAll('.j-showStatus').forEach(function(node) {
        node.textContent = config[node.dataset.property];
    });
}
function animloop() {
    render();
    requestAnimationFrame(animloop);
};

function render() {
    erase(pointX - config.eraseDistance);
    pointX = getX();
    pointY = getY(pointX);
    (config.unitShape == 'rect') && renderByRectangle();
    (config.unitShape == 'circle') && renderByCircle();
}
function renderByCircle() {
    drawCircle(pointX, pointY, config.penWidth, config.penColor);
    var x2 = pointX - config.eraseDistance - config.eraseWidth - config.penWidth;
    drawCircle(x2, getY(x2), config.penWidth, config.penColor);
}
function renderByRectangle() {
    drawRect(pointX, pointY, 2 * config.penWidth);
    var x2 = pointX - config.eraseDistance - config.eraseWidth - config.penWidth;
    drawRect(x2, getY(x2), 2 * config.penWidth);
}

function getX() {
    return (pointX > canvasW + config.eraseDistance + config.penWidth * 2) ? 0 : pointX + config.speed;
}

function getY(x) {
    if (x >= turn1 && x < turn2) return k1 * x + b1;
    if (x >= turn2 && x < turn3) return k2 * x + b2;
    if (x >= turn3 && x < turn4) return k1 * x + b3;
    return config.lineHeight;

}

function drawCircle(x, y, r, color) {
    ctx.save();
    ctx.fillStyle = color || ctx.fillStyle;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI);
    ctx.fill();
    ctx.restore();
}
function drawRect(x, y, width, color) {
    var halfW = Math.round(width / 2);
    ctx.save();
    ctx.fillStyle = color || config.penColor || ctx.fillStyle;
    ctx.fillRect(x - halfW, y - halfW, width, width);
    ctx.restore();
}

function erase(x, color) {
    ctx.save();
    ctx.fillStyle = color || config.eraserColor || ctx.fillStyle;
    ctx.fillRect(x, 0, 10, canvasH);
    ctx.restore();
    ctx.fillRect(x - config.eraseWidth, 0, 10, canvasH);
}
