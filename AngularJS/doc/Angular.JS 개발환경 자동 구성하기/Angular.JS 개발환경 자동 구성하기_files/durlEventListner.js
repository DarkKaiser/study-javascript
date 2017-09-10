/* 
 * durl bubble preview plguin v1.0
 *    
 * @Project site: http://durl.me
 * @Last updated: 2010-05-03
 *  
 * @Real-time bug report: http://twitter.com/99corps
 * 
 * <example> http://durl.me/doc/PluginExample.html				
 *   
 * "Thank you for using our project!!"
 */

var JsonDataRequest = function(url){
	var date = new Date();	// stamp for removing cache
	this.shortenUrl = url + ".status?type=json&callback=Bubble.importData&stamp=" + date.getMilliseconds();
	this.headElmt = document.getElementsByTagName("HEAD")[0];
};

JsonDataRequest.prototype.createScriptElement = function(){
	if (null != document.getElementById("durlJasonData")) {
		this.headElmt.removeChild(document.getElementById("durlJasonData"));
	}
	this.scriptElmt = document.createElement("script");
	this.scriptElmt.setAttribute("type", "text/javascript");
	this.scriptElmt.setAttribute("charset", "utf-8");
	this.scriptElmt.setAttribute("src", this.shortenUrl);
	this.scriptElmt.setAttribute("id", "durlJasonData");
	this.headElmt.appendChild(this.scriptElmt);
};

JsonDataRequest.prototype.removeScriptElement = function(){
	this.headElmt.removeChild(this.scriptElmt);
};

