;(function ($) {
    var settings;
    $.fn.PhotoSlide = function (options) {
        settings = $.extend($.fn.PhotoSlide.defaults, options);

        settings.current = 0;
        settings.photo = $(settings.photo);
        settings.thumbs = this.filter("img");
        settings.thumbs.each(function (n) { this.idx = n; });

        //썸네일 클릭 이벤트
        settings.thumbs.click(function () {
            if (settings.current == this.idx) return;
            settings.current = this.idx;

            showPhoto();
        });

        //다음버튼 클릭 이벤트
        $(settings.nextButton).click(function () {
            if (settings.current < settings.thumbs.length - 1) {
                settings.current += 1;
            }
            else {
                alert("마지막 사진입니다");
                return;
            }
            showPhoto();
        });

        //이전버튼 클릭 이벤트
        $(settings.prevButton).click(function () {
            if (settings.current > 0) {
                settings.current -= 1;
            }
            else {
                alert("첫번째 사진입니다");
                return;
            }
            showPhoto();
        });

        //처음버튼 클릭 이벤트
        $(settings.firstButton).click(function () {
            settings.current = 0;
            showPhoto();
        });

        //마지막버튼 클릭 이벤트
        $(settings.lastButton).click(function () {
            settings.current = settings.thumbs.length - 1;
            showPhoto();
        });
    }

    //사진을 보여주는 공통 메서드
    var showPhoto = function () {
        settings.photo.effect('explode');

        var thumbImgSrc = settings.thumbs[settings.current].src;
        var PhotoImgSrc = thumbImgSrc.replace("/thumbs/", "/photos/");

        settings.photo.attr('src', PhotoImgSrc).css("display", "none");
        settings.photo.fadeIn("slow");
    }

    //기본값 설정
    $.fn.PhotoSlide.defaults = {
        photo: "",
        nextButton: "",
        prevButton: "",
        firstButton: "",
        lastButton: ""
    }
})(jQuery);