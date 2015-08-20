$(function() {
    var i,
        deg, degUnit = 30
        clock = $('.clock'),
        number = undefined,
        numbers = [];

    var time,
        hour, minute, second,
        hourDeg, minuteDeg, secondDeg,
        hourDegUnit = 30,
        minuteDegUnit = 6,
        hourPointer = $('.hour'),
        minutePointer = $('.minute'),
        secondPointer = $('.second'),
        secondInner = $('.second-inner'),
        secondText = undefined,
        currentNumber = undefined;

    function initClock() {
        for (i = 1; i <= 12; i ++) {
            number = $('<div class="number-wrapper hour-' + i + '"><span>' + i + '</span></div>');//<i class="light"></i>

            deg = degUnit * i;
            number.css('transform', 'rotate3d(0, 0, 1, ' + deg + 'deg)');
            number.children('span').css('transform', 'translate3d(-50%, 0, 0) rotate3d(0, 0, 1, -' + deg + 'deg)');

            clock.append(number);
            numbers.push(number);
        }
        currentNumber = numbers[0];
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
        hourDeg = (hour + minute / 60 + second / 3600) * hourDegUnit;
        minuteDeg = (minute + second / 60) * minuteDegUnit;
        secondDeg = second * minuteDegUnit;
        secondText = second < 10 ? '0' + second : second;


        hourPointer.css('transform', 'rotate3d(0, 0, 1, ' + hourDeg + 'deg)');
        minutePointer.css('transform', 'rotate3d(0, 0, 1, ' + minuteDeg + 'deg)');
        secondPointer.css('transform', 'rotate3d(0, 0, 1, ' + secondDeg + 'deg)');

        secondInner.text(secondText);

        if (second % 5 === 0) {
            var number = second / 5;
            var index = number > 0 ? number - 1 : 11;
            currentNumber = numbers[index].children('span');
            currentNumber.css({
                'color': 'black',
                'font-size': '80px'
            });
        } else {
            currentNumber.css({
                'color': 'black',
                'font-size': '35px'
            });
        }
    }
});
