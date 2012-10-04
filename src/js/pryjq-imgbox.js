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
(function ($) {
    $.extend($.fn, {
        pryImageBoxLive: function (options) {
            return $(this)
                .livequeryPryBox(function () {
                $(this)
                    .pryImageBox(options);
            });
        }
    });
})(jQuery);
/**/
(function ($) {
    var pryBx_indexCall = 0;
    var pryBx_dbgExecutes = 0;
    $.fn.extend({

        ////CONSTRUCTOR
        ////__________________________________________________________
        pryImageBox: function (options) {


            ////DEFAULTS
            ////__________________________________________________________
            var defaults = {
                typeOut: true,
                animTime: 0,
                autoOcult_BackImageWrapper: true,
                autoOcult_OnErrorLoad: true,
                avoidCahe: false,
                responsive: false,
                verticalAling: "CENTER",
                /*"CENTER" - "LEFT" - "RIGHT"*/
                horizontalAling: "CENTER"
                /*"CENTER" - "TOP"- "BOTTOM"*/
            };
            options = $.extend(defaults, options);
            if (options.responsive) {
                responsiveOn();
            }


            ////PRIVATE AUX
            ////GetResizeRestringImage DEVUELVE UN POINT DE ANCHO Y ALTO DE UNA IMAGEN Y SUS LIMITES FORZANDO HACERLA ENTRAR DENTRO DE LOS MÁXIMOS
            ////__________________________________________________________
            function GetResizeRestringImage(_widthMAX, _heightMAX, _widthIMG, _heightIMG) {
                var mi_proportion = (_widthIMG / _heightIMG);
                var mk_proportion = (_widthMAX / _heightMAX);
                var mi_new_width;
                var mi_new_height;
                if (_widthIMG >= _widthMAX || _heightIMG >= _heightMAX) {
                    if (mk_proportion > mi_proportion) {
                        mi_new_height = (_heightMAX);
                        mi_new_width = (mi_new_height * mi_proportion);
                    } else {
                        mi_new_width = (_widthMAX);
                        mi_new_height = (mi_new_width / mi_proportion);
                    }
                    if (mk_proportion == mi_proportion) {
                        mi_new_width = (_widthMAX);
                        mi_new_height = (_heightMAX);
                    }
                } else {
                    mi_new_width = (_widthIMG);
                    mi_new_height = (_heightIMG);
                }
                var point = {};
                point.x = mi_new_width;
                point.y = mi_new_height;
                return (point);
            }


            ////PRIVATE AUX
            ////GetResizeCropImage DEVUELVE UN POINT DE ANCHO Y ALTO DE UNA IMAGEN Y SUS LIMITES DEJANDO QUE AL MENOS UNO DE LOS LADOS RESPETE EL MÁXIMO DE ANCHO O DE ALTO DEPENDIENDO DE LA PROPORCION
            ////__________________________________________________________
            function GetResizeCropImage(_widthMAX, _heightMAX, _widthIMG, _heightIMG) {
                var mi_proportion = (_widthIMG / _heightIMG);
                var mk_proportion = (_widthMAX / _heightMAX);
                var mi_new_width;
                var mi_new_height;

                if (mk_proportion < mi_proportion) {
                    mi_new_height = (_heightMAX);
                    mi_new_width = (mi_new_height * mi_proportion);
                } else {
                    mi_new_width = (_widthMAX);
                    mi_new_height = (mi_new_width / mi_proportion);
                }
                if (mk_proportion == mi_proportion) {
                    mi_new_width = (_widthMAX);
                    mi_new_height = (_heightMAX);
                }
                var point = {};
                point.x = mi_new_width;
                point.y = mi_new_height;
                return (point);
            }


            ////PRIVATE AUX
            ////ALING
            ////__________________________________________________________
            function boxaling($obj, $childImg) {

                var boxWidth = Math.round($obj.width());
                var boxHeight = Math.round($obj.height());
                var imgWidth = Math.round($childImg.width());
                var imgHeight = Math.round($childImg.height());

                //X
                if (options.horizontalAling == "CENTER") {
                    $childImg.css('margin-left', Math.round((imgWidth - boxWidth) / -2));
                }
                if (options.horizontalAling == "LEFT") {
                    $childImg.css('margin-left', 0);
                }
                if (options.horizontalAling == "RIGHT") {
                    $childImg.css('margin-left', - Math.round(imgWidth - boxWidth));
                }

                //Y
                if (options.verticalAling == "CENTER") {
                    $childImg.css('margin-top', Math.round((imgHeight - boxHeight) / -2));
                }
                if (options.verticalAling == "TOP") {
                    $childImg.css('margin-top', 0);
                }
                if (options.verticalAling == "BOTTOM") {
                    $childImg.css('margin-top', - Math.round(imgHeight - boxHeight));
                }
            }


            ////Manipula la imagen
            ////__________________________________________________________
            function ImpactResize($obj, $childImg) {

                if ($childImg.hasRun || $childImg.processed) return;

                $childImg.removeAttr("width");
                $childImg.removeAttr("height");
                $childImg.css('width', 'auto');
                $childImg.css('height', 'auto');

                var boxWidth = Math.round($obj.width());
                var boxHeight = Math.round($obj.height());
                var imgWidth = Math.round($childImg.width());
                var imgHeight = Math.round($childImg.height());

                if (boxWidth === 0) {
                    boxWidth = imgWidth;
                    $obj.width(boxWidth);
                }
                if (boxHeight === 0) {
                    boxHeight = imgHeight;
                    $obj.height(boxHeight);
                }

                //SI NECESITA EL REESCALADO
                if (imgWidth != boxWidth || imgHeight != boxHeight) {
                    var miNewSize = {};

                    if (options.typeOut) {
                        miNewSize = GetResizeCropImage(boxWidth, boxHeight, imgWidth, imgHeight);
                    } else {
                        miNewSize = GetResizeRestringImage(boxWidth, boxHeight, imgWidth, imgHeight);
                    }
                    if (imgWidth != miNewSize.x || imgHeight != miNewSize.y) {
                        $childImg.width(Math.round(miNewSize.x));
                        $childImg.height(Math.round(miNewSize.y));
                    }

                    boxaling($obj, $childImg);
                }

                if ($childImg.firstProcessed) {
                    $childImg.processed = true;
                    return;
                }

                //SHOW
                if (options.autoOcult_BackImageWrapper) $obj.css('background-image', 'none');

                $childImg.stop(true, true)
                    .fadeTo(options.animTime, 1);
                $childImg.processed = true;
                $childImg.firstProcessed = true;
            }


            ////PUBLIC START
            ////__________________________________________________________
            return this.each(function (indxObj) {

                var sprThis = $(this);
                var childImage = $('img:first', sprThis);
                if (childImage === null || childImage.processed) return null;
                if (childImage === undefined || childImage === null) {
                    dioError();
                    return null;
                }

                //Opacity 0
                childImage.fadeTo(0, 0);
                childImage.css('visibility', 'visible');


                if (sprThis.css('display') != 'block') sprThis.css('display', 'block');
                if (sprThis.css('overflow') != 'hidden') sprThis.css('overflow', 'hidden');


                if (options.avoidCahe) {
                    var tmpSrc = childImage.attr('src');
                    childImage.attr('src', tmpSrc + '?' + Math.random());
                }

                //GUARDA VALORES
                childImage.hasRun = false;
                childImage.processed = false;
                childImage.error_ = false;
                childImage.firstProcessed = false;
                childImage.error(function () {
                    dioError();
                    return null;
                });


                function dioError() {
                    childImage.error_ = true;
                    childImage.hasRun = true;
                    sprThis.css('visibility', 'hidden');
                }

                if (options.responsive) {
                    sprThis.resize(function (e) {
                        var _sprThis = $(this);
                        var _childImage = $('img:first', _sprThis);
                        if (_childImage.firstProcessed === false) return;
                        _childImage.hasRun = false;
                        _childImage.processed = false;
                        ImpactResize(_sprThis, _childImage);
                        _childImage.hasRun = true;
                    });
                }

                childImage.load(function () {
                    if (!Boolean(childImage.width() === 0 && childImage.height() === 0)) {
                        ImpactResize(sprThis, childImage);
                        childImage.hasRun = true;
                    }
                })
                    .each(function () {
                    if (this.complete) {
                        childImage.trigger('load');
                    }
                });

            });
        }
    });
})(jQuery);
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
(function($){$.extend($.fn,{livequeryPryBox:function(type,fn,fn2){var self=this,q;if($.isFunction(type)){fn2=fn,fn=type,type=undefined;}$.each($.livequeryPryBox.queries,function(i,query){if(self.selector==query.selector&&self.context==query.context&&type==query.type&&(!fn||fn.$lqguid==query.fn.$lqguid)&&(!fn2||fn2.$lqguid==query.fn2.$lqguid)){return(q=query)&&false;}});q=q||new $.livequeryPryBox(this.selector,this.context,type,fn,fn2);q.stopped=false;q.run();return this;},expire:function(type,fn,fn2){var self=this;if($.isFunction(type)){fn2=fn,fn=type,type=undefined;}$.each($.livequeryPryBox.queries,function(i,query){if(self.selector==query.selector&&self.context==query.context&&(!type||type==query.type)&&(!fn||fn.$lqguid==query.fn.$lqguid)&&(!fn2||fn2.$lqguid==query.fn2.$lqguid)&&!this.stopped){$.livequeryPryBox.stop(query.id);}});return this;}});$.livequeryPryBox=function(selector,context,type,fn,fn2){this.selector=selector;this.context=context;this.type=type;this.fn=fn;this.fn2=fn2;this.elements=[];this.stopped=false;this.id=$.livequeryPryBox.queries.push(this)-1;fn.$lqguid=fn.$lqguid||$.livequeryPryBox.guid++;if(fn2){fn2.$lqguid=fn2.$lqguid||$.livequeryPryBox.guid++;}return this;};$.livequeryPryBox.prototype={stop:function(){var query=this;if(this.type){this.elements.unbind(this.type,this.fn);}else{if(this.fn2){this.elements.each(function(i,el){query.fn2.apply(el);});}}this.elements=[];this.stopped=true;},run:function(){if(this.stopped){return;}var query=this;var oEls=this.elements,els=$(this.selector,this.context),nEls=els.not(oEls);this.elements=els;if(this.type){nEls.bind(this.type,this.fn);if(oEls.length>0){$.each(oEls,function(i,el){if($.inArray(el,els)<0){$.event.remove(el,query.type,query.fn);}});}}else{nEls.each(function(){query.fn.apply(this);});if(this.fn2&&oEls.length>0){$.each(oEls,function(i,el){if($.inArray(el,els)<0){query.fn2.apply(el);}});}}}};$.extend($.livequeryPryBox,{guid:0,queries:[],queue:[],running:false,timeout:null,checkQueue:function(){if($.livequeryPryBox.running&&$.livequeryPryBox.queue.length){var length=$.livequeryPryBox.queue.length;while(length--){$.livequeryPryBox.queries[$.livequeryPryBox.queue.shift()].run();}}},pause:function(){$.livequeryPryBox.running=false;},play:function(){$.livequeryPryBox.running=true;$.livequeryPryBox.run();},registerPlugin:function(){$.each(arguments,function(i,n){if(!$.fn[n]){return;}var old=$.fn[n];$.fn[n]=function(){var r=old.apply(this,arguments);$.livequeryPryBox.run();return r;};});},run:function(id){if(id!==undefined){if($.inArray(id,$.livequeryPryBox.queue)<0){$.livequeryPryBox.queue.push(id);}}else{$.each($.livequeryPryBox.queries,function(id){if($.inArray(id,$.livequeryPryBox.queue)<0){$.livequeryPryBox.queue.push(id);}});}if($.livequeryPryBox.timeout){clearTimeout($.livequeryPryBox.timeout);}$.livequeryPryBox.timeout=setTimeout($.livequeryPryBox.checkQueue,20);},stop:function(id){if(id!==undefined){$.livequeryPryBox.queries[id].stop();}else{$.each($.livequeryPryBox.queries,function(id){$.livequeryPryBox.queries[id].stop();});}}});$.livequeryPryBox.registerPlugin("append","prepend","after","before","wrap","attr","removeAttr","addClass","removeClass","toggleClass","empty","remove","html");$(function(){$.livequeryPryBox.play();});})(jQuery);
/*
* jQuery resize event - v1.1 - 3/14/2010
* http://benalman.com/projects/jquery-resize-plugin/
* Copyright (c) 2010 "Cowboy" Ben Alman
* Dual licensed under the MIT and GPL licenses.
* http://benalman.com/about/license/
*/
var responPluginInit = false;
function responsiveOn(){
	if (responPluginInit) return;
	responPluginInit = true;
	(function($,h,c){var a=$([]),e=$.resize=$.extend($.resize,{}),i,k="setTimeout",j="resize",d=j+"-special-event",b="delay",f="throttleWindow";e[b]=250;e[f]=true;$.event.special[j]={setup:function(){if(!e[f]&&this[k]){return false}var l=$(this);a=a.add(l);$.data(this,d,{w:l.width(),h:l.height()});if(a.length===1){g()}},teardown:function(){if(!e[f]&&this[k]){return false}var l=$(this);a=a.not(l);l.removeData(d);if(!a.length){clearTimeout(i)}},add:function(l){if(!e[f]&&this[k]){return false}var n;function m(s,o,p){var q=$(this),r=$.data(this,d);r.w=o!==c?o:q.width();r.h=p!==c?p:q.height();n.apply(this,arguments)}if($.isFunction(l)){n=l;return m}else{n=l.handler;l.handler=m}}};function g(){i=h[k](function(){a.each(function(){var n=$(this),m=n.width(),l=n.height(),o=$.data(this,d);if(m!==o.w||l!==o.h){n.trigger(j,[o.w=m,o.h=l])}});g()},e[b])}})(jQuery,this);
}