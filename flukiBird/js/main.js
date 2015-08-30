/**
 * totalDistance 单个管子移动的总距离
 * containerWidth 游戏界面宽度
 * movingSpeed 管子移动速度
 * animationTime 管子移动的时间
 * intervalTime 生成管子的间隔
 * minPipeDistance 连个管子之间的最小距离
 *
 * totalDistance = containerWidth x 2
 * movingSpeed = totalDistance / animationTime
 * movingSpeed * intervalTime = pipeWidth + minPipeDistance
*/
define(function(require, exports, module) {
    var Pipe = require('./pipe').Pipe;
    var util = require('./util');
    var index = 0;
    var lastLeft = 0;
    var pipeCounter = 0;
    var counter = 0;
    var $ = require('jquery');
    var handle = setInterval(function() {
        counter ++;
        if (counter === 20) {
            // clearInterval(handle);
        }
        var left = util.random(0, 60);
        lastLeft = left;
        var top = util.random(100, 300);
        var height = util.random(100, 400 - top);
        // console.info(left, top, height);

        new Pipe({
            index: index++,
            left: left,
            top: top,
            height: height
        });

    }, 1550);
});
