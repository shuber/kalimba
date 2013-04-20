/*!
 *  howler.js v1.1.1
 *  howlerjs.com
 *
 *  (c) 2013, James Simpson of GoldFire Studios
 *  goldfirestudios.com
 *
 *  MIT License
 */
(function(){var e={},t=null,n=!0,r=!1;if("undefined"!=typeof AudioContext?t=new AudioContext:"undefined"!=typeof webkitAudioContext?t=new webkitAudioContext:"undefined"!=typeof Audio?n=!1:(n=!1,r=!0),n){var i=typeof t.createGain=="undefined"?t.createGainNode():t.createGain();i.gain.value=1,i.connect(t.destination)}var s=function(){this._volume=1,this._muted=!1,this.usingWebAudio=n};s.prototype={volume:function(t){var r=this;if(t=parseFloat(t,10),t&&t>=0&&1>=t){r._volume=t,n&&(i.gain.value=t);for(var s in e)if(e.hasOwnProperty(s)&&e[s]._webAudio===!1)for(var o=0;o<e[s]._audioNode.length;o++)e[s]._audioNode[o].volume=e[s]._volume*r._volume;return r}return n?i.gain.value:r._volume},mute:function(){var t=this;t._muted=!0,n&&(i.gain.value=0);for(var r in e)if(e.hasOwnProperty(r)&&e[r]._webAudio===!1)for(var s=0;s<e[r]._audioNode.length;s++)e[r]._audioNode[s].volume=0;return t},unmute:function(){var t=this;t._muted=!1,n&&(i.gain.value=t._volume);for(var r in e)if(e.hasOwnProperty(r)&&e[r]._webAudio===!1)for(var s=0;s<e[r]._audioNode.length;s++)e[r]._audioNode[s].volume=e[r]._volume*t._volume;return t}};var o=new s,u=null;if(!r){u=new Audio;var a={mp3:!!u.canPlayType("audio/mpeg;").replace(/^no$/,""),ogg:!!u.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,""),wav:!!u.canPlayType('audio/wav; codecs="1"').replace(/^no$/,""),m4a:!!(u.canPlayType("audio/x-m4a;")||u.canPlayType("audio/aac;")).replace(/^no$/,""),webm:!!u.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/,"")}}var f=function(e){var t=this;t._autoplay=e.autoplay||!1,t._buffer=e.buffer||!1,t._duration=e.duration||0,t._format=e.format||null,t._loop=e.loop||!1,t._loaded=!1,t._sprite=e.sprite||{},t._src=e.src||"",t._pos3d=e.pos3d||[0,0,-.5],t._volume=e.volume||1,t._urls=e.urls||[],t._onload=[e.onload||function(){}],t._onloaderror=[e.onloaderror||function(){}],t._onend=[e.onend||function(){}],t._onpause=[e.onpause||function(){}],t._onplay=[e.onplay||function(){}],t._onendTimer=[],t._webAudio=n&&!t._buffer,t._audioNode=[],t._webAudio&&t._setupAudioNode(),t.load()};if(f.prototype={load:function(){var t=this,n=null;if(r)return t.on("loaderror"),void 0;for(var i=0;i<t._urls.length;i++){var s=t._urls[i].toLowerCase().match(/.+\.([^?]+)(\?|$)/),u=!1;switch(s=s&&s.length>=2?s[1]:t._urls[i].toLowerCase().match(/data\:audio\/([^?]+);/)[1],t._format&&(s=t._format),s){case"mp3":u=a.mp3;break;case"ogg":u=a.ogg;break;case"wav":u=a.wav;break;case"m4a":u=a.m4a;break;case"weba":u=a.webm}if(u===!0){n=t._urls[i];break}}if(!n)return t.on("loaderror"),void 0;if(t._src=n,t._webAudio)l(t,n);else{var f=new Audio;t._audioNode.push(f),f.src=n,f._pos=0,f.preload="auto",f.volume=o._muted?0:t._volume*o.volume(),e[n]=t;var c=function(){t._duration=f.duration,Object.getOwnPropertyNames(t._sprite).length===0&&(t._sprite={_default:[0,t._duration*1e3]}),t._loaded||(t._loaded=!0,t.on("load")),t._autoplay&&t.play(),f.removeEventListener("canplaythrough",c,!1)};f.addEventListener("canplaythrough",c,!1),f.load()}return t},urls:function(e){var t=this;return e?(t._urls=e,t.stop(),t.load(),t):t._urls},play:function(e,n){var r=this;return e||(e="_default"),r._loaded?r._sprite[e]?(r._inactiveNode(function(i){i._sprite=e;var s,o=i._pos>0?i._pos:r._sprite[e][0]/1e3,u=r._sprite[e][1]/1e3-i._pos,a=!(!r._loop&&!r._sprite[e][2]),f="string"==typeof n?n:Math.round(Date.now()*Math.random())+"";if(function(){var t={id:f,sprite:e,loop:a};s=setTimeout(function(){!r._webAudio&&a&&r.stop(t.id,t.timer).play(e,t.id),r._webAudio&&!a&&(r._nodeById(t.id).paused=!0),r._webAudio||a||r.stop(t.id,t.timer),r.on("end")},1e3*u),r._onendTimer.push(s),t.timer=r._onendTimer[r._onendTimer.length-1]}(),r._webAudio)i.id=f,i.paused=!1,h(r,[a,o,u],f),r._playStart=t.currentTime,typeof i.bufferSource.start=="undefined"?i.bufferSource.noteGrainOn(0,o,u):i.bufferSource.start(0,o,u);else{if(i.readyState!==4)return r._clearEndTimer(s),function(){var t=r,s=e,o=n,u=i,a=function(){t.play(s,o),u.removeEventListener("canplaythrough",a,!1)};u.addEventListener("canplaythrough",a,!1)}(),r;i.id=f,i.currentTime=o,i.play()}return r.on("play"),"function"==typeof n&&n(f),r}),r):("function"==typeof n&&n(),r):(r.on("load",function(){r.play(e,n)}),r)},pause:function(e,n){var r=this;if(!r._loaded)return r.on("play",function(){r.pause(e)}),r;r._clearEndTimer(n||0);var i=e?r._nodeById(e):r._activeNode();if(i)if(r._webAudio){if(!i.bufferSource)return r;i.paused=!0,i._pos+=t.currentTime-r._playStart,typeof i.bufferSource.stop=="undefined"?i.bufferSource.noteOff(0):i.bufferSource.stop(0)}else i._pos=i.currentTime,i.pause();return r.on("pause"),r},stop:function(e,t){var n=this;if(!n._loaded)return n.on("play",function(){n.stop(e)}),n;n._clearEndTimer(t||0);var r=e?n._nodeById(e):n._activeNode();if(r)if(r._pos=0,n._webAudio){if(!r.bufferSource)return n;r.paused=!0,typeof r.bufferSource.stop=="undefined"?r.bufferSource.noteOff(0):r.bufferSource.stop(0)}else r.pause(),r.currentTime=0;return n},mute:function(e){var t=this;if(!t._loaded)return t.on("play",function(){t.mute(e)}),t;var n=e?t._nodeById(e):t._activeNode();return n&&(t._webAudio?n.gain.value=0:n.volume=0),t},unmute:function(e){var t=this;if(!t._loaded)return t.on("play",function(){t.unmute(e)}),t;var n=e?t._nodeById(e):t._activeNode();return n&&(t._webAudio?n.gain.value=t._volume:n.volume=t._volume),t},volume:function(e,t){var n=this;if(e=parseFloat(e,10),!n._loaded)return n.on("play",function(){n.volume(e,t)}),n;if(e>=0&&1>=e){n._volume=e;var r=t?n._nodeById(t):n._activeNode();return r&&(n._webAudio?r.gain.value=e:r.volume=e*o.volume()),n}return n._volume},loop:function(e){var t=this;return"boolean"==typeof e?(t._loop=e,t):t._loop},sprite:function(e){var t=this;return"object"==typeof e?(t._sprite=e,t):t._sprite},pos:function(e,n){var r=this;if(!r._loaded)return r.on("load",function(){r.pos(e)}),r;var i=n?r._nodeById(n):r._activeNode();return i?r._webAudio?e>=0?(i._pos=e,r.pause(n).play(i._sprite,n),r):i._pos+(t.currentTime-r._playStart):e>=0?(i.currentTime=e,r):i.currentTime:void 0},pos3d:function(e,t,n,r){var i=this;if(t=void 0!==t&&t?t:0,n=void 0!==n&&n?n:-.5,!i._loaded)return i.on("play",function(){i.pos3d(e,t,n,r)}),i;if(!(e>=0||0>e))return i._pos3d;if(i._webAudio){var s=r?i._nodeById(r):i._activeNode();s&&(i._pos3d=[e,t,n],s.panner.setPosition(e,t,n))}return i},fadeIn:function(e,t,n){var r=this,i=e,s=i/.01,o=t/s;if(!r._loaded)return r.on("load",function(){r.fadeIn(e,t,n)}),r;r.volume(0).play();for(var u=1;s>=u;u++)(function(){var t=Math.round(1e3*(r._volume+.01*u))/1e3,i=e;setTimeout(function(){r.volume(t),t===i&&n&&n()},o*u)})();return r},fadeOut:function(e,t,n,r){var i=this,s=i._volume-e,o=s/.01,u=t/o;if(!i._loaded)return i.on("play",function(){i.fadeOut(e,t,n,r)}),i;for(var a=1;o>=a;a++)(function(){var t=Math.round(1e3*(i._volume-.01*a))/1e3,s=e;setTimeout(function(){i.volume(t,r),t===s&&(n&&n(),i.pause(r),i.on("end"))},u*a)})();return i},_nodeById:function(e){for(var t=this,n=t._audioNode[0],r=0;r<t._audioNode.length;r++)if(t._audioNode[r].id===e){n=t._audioNode[r];break}return n},_activeNode:function(){for(var e=this,t=null,n=0;n<e._audioNode.length;n++)if(!e._audioNode[n].paused){t=e._audioNode[n];break}return e._drainPool(),t},_inactiveNode:function(e){for(var t=this,n=null,r=0;r<t._audioNode.length;r++)if(t._audioNode[r].paused&&t._audioNode[r].readyState===4){e(t._audioNode[r]),n=!0;break}if(t._drainPool(),!n){var i;t._webAudio?(i=t._setupAudioNode(),e(i)):(t.load(),i=t._audioNode[t._audioNode.length-1],i.addEventListener("loadedmetadata",function(){e(i)}))}},_drainPool:function(){var e,t=this,n=0;for(e=0;e<t._audioNode.length;e++)t._audioNode[e].paused&&n++;for(e=0;e<t._audioNode.length&&!(5>=n);e++)t._audioNode[e].paused&&(n--,t._audioNode.splice(e,1))},_clearEndTimer:function(e){var t=this,n=t._onendTimer.indexOf(e);n=n>=0?n:0,t._onendTimer[n]&&(clearTimeout(t._onendTimer[n]),t._onendTimer.splice(n,1))},_setupAudioNode:function(){var e=this,n=e._audioNode,r=e._audioNode.length;return n[r]=typeof t.createGain=="undefined"?t.createGainNode():t.createGain(),n[r].gain.value=e._volume,n[r].paused=!0,n[r]._pos=0,n[r].readyState=4,n[r].connect(i),n[r].panner=t.createPanner(),n[r].panner.setPosition(e._pos3d[0],e._pos3d[1],e._pos3d[2]),n[r].panner.connect(n[r]),n[r]},on:function(e,t){var n=this,r=n["_on"+e];if(t)r.push(t);else for(var i=0;i<r.length;i++)r[i].call(n);return n},off:function(e,t){for(var n=this,r=n["_on"+e],i=""+t,s=0;s<r.length;s++)if(i===""+r[s]){r.splice(s,1);break}return n}},n)var l=function(n,r){if(r in e)n._duration=e[r].duration,c(n);else{var i=new XMLHttpRequest;i.open("GET",r,!0),i.responseType="arraybuffer",i.onload=function(){t.decodeAudioData(i.response,function(t){t&&(e[r]=t,c(n,t))})},i.onerror=function(){n._webAudio&&(n._buffer=!0,n._webAudio=!1,n._audioNode=[],delete n._gainNode,n.load())};try{i.send()}catch(s){i.onerror()}}},c=function(e,t){e._duration=t?t.duration:e._duration,Object.getOwnPropertyNames(e._sprite).length===0&&(e._sprite={_default:[0,e._duration*1e3]}),e._loaded||(e._loaded=!0,e.on("load")),e._autoplay&&e.play()},h=function(n,r,i){var s=n._nodeById(i);s.bufferSource=t.createBufferSource(),s.bufferSource.buffer=e[n._src],s.bufferSource.connect(s.panner),s.bufferSource.loop=r[0],r[0]&&(s.bufferSource.loopStart=r[1],s.bufferSource.loopEnd=r[1]+r[2])};"function"==typeof define&&define.amd?define("Howler",function(){return{Howler:o,Howl:f}}):(window.Howler=o,window.Howl=f)})()