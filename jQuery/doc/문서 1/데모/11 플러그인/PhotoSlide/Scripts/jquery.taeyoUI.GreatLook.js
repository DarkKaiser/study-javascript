;(function($) {
    $.MakeGreatLook = function (object, color) {
        return $(object).css("background", color);
    }

    $.fn.MakeGreatLook = function (color) {
        return $(this).css("background", color);
    }
})(jQuery);