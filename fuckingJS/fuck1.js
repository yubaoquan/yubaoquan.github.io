(function($) {
    var i, len = window.dayByDayRecord.length;
    for(; i < len; i ++) {
        $('day-by-day').append('<div>' + window.dayByDayRecord[i] + '</div>');
    }

}(jQuery));
