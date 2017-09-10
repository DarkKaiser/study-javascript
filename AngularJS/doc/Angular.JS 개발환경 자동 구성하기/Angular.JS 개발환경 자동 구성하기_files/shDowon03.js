/* jQuery 부분  */
jQuery.noConflict();  // 다른 라이브러리와 충돌을 방지한다.
jQuery(document).ready(function(){  // 문서가 모두 읽힌 후에 다음을 실행   
    SyntaxHighlighter.defaults['toolbar'] = false;    // 툴바 안 보기
	SyntaxHighlighter.all();
});


