/*!
 * jQuery Proyectiva Plugnin: ImageBox v0.59
 * http://www.proyectiva.com
 * @krc_ale
 *
 * Copyright 2010, Karacas
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 * Date: 02-10-12_03-43-17
 *
 *		Wrappear una imagen con un div-span y jQeriarlo:
 *		$(".JSimageBox").pryImageBox({typeOut : true})
 *		o
 *		$(".JSimageBox").pryImageBoxLive({typeOut : true})
 *		o
 *		$(".JSimageBoxin").livequeryPryBox(function(){
 *			$(this).pryImageBox({typeOut : true});
 *		});
 *
 *		//OPTIONS:
 *		typeOut: true,
 *		animTime: 0,
 *		responsive: false,
 *		verticalAling: "CENTER", //"LEFT", "RIGHT"
 *		horizontalAling: "CENTER" //"TOP", "BOTTOM"
 *
 */
//____________________________________________________________
/** jQuery livequery - v1.1.1
* Copyright (c) 2010 Brandon Aaron (http://brandonaaron.net)
* Dual licensed under the MIT (MIT_LICENSE.txt)
* and GPL Version 2 (GPL_LICENSE.txt) licenses.
*
* Version: 1.1.1
* Requires jQuery 1.3+
* Docs: http://docs.jquery.com/Plugins/livequery
*/
/*
* jQuery resize event - v1.1 - 3/14/2010
* http://benalman.com/projects/jquery-resize-plugin/
* Copyright (c) 2010 "Cowboy" Ben Alman
* Dual licensed under the MIT and GPL licenses.
* http://benalman.com/about/license/
*/
(function(a){a.extend(a.fn,{pryImageBoxLive:function(b){return a(this).livequeryPryBox(function(){a(this).pryImageBox(b)})}})})(jQuery);(function(b){var a=0;var c=0;b.fn.extend({pryImageBox:function(f){var h={typeOut:true,animTime:0,autoOcult_BackImageWrapper:true,autoOcult_OnErrorLoad:true,avoidCahe:false,responsive:false,verticalAling:"CENTER",horizontalAling:"CENTER"};f=b.extend(h,f);if(f.responsive){responsiveOn()}function i(o,n,k,j){var q=(k/j);var p=(o/n);var l;var m;if(k>=o||j>=n){if(p>q){m=(n);l=(m*q)}else{l=(o);m=(l/q)}if(p==q){l=(o);m=(n)}}else{l=(k);m=(j)}var r={};r.x=l;r.y=m;return(r)}function d(o,n,k,j){var q=(k/j);var p=(o/n);var l;var m;if(p<q){m=(n);l=(m*q)}else{l=(o);m=(l/q)}if(p==q){l=(o);m=(n)}var r={};r.x=l;r.y=m;return(r)}function g(o,l){var m=Math.round(o.width());var n=Math.round(o.height());var k=Math.round(l.width());var j=Math.round(l.height());if(f.horizontalAling=="CENTER"){l.css("margin-left",Math.round((k-m)/-2))}if(f.horizontalAling=="LEFT"){l.css("margin-left",0)}if(f.horizontalAling=="RIGHT"){l.css("margin-left",-Math.round(k-m))}if(f.verticalAling=="CENTER"){l.css("margin-top",Math.round((j-n)/-2))}if(f.verticalAling=="TOP"){l.css("margin-top",0)}if(f.verticalAling=="BOTTOM"){l.css("margin-top",-Math.round(j-n))}}function e(p,l){if(l.hasRun||l.processed){return}l.removeAttr("width");l.removeAttr("height");l.css("width","auto");l.css("height","auto");var m=Math.round(p.width());var o=Math.round(p.height());var k=Math.round(l.width());var j=Math.round(l.height());if(m===0){m=k;p.width(m)}if(o===0){o=j;p.height(o)}if(k!=m||j!=o){var n={};if(f.typeOut){n=d(m,o,k,j)}else{n=i(m,o,k,j)}if(k!=n.x||j!=n.y){l.width(Math.round(n.x));l.height(Math.round(n.y))}g(p,l)}if(l.firstProcessed){l.processed=true;return}if(f.autoOcult_BackImageWrapper){p.css("background-image","none")}l.stop(true,true).fadeTo(f.animTime,1);l.processed=true;l.firstProcessed=true}return this.each(function(k){var n=b(this);var l=b("img:first",n);if(l===null||l.processed){return null}if(l===undefined||l===null){m();return null}l.fadeTo(0,0);l.css("visibility","visible");if(n.css("display")!="block"){n.css("display","block")}if(n.css("overflow")!="hidden"){n.css("overflow","hidden")}if(f.avoidCahe){var j=l.attr("src");l.attr("src",j+"?"+Math.random())}l.hasRun=false;l.processed=false;l.error_=false;l.firstProcessed=false;l.error(function(){m();return null});function m(){l.error_=true;l.hasRun=true;n.css("visibility","hidden")}if(f.responsive){n.resize(function(q){var p=b(this);var o=b("img:first",p);if(o.firstProcessed===false){return}o.hasRun=false;o.processed=false;e(p,o);o.hasRun=true})}l.load(function(){if(!Boolean(l.width()===0&&l.height()===0)){e(n,l);l.hasRun=true}}).each(function(){if(this.complete){l.trigger("load")}})})}})})(jQuery);(function(a){a.extend(a.fn,{livequeryPryBox:function(e,d,c){var b=this,f;if(a.isFunction(e)){c=d,d=e,e=undefined}a.each(a.livequeryPryBox.queries,function(g,h){if(b.selector==h.selector&&b.context==h.context&&e==h.type&&(!d||d.$lqguid==h.fn.$lqguid)&&(!c||c.$lqguid==h.fn2.$lqguid)){return(f=h)&&false}});f=f||new a.livequeryPryBox(this.selector,this.context,e,d,c);f.stopped=false;f.run();return this},expire:function(e,d,c){var b=this;if(a.isFunction(e)){c=d,d=e,e=undefined}a.each(a.livequeryPryBox.queries,function(f,g){if(b.selector==g.selector&&b.context==g.context&&(!e||e==g.type)&&(!d||d.$lqguid==g.fn.$lqguid)&&(!c||c.$lqguid==g.fn2.$lqguid)&&!this.stopped){a.livequeryPryBox.stop(g.id)}});return this}});a.livequeryPryBox=function(b,d,f,e,c){this.selector=b;this.context=d;this.type=f;this.fn=e;this.fn2=c;this.elements=[];this.stopped=false;this.id=a.livequeryPryBox.queries.push(this)-1;e.$lqguid=e.$lqguid||a.livequeryPryBox.guid++;if(c){c.$lqguid=c.$lqguid||a.livequeryPryBox.guid++}return this};a.livequeryPryBox.prototype={stop:function(){var b=this;if(this.type){this.elements.unbind(this.type,this.fn)}else{if(this.fn2){this.elements.each(function(c,d){b.fn2.apply(d)})}}this.elements=[];this.stopped=true},run:function(){if(this.stopped){return}var d=this;var e=this.elements,c=a(this.selector,this.context),b=c.not(e);this.elements=c;if(this.type){b.bind(this.type,this.fn);if(e.length>0){a.each(e,function(f,g){if(a.inArray(g,c)<0){a.event.remove(g,d.type,d.fn)}})}}else{b.each(function(){d.fn.apply(this)});if(this.fn2&&e.length>0){a.each(e,function(f,g){if(a.inArray(g,c)<0){d.fn2.apply(g)}})}}}};a.extend(a.livequeryPryBox,{guid:0,queries:[],queue:[],running:false,timeout:null,checkQueue:function(){if(a.livequeryPryBox.running&&a.livequeryPryBox.queue.length){var b=a.livequeryPryBox.queue.length;while(b--){a.livequeryPryBox.queries[a.livequeryPryBox.queue.shift()].run()}}},pause:function(){a.livequeryPryBox.running=false},play:function(){a.livequeryPryBox.running=true;a.livequeryPryBox.run()},registerPlugin:function(){a.each(arguments,function(c,d){if(!a.fn[d]){return}var b=a.fn[d];a.fn[d]=function(){var e=b.apply(this,arguments);a.livequeryPryBox.run();return e}})},run:function(b){if(b!==undefined){if(a.inArray(b,a.livequeryPryBox.queue)<0){a.livequeryPryBox.queue.push(b)}}else{a.each(a.livequeryPryBox.queries,function(c){if(a.inArray(c,a.livequeryPryBox.queue)<0){a.livequeryPryBox.queue.push(c)}})}if(a.livequeryPryBox.timeout){clearTimeout(a.livequeryPryBox.timeout)}a.livequeryPryBox.timeout=setTimeout(a.livequeryPryBox.checkQueue,20)},stop:function(b){if(b!==undefined){a.livequeryPryBox.queries[b].stop()}else{a.each(a.livequeryPryBox.queries,function(c){a.livequeryPryBox.queries[c].stop()})}}});a.livequeryPryBox.registerPlugin("append","prepend","after","before","wrap","attr","removeAttr","addClass","removeClass","toggleClass","empty","remove","html");a(function(){a.livequeryPryBox.play()})})(jQuery);var responPluginInit=false;function responsiveOn(){if(responPluginInit){return}responPluginInit=true;(function(n,p,u){var w=n([]),s=n.resize=n.extend(n.resize,{}),o,l="setTimeout",m="resize",t=m+"-special-event",v="delay",r="throttleWindow";s[v]=250;s[r]=true;n.event.special[m]={setup:function(){if(!s[r]&&this[l]){return false}var a=n(this);w=w.add(a);n.data(this,t,{w:a.width(),h:a.height()});if(w.length===1){q()}},teardown:function(){if(!s[r]&&this[l]){return false}var a=n(this);w=w.not(a);a.removeData(t);if(!w.length){clearTimeout(o)}},add:function(b){if(!s[r]&&this[l]){return false}var c;function a(d,h,g){var f=n(this),e=n.data(this,t);e.w=h!==u?h:f.width();e.h=g!==u?g:f.height();c.apply(this,arguments)}if(n.isFunction(b)){c=b;return a}else{c=b.handler;b.handler=a}}};function q(){o=p[l](function(){w.each(function(){var d=n(this),a=d.width(),b=d.height(),c=n.data(this,t);if(a!==c.w||b!==c.h){d.trigger(m,[c.w=a,c.h=b])}});q()},s[v])}})(jQuery,this)};