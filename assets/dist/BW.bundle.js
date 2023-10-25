!function(){"use strict";var e={d:function(t,n){for(var r in n)e.o(n,r)&&!e.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:n[r]})},o:function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}},t={};function n(e){return n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},n(e)}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){for(var r=0;r<t.length;r++){var a=t[r];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,(void 0,i=function(e,t){if("object"!==n(e)||null===e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var a=r.call(e,"string");if("object"!==n(a))return a;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(a.key),"symbol"===n(i)?i:String(i)),a)}var i}function i(e,t,n){return t&&a(e.prototype,t),n&&a(e,n),Object.defineProperty(e,"prototype",{writable:!1}),e}e.d(t,{default:function(){return u}});var s=function(){function e(t,n,a){r(this,e),this.set(t,n,a)}return i(e,[{key:"toString",value:function(){return"rgb(".concat(Math.round(this.r),", ").concat(Math.round(this.g),", ").concat(Math.round(this.b),")")}},{key:"set",value:function(e,t,n){this.r=this.clamp(e),this.g=this.clamp(t),this.b=this.clamp(n)}},{key:"hueRotate",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;e=e/180*Math.PI;var t=Math.sin(e),n=Math.cos(e);this.multiply([.213+.787*n-.213*t,.715-.715*n-.715*t,.072-.072*n+.928*t,.213-.213*n+.143*t,.715+.285*n+.14*t,.072-.072*n-.283*t,.213-.213*n-.787*t,.715-.715*n+.715*t,.072+.928*n+.072*t])}},{key:"grayscale",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1;this.multiply([.2126+.7874*(1-e),.7152-.7152*(1-e),.0722-.0722*(1-e),.2126-.2126*(1-e),.7152+.2848*(1-e),.0722-.0722*(1-e),.2126-.2126*(1-e),.7152-.7152*(1-e),.0722+.9278*(1-e)])}},{key:"sepia",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1;this.multiply([.393+.607*(1-e),.769-.769*(1-e),.189-.189*(1-e),.349-.349*(1-e),.686+.314*(1-e),.168-.168*(1-e),.272-.272*(1-e),.534-.534*(1-e),.131+.869*(1-e)])}},{key:"saturate",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1;this.multiply([.213+.787*e,.715-.715*e,.072-.072*e,.213-.213*e,.715+.285*e,.072-.072*e,.213-.213*e,.715-.715*e,.072+.928*e])}},{key:"multiply",value:function(e){var t=this.clamp(this.r*e[0]+this.g*e[1]+this.b*e[2]),n=this.clamp(this.r*e[3]+this.g*e[4]+this.b*e[5]),r=this.clamp(this.r*e[6]+this.g*e[7]+this.b*e[8]);this.r=t,this.g=n,this.b=r}},{key:"brightness",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1;this.linear(e)}},{key:"contrast",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1;this.linear(e,-.5*e+.5)}},{key:"linear",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;this.r=this.clamp(this.r*e+255*t),this.g=this.clamp(this.g*e+255*t),this.b=this.clamp(this.b*e+255*t)}},{key:"invert",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1;this.r=this.clamp(255*(e+this.r/255*(1-2*e))),this.g=this.clamp(255*(e+this.g/255*(1-2*e))),this.b=this.clamp(255*(e+this.b/255*(1-2*e)))}},{key:"hsl",value:function(){var e,t,n=this.r/255,r=this.g/255,a=this.b/255,i=Math.max(n,r,a),s=Math.min(n,r,a),o=(i+s)/2;if(i===s)e=t=0;else{var l=i-s;switch(t=o>.5?l/(2-i-s):l/(i+s),i){case n:e=(r-a)/l+(r<a?6:0);break;case r:e=(a-n)/l+2;break;case a:e=(n-r)/l+4}e/=6}return{h:100*e,s:100*t,l:100*o}}},{key:"clamp",value:function(e){return e>255?e=255:e<0&&(e=0),e}}],[{key:"hexToRgb",value:function(e){e=e.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i,(function(e,t,n,r){return t+t+n+n+r+r}));var t=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);return t?[parseInt(t[1],16),parseInt(t[2],16),parseInt(t[3],16)]:null}}]),e}(),o=function(){function e(t){r(this,e),this.target=t,this.targetHSL=t.hsl(),this.reusedColor=new s(0,0,0)}return i(e,[{key:"solve",value:function(){var e=this.solveNarrow(this.solveWide());return{values:e.values,loss:e.loss,filter:this.css(e.values)}}},{key:"solveWide",value:function(){for(var e=[60,180,18e3,600,1.2,1.2],t={loss:1/0},n=0;t.loss>25&&n<3;n++){var r=this.spsa(5,e,15,[50,20,3750,50,100,100],1e3);r.loss<t.loss&&(t=r)}return t}},{key:"solveNarrow",value:function(e){var t=e.loss,n=t+1,r=[.25*n,.25*n,n,.25*n,.2*n,.2*n];return this.spsa(t,r,2,e.values,500)}},{key:"spsa",value:function(e,t,n,r,a){for(var i=null,s=1/0,o=new Array(6),l=new Array(6),c=new Array(6),u=0;u<a;u++){for(var d=n/Math.pow(u+1,.16666666666666666),m=0;m<6;m++)o[m]=Math.random()>.5?1:-1,l[m]=r[m]+d*o[m],c[m]=r[m]-d*o[m];for(var h=this.loss(l)-this.loss(c),y=0;y<6;y++){var f=h/(2*d)*o[y],v=t[y]/Math.pow(e+u+1,1);r[y]=(b=r[y]-v*f,k=void 0,k=100,2===(p=y)?k=7500:4!==p&&5!==p||(k=200),3===p?b>k?b%=k:b<0&&(b=k+b%k):b<0?b=0:b>k&&(b=k),b)}var g=this.loss(r);g<s&&(i=r.slice(0),s=g)}var b,p,k;return{values:i,loss:s}}},{key:"loss",value:function(e){var t=this.reusedColor;t.set(0,0,0),t.invert(e[0]/100),t.sepia(e[1]/100),t.saturate(e[2]/100),t.hueRotate(3.6*e[3]),t.brightness(e[4]/100),t.contrast(e[5]/100);var n=t.hsl();return Math.abs(t.r-this.target.r)+Math.abs(t.g-this.target.g)+Math.abs(t.b-this.target.b)+Math.abs(n.h-this.targetHSL.h)+Math.abs(n.s-this.targetHSL.s)+Math.abs(n.l-this.targetHSL.l)}},{key:"css",value:function(e){function t(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1;return Math.round(e[t]*n)}return"invert(".concat(t(0),"%) sepia(").concat(t(1),"%) saturate(").concat(t(2),"%) hue-rotate(").concat(t(3,3.6),"deg) brightness(").concat(t(4),"%) contrast(").concat(t(5),"%)")}}]),e}();function l(e){return l="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},l(e)}function c(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,(void 0,a=function(e,t){if("object"!==l(e)||null===e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var r=n.call(e,"string");if("object"!==l(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(r.key),"symbol"===l(a)?a:String(a)),r)}var a}var u=function(){function e(){var t=this;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._lang=-1!==["fr","es","de"].indexOf(navigator.language.substring(0,2))?navigator.language.substring(0,2):"en",this._nls=null,this._band=null,this._mainScroll=null,this._version="1.0.0",this._fetchLang().then(this._fetchBandInfo.bind(this)).then(this._init.bind(this)).then(this._buildPage.bind(this)).catch((function(e){console.error("BandWebsite v".concat(t._version," : Fatal error during initialization, please contact support :\n"),e)})).finally((function(){}))}var t,n;return t=e,(n=[{key:"_fetchLang",value:function(){var e=this;return new Promise((function(t,n){fetch("assets/json/".concat(e._lang,".json")).then((function(r){r.json().then((function(n){e._nls=n,t()})).catch((function(e){n(e)}))})).catch((function(e){n(e)}))}))}},{key:"_fetchBandInfo",value:function(){var e=this;return new Promise((function(t,n){fetch("assets/json/band.json").then((function(r){r.json().then((function(n){e._band=n,t()})).catch((function(e){n(e)}))})).catch((function(e){n(e)}))}))}},{key:"_init",value:function(){var e=this;return new Promise((function(t,n){if(e._band.styles){document.documentElement.style.setProperty("--mainColor",e._band.styles.mainColor),document.documentElement.style.setProperty("--gradientStart",e._band.styles.gradientStart),document.documentElement.style.setProperty("--gradientEnd",e._band.styles.gradientEnd);var r=s.hexToRgb(e._band.styles.mainColor),a=new s(r[0],r[1],r[2]),i=new o(a).solve();document.documentElement.style.setProperty("--imageFilter",i.filter),t()}else n(new Error("Not styles found in JSON file"))}))}},{key:"_buildPage",value:function(){var e=this;return new Promise((function(t,n){"index"===document.body.dataset.type?e._buildIndexPage():"listen"===document.body.dataset.type?e._buildListenPage():"tree"===document.body.dataset.type?e._buildTreePage():n(new Error("Invalid <body> type. Should be either index, listen or tree")),t()}))}},{key:"_buildIndexPage",value:function(){var e=this;document.querySelector("#band-name").innerHTML=this._nls.band.name,document.querySelector("#band-desc").innerHTML=this._nls.band.desc,document.querySelector("#listen-link").innerHTML='<img src="./assets/img/controls/disc.svg" alt="listen">'.concat(this._nls.listenLink),document.querySelector("#tree-link").innerHTML='<img src="./assets/img/controls/find.svg" alt="listen">'.concat(this._nls.treeLink),document.querySelector("#musicians-section").innerHTML=this._nls.musicians,document.querySelector("#works-section").innerHTML=this._nls.works;for(var t=0;t<this._band.members.length;++t){var n=document.createElement("DIV");n.dataset.artist=this._band.members[t].fullName;var r=document.createElement("IMG");r.src="./assets/img/artists/".concat(this._band.members[t].picture);var a=document.createElement("P");a.innerHTML="\n        ".concat(this._band.members[t].fullName,"<br>\n        <span>© ").concat(this._band.members[t].pictureCredit,'</span><br>\n        <span id="learn-more" class="learn-more">').concat(this._nls.learnMore,"</span>\n      "),n.addEventListener("click",this._artistModal.bind(this,this._band.members[t])),n.appendChild(r),n.appendChild(a),document.getElementById("artists").appendChild(n)}for(var i=0;i<this._band.releases.length;++i){var s=document.createElement("DIV");s.dataset.url=this._getReleaseLink(this._band.releases[i].links);var o=document.createElement("IMG");o.src="./assets/img/releases/".concat(this._band.releases[i].cover);var l=document.createElement("P");l.innerHTML="\n        ".concat(this._band.releases[i].title,"<br>\n        <span>").concat(this._band.releases[i].artist,"</span><br>\n        <span>").concat(this._buildReleaseDate(this._band.releases[i].date),"</span>\n      "),s.addEventListener("click",this._openReleaseVideo.bind(this,s.dataset.url)),s.appendChild(o),s.appendChild(l),document.getElementById("releases").appendChild(s)}setTimeout((function(){e._mainScroll=new window.ScrollBar({target:document.body,style:{color:e._band.styles.mainColor}}),requestAnimationFrame((function(){e._mainScroll.updateScrollbar()}))}),100)}},{key:"_buildListenPage",value:function(){var e=this;document.querySelector("#release-from").innerHTML=this._nls.from,document.querySelector("#listen-online").innerHTML=this._nls.listenOnline,document.querySelector("#see-more-links").innerHTML=this._nls.seeMore,document.querySelector("#published-on").innerHTML=this._nls.publishedOn;var t=document.getElementById("current-progress"),n=document.getElementById("modal-overlay"),r=new Audio,a=0,i=function(){r.pause(),r.currentTime=0,t.style.width="0";var n=e._band.releases[a];document.getElementById("release-background").style.backgroundImage="url('assets/img/releases/".concat(n.cover,"')"),document.getElementById("release-background-bottom").style.backgroundImage="url('assets/img/releases/".concat(n.cover,"')"),document.getElementById("release-cover").src="assets/img/releases/".concat(n.cover),document.getElementById("release-duration").innerHTML=n.duration,document.getElementById("release-title").innerHTML=n.title,document.getElementById("release-artist").innerHTML=n.artist,document.getElementById("release-date").innerHTML=e._buildReleaseDate(n.date),document.getElementById("label-link").innerHTML=n.label,document.getElementById("label-link").href=n.labelLink;for(var i=0;i<n.links.length;++i)""===n.links[i].url?document.getElementById(n.links[i].type).classList.add("disabled"):(document.getElementById(n.links[i].type).classList.remove("disabled"),document.getElementById(n.links[i].type).href=n.links[i].url);document.getElementById("release-tracklist").innerHTML=e._buildTrackCredits(n.tracks),document.getElementById("release-tracklist").scrollHeight>document.getElementById("release-tracklist").clientHeight&&(document.getElementById("release-tracklist").style.display="inherit",new window.ScrollBar({target:document.getElementById("release-tracklist")})),r=new Audio("assets/audio/".concat(n.audio)),s(r)},s=function(){var e=document.getElementById("play-pause");e.src="assets/img/controls/play.svg";var t=document.getElementById("progress-bar"),n=document.getElementById("current-progress"),a=!1;e.addEventListener("click",(function(){!0===a?(a=!1,e.src="assets/img/controls/play.svg",r.pause()):(a=!0,e.src="assets/img/controls/pause.svg",r.play())})),r.addEventListener("timeupdate",(function(){n.style.width="".concat(r.currentTime/r.duration*100,"%")})),r.addEventListener("ended",(function(){r.currentTime=0,n.style.width="0",e.src="assets/img/controls/play.svg",a=!1})),t.addEventListener("click",(function(e){if(!0===a){var i=t.getBoundingClientRect();r.currentTime=(e.clientX-i.left)/i.width*r.duration,n.style.width="".concat(r.currentTime/r.duration*100,"%")}}))};1===this._band.releases.length?(document.getElementById("release-previous").style.display="none",document.getElementById("release-next").style.display="none"):(document.getElementById("release-previous").addEventListener("click",(function(t){t.target.blur(),a=(e._band.releases.length+a-1)%e._band.releases.length,i()})),document.getElementById("release-next").addEventListener("click",(function(t){t.target.blur(),a=(a+1)%e._band.releases.length,i()}))),document.getElementById("modal-overlay").addEventListener("click",(function(){n.style.opacity=0,setTimeout((function(){n.innerHTML="",n.style.display="none"}),400)})),document.getElementById("see-more-links").addEventListener("click",(function(){fetch("assets/html/seemoremodal.html").then((function(t){n.style.display="flex",t.text().then((function(t){n.appendChild(document.createRange().createContextualFragment(t));for(var r=e._band.releases[a],i=0;i<r.moreLinks.length;++i)""===r.moreLinks[i].url?document.getElementById(r.moreLinks[i].type).classList.add("disabled"):(document.getElementById(r.moreLinks[i].type).classList.remove("disabled"),document.getElementById(r.moreLinks[i].type).href=r.moreLinks[i].url);requestAnimationFrame((function(){return n.style.opacity=1}))}))})).catch((function(e){return console.error(e)}))})),i()}},{key:"_buildTreePage",value:function(){for(var e=this,t=0;t<this._band.links.length;++t)document.querySelector("#link-wrapper").innerHTML+='\n      <a href="'.concat(this._band.links[t].url,'" class="link" target="_blank" rel="noopener noreferrer">\n        <img src="assets/img/logo/').concat(this._band.links[t].type,'.svg" width="25px">\n        <p>').concat(this._band.links[t].name,"</p>\n      </a>\n      ");setTimeout((function(){e._mainScroll=new window.ScrollBar({target:document.getElementById("link-wrapper"),style:{color:e._band.styles.mainColor}}),requestAnimationFrame((function(){e._mainScroll.updateScrollbar()}))}),100)}},{key:"_artistModal",value:function(e){var t=this,n=document.getElementById("modal-overlay");document.getElementById("modal-overlay").addEventListener("click",(function(){n.style.opacity=0,setTimeout((function(){n.innerHTML="",n.style.display="none"}),400)})),fetch("assets/html/biomodal.html").then((function(r){n.style.display="flex",r.text().then((function(r){var a=document.createRange().createContextualFragment(r);a.querySelector("#artist-name").innerHTML=e.fullName,a.querySelector("#artist-picture").src="./assets/img/artists/".concat(e.picture),a.querySelector("#artist-bio").innerHTML=e.bio[t._lang],n.appendChild(a),requestAnimationFrame((function(){return n.style.opacity=1}))}))})).catch((function(e){return console.error(e)}))}},{key:"_getReleaseLink",value:function(e){for(var t="",n=0;n<e.length;++n)if(""!==e[n].url&&(t=e[n].url,"youtube"===e[n].type))return e[n].url;return t}},{key:"_openReleaseVideo",value:function(e){window.open(e,"_blank").focus()}},{key:"_buildReleaseDate",value:function(e){var t=e.split("-");return"en"===this._lang?"".concat(this._nls.months[t[1]-1]," ").concat(t[0].replace(/^0+/,""),", ").concat(t[2]):"".concat(t[0].replace(/^0+/,"")," ").concat(this._nls.months[t[1]-1]," ").concat(t[2])}},{key:"_buildTrackCredits",value:function(e){for(var t="",n=0;n<e.length;++n)t+="<h3>".concat(n+1,". ").concat(e[n].title," – ").concat(e[n].duration,"</h3><p>"),""!==e[n].composer&&(t+="<i>".concat(this._nls.composer,"</i> : ").concat(e[n].composer,"<br>")),""!==e[n].author&&(t+="<i>".concat(this._nls.author,"</i> : ").concat(e[n].author)),t+="</p>";return t}}])&&c(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();window.BW=t.default}();