var Bubble = {
	divObj: null,
	aObj: null,
	Obj: null,
	snapLayer: null,
	targetObj: null,
	hrefAtt: null,
	jsonRequest: null,
	clearId: null,
	key: null,
	imgUrl: null,
	init: function(){
		Bubble.divObj = document.createElement("div");
		Bubble.divObj.setAttribute("id", "snapLayer");
		Bubble.divObj.className = "hidden";
		document.body.appendChild(Bubble.divObj);
		
		var divElmt = document.createElement("div");
		Bubble.divObj.appendChild(divElmt);
		
		Bubble.snapLayer = document.getElementById("snapLayer");		
		Bubble.setDurlLink();
	},
	setDurlLink : function(targetObj) {
		Bubble.aObj = targetObj?targetObj.getElementsByTagName("A") : document.getElementsByTagName("A"); 
		var aObjLength = Bubble.aObj.length;
		
		for (var i = 0; i < aObjLength; i++) {
			Bubble.hrefAtt = Bubble.aObj[i].getAttribute("href") ? Bubble.aObj[i].getAttribute("href") : "";
			
			var parseUrl = /^http:\/\/(www.)?durl\.(kr|me)(\/)?/;
			var result = parseUrl.exec(Bubble.hrefAtt);
						
			var nextObj = Bubble.aObj[i].nextSibling? Bubble.aObj[i].nextSibling : "";
			
			if (nextObj && nextObj.nodeName.toLowerCase() === "img" && nextObj.className === "durlLink") {
			
			} else {
				if ((result && !Bubble.aObj[i].className.match("noAddDurl"))) {
					var imgElmt = document.createElement("img");
					imgElmt.setAttribute("src", "http://durl.me/images/durlLink1.gif");
					imgElmt.setAttribute("width", "15");
					imgElmt.setAttribute("height", "13");
					imgElmt.setAttribute("alt", "");
					imgElmt.className = "durlLink";
					
					var parent = Bubble.aObj[i].parentNode;
					
					if (parent.lastChild == Bubble.aObj[i]) {
						parent.appendChild(imgElmt);
					}
					else {
						parent.insertBefore(imgElmt, Bubble.aObj[i].nextSibling);
					}
									
					if (Bubble.aObj[i].nextSibling.addEventListener) {
						Bubble.aObj[i].nextSibling.addEventListener("mouseover", Bubble.attachBubble, false);
						Bubble.aObj[i].nextSibling.addEventListener("mouseout", Bubble.detachBubble, false);
					}
					else if (Bubble.aObj[i].nextSibling.attachEvent) {
						Bubble.aObj[i].nextSibling.attachEvent("onmouseover", Bubble.attachBubble);
						Bubble.aObj[i].nextSibling.attachEvent("onmouseout", Bubble.detachBubble);
					}
					
					Bubble.snapLayer.onmouseover = function(){
						clearTimeout(Bubble.clearId);
					};
				}
			}
		}
	},
	attachBubble: function(e){
		clearTimeout(Bubble.clearId);
		
		if (e.srcElement) {
			Bubble.targetObj = e.srcElement;
		}
		else {
			Bubble.targetObj = e.target;
		}
		
		Bubble.snapLayer.firstChild.innerHTML = "";
		Bubble.targetObj = Bubble.targetObj.previousSibling;
		Bubble.insertScript();
		Bubble.snapLayer.className = "";
		
		var imgObj = Bubble.targetObj.nextSibling;
		
		if (imgObj.nodeType === 1 && imgObj.tagName === "IMG" && imgObj.className === "durlLink") {
			Bubble.move(Bubble.targetObj.nextSibling);
		}
	},
	detachBubble: function(){
		Bubble.clearId = setTimeout(function(){
			if (Bubble.snapLayer.className !== "hidden") {
				Bubble.snapLayer.className = "hidden";
				Bubble.jsonRequest.removeScriptElement();
			}
		}, 500);
		
		Bubble.snapLayer.onmouseout = function(){
			Bubble.clearId = setTimeout(function(){
				if (Bubble.snapLayer.className !== "hidden") {
					Bubble.snapLayer.className = "hidden";
					Bubble.jsonRequest.removeScriptElement();
				}
			}, 500);
		};
	},
	insertScript: function(){
		var hrefVal = Bubble.targetObj.getAttribute("href");
		
		if (hrefVal === "http://durl.me" || hrefVal === "http://durl.kr" || hrefVal === "http://www.durl.me" || hrefVal === "http://www.durl.kr" ||
		hrefVal === "http://durl.me/" ||
		hrefVal === "http://durl.kr/" ||
		hrefVal === "http://www.durl.me/" ||
		hrefVal === "http://www.durl.kr/") {
			hrefVal = "http://durl.me/b9j";
		}
		Bubble.jsonRequest = new JsonDataRequest(hrefVal);
		Bubble.jsonRequest.createScriptElement();
	},
	// callback method
	importData: function(jsonData){
		var template = "";
		var title = "";
		Bubble.key = jsonData.key;
		Bubble.imgUrl = jsonData.imageUrlVerySmall;
		
		if (jsonData) {
			var divElement = Bubble.snapLayer.firstChild; 

			if (jsonData.status === "ok") {
				var title = jsonData.title;
				if(title) {
					title = decodeURIComponent(title);
					title = (title.length > 28)? title.substr(0, 28) + " . . ." : title;
				}
				else {
					title = '<a title="Go to drul" target="_blank" href="http://durl.me" class="noAddDurl">durl</a>';
				}
					
				template =
					'<h2>' + title + '</h2>\
					<dl>\
						<dt>visit count : </dt>\
						<dd>' + jsonData.viewcnt + '</dd>\
					</dl>\
					<p>\
						<a target="_blank" href="' + jsonData.url + '"><img width="240" height="180" title="' + jsonData.url + 
							'" src="' + jsonData.imageUrlVerySmall + '"></a>\
					</p>\
					<span><a title="' + jsonData.url + '" target="_blank" class="proceedBtn" href="' + jsonData.url + '">바로가기</a></span>';
				
				divElement.innerHTML = template;

				var aElement = divElement.getElementsByTagName("A");
				var aLength = aElement.length;

				for(var i=0; i<aLength; i++) {
					aElement[i].onclick = function(e){
						Bubble.upVisitCount();
					}
				}
			}
			else {
				template = 
					'<h2><a title="Go to drul" target="_blank" href="http://durl.me" class="noAddDurl">durl</a></h2>\
					<p class="noData">존재하지 않는 단축url입니다. <br><a target="_blank" class="noAddDurl" href="http://durl.me">durl.me</a>에서 다시 만들어주세요.</p>\
					<span><a target="_blank" class="submitBtn noAddDurl" href="http://durl.me">단축url 만들기</a></span>';
				
				divElement.innerHTML = template;
			}
		}
		else {
			template = 
				'<h2><a title="Go to drul" target="_blank" href="http://durl.me" class="noAddDurl">durl</a></h2>\
				<p class="noData">서비스가 원할하지 않습니다.<br \/><br \/>잠시후에 다시 시도해 주세요.</p>\
				<span><a target="_blank" class="submitBtn noAddDurl" href="http://durl.me">단축url 만들기</a></span>';
			
			divElement.innerHTML = template;
		}
	},
	move: function(obj){
		var tmpX, tmpY;
		
		tmpX = Dimensions.findPos(obj)[0] + 16;
		tmpY = Dimensions.findPos(obj)[1];
		
		var myWidth = Dimensions.getSize().w;
		var myHeight = Dimensions.getSize().h;
		
		if (myHeight - tmpY - 212 < 0) {
			tmpY = tmpY - 250;
			Bubble.snapLayer.style.backgroundPosition = "0 252px";
		}
		else {
			tmpY = tmpY - 10;
			Bubble.snapLayer.style.backgroundPosition = "0 13px";
		}
		
		Bubble.snapLayer.style.left = tmpX + "px";
		Bubble.snapLayer.style.top = tmpY + "px";
	},
	addClassName: function(obj, className){
		tmp = obj.className ? obj.className + " " : obj.className;
		obj.className = tmp + className;
	},
	removeClassName: function(obj, className){
		var tmp = obj.className.split(" ");
		var tmpLength = tmp.length;
		
		for (i = 0; i < tmpLength; i++) {
			if (tmp[i] === className) {
				tmp.splice(i, 1);
			}
		}
		obj.className = tmp;
	},
	upVisitCount : function() {
		var scriptElement = document.createElement('script');
		var headElement = document.getElementsByTagName('head')[0];
		scriptElement.src = "http://durl.me/UpViewCnt.do?key=" + Bubble.key;
		scriptElement.type = 'text/javascript';
		scriptElement.id = 'countViewScript';
		headElement.appendChild(scriptElement);
		headElement.removeChild(scriptElement);
	}
};

var Dimensions = {
	findPos: function(obj){
		var curleft = 0;
		var curtop = 0;
		if (obj.offsetParent) {
			do {
				curleft += obj.offsetLeft;
				curtop += obj.offsetTop;
			}
			while (obj = obj.offsetParent);
			return [curleft, curtop];
		}
	},
	getSize: function(){
		var myWidth = 0, myHeight = 0;
		if (typeof(window.innerWidth) == 'number') {
			//Non-IE
			myWidth = window.innerWidth + self.pageXOffset;
			myHeight = window.innerHeight + self.pageYOffset;
		} else if (document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight)) {
			//IE 6+ in 'standards compliant mode'
			myWidth = document.documentElement.clientWidth + document.documentElement.scrollLeft;
			myHeight = document.documentElement.clientHeight + document.documentElement.scrollTop;
		}
		else if (document.body && (document.body.clientWidth || document.body.clientHeight)) {
			//IE 4 compatible
			myWidth = document.body.clientWidth + document.body.scrollLeft;
			myHeight = document.body.clientHeight + document.body.scrollTop;
		}
		return { w: myWidth, h: myHeight };
	},
	getStyle: function(el, styleProp){
		var x = document.getElementById(el);
		
		if (x.currentStyle) {
			var y = x.currentStyle[styleProp];
		}
		else 
			if (window.getComputedStyle) {
				var y = document.defaultView.getComputedStyle(x, null).getPropertyValue(styleProp);
			}
		return y;
	}
};


if(window.addEventListener) {
	addEventListener("load", Bubble.init, false);
} else {
	attachEvent("onload", Bubble.init);
}	
