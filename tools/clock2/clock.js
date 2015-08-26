$(function() {
    var i,
        deg, degUnit = 30
        clock = $('.clock'),
        number = undefined,
        numbers = [];

    var time,
        hour, minute, second,
        upHeight = 50, downHeight = 0,

        secondInner = $('.second-inner'),
        shalouWrapper = $('.shalou-wrapper'),
        water = $('.water');
        upPart = $('#shalou-up'), downPart = $('#shalou-down');

    function initClock() {
        timeFly();

    }

    //首次载入页面
    initClock();

    setInterval(timeFly, 1000);

    function timeFly() {
        time = new Date();
        hour = time.getHours();
        minute = time.getMinutes();
        second = time.getSeconds();
        upHeight = 50 * (1 - (second + 1) / 60);
        downHeight = 50 * (second + 1) / 60;
        secondText = time.toTimeString().substr(0, 8);

        // upPart.css('height', upHeight + '%');
        // downPart.css('height', downHeight + '%');

        secondInner.text(secondText);

        if (!shalouWrapper.hasClass('rotate180')) {
            upPart.css('height', upHeight + '%');
            downPart.css('height', downHeight + '%');
        } else {
            upPart.css('height', downHeight + '%');
            downPart.css('height', upHeight + '%');
        }

        if (second === 0) {
            if (!shalouWrapper.hasClass('rotate180')) {
                shalouWrapper.addClass('rotate180');
                water.css('animation', 'undrop 0.6s infinite');
                upPart.css({
                    'top': 0,
                    'bottom': ''
                });
                downPart.css({
                    'top': '50%',
                    'bottom': ''
                });
            } else {
                shalouWrapper.removeClass('rotate180');
                water.css('animation', 'drop 0.6s infinite');
                upPart.css({
                    'top': '',
                    'bottom': '50%'
                });
                downPart.css({
                    'top': '',
                    'bottom': 0
                });
            }
        }
    }

});
