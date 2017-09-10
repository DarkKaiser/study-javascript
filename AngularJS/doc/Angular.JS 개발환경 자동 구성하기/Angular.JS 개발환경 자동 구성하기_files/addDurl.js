	(function(){
		if(!document.getElementById("addCssElmt")) {
			var styleElement = document.createElement('link');
			styleElement.href = "http://durl.me/css/durlBasic.css";
			styleElement.rel = 'stylesheet';
			styleElement.type = 'text/css';
			styleElement.id = "addCssElmt";
			document.getElementsByTagName('head')[0].appendChild(styleElement);			
		}
	
		if (!document.getElementById("addJsElmt")) {
			var scriptElement = document.createElement('script');
			scriptElement.src = "http://durl.me/js/durlEventListner.js";
			scriptElement.type = 'text/javascript';
			scriptElement.id = 'addJsElmt';
			document.getElementsByTagName('head')[0].appendChild(scriptElement);
		}
	})();