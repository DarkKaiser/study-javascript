;(function($) {
    var readOnlyColor = "#efefef";

    $.ReadOnly = function(object, bool) {

        color = bool ? readOnlyColor : "white";
        return $(object)
                        .filter("input:text")
                        .attr("readonly", bool)
                        .css("background", color);
    }

    $.fn.ReadOnly = function(bool) {

        color = bool ? readOnlyColor : "white";
        return $(this)
                        .filter('input:text')
                        .attr('readonly', bool)
                        .css('background', color);
    }
})(jQuery);