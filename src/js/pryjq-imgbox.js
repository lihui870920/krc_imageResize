/*!
 * jQuery Proyectiva Plugnin: ImageBox v0.51
 * http://www.proyectiva.com
 *
 * Copyright 2010, Karacas @krc_ale
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 * Date: 26/11/2010 03:14 p.m.
 *		
 * 		Wrappear una imagen con un div-span y jQeriarlo:
 *		$(".JSimageBox").pryImageBox({typeOut : true})
 *		$(this).pryImageBox({typeOut : true, animTime:1, animTime:animTimep, horizontalAling:"CENTER", verticalAling:"CENTER", delayInit4Each:1});	
 *		
 *		//OPTIONS:
 *		typeOut : true,
 *		animTime : 0,
 *		reloads : 3,
 *		autoOcult_BackImageWrapper: true,
 *		autoOcult_OnErrorLoad: false,
 *		reloadTime4reintent: 1000,
 *		delayInit:10,
 *		delayInit4Each:50,
 *		avoidCahe:false,
 *		verticalAling: "CENTER",  "LEFT", "RIGHT"
 *		horizontalAling: "CENTER",  "TOP", "BOTTOM"
 *
 */

jQuery(function($){

	var pryBx_winLoaded = false;
	$(window).load(function() {
		pryBx_winLoaded = true;
	});

	var pryBx_indexCall = 0;
	var pryBx_dbgExecutes = 0;
	
 	$.fn.extend({ 
		
		////**********************************************************
		////CONSTRUCTOR
		////**********************************************************
 		pryImageBox: function(options) {
			
			////----------------------------------------------------------
			////DEFAULTS
			////----------------------------------------------------------
			var defaults = {
				typeOut : true,
				animTime : 0,
				reloads : 3,
				autoOcult_BackImageWrapper: true,
				autoOcult_OnErrorLoad: false,
				reloadTime4reintent: 1000,
				delayInit:0,
				delayInit4Each:0,
				avoidCahe:false,
				verticalAling: "CENTER",  /*"CENTER"*/ /*"LEFT"*/ /*"RIGHT"*/
				horizontalAling: "CENTER" /*"CENTER"*/ /*"TOP"*/ /*"BOTTOM"*/
			};
			var options =  $.extend(defaults, options);
			////----------------------------------------------------------
						
			////----------------------------------------------------------
			////PRIVATE AUX
			////GetResizeRestringImage DEVUELVE UN POINT DE ANCHO Y ALTO DE UNA IMAGEN Y SUS LIMITES FORZANDO HACERLA ENTRAR DENTRO DE LOS MÁXIMOS
			////----------------------------------------------------------
			function GetResizeRestringImage(_widthMAX,_heightMAX,_widthIMG,_heightIMG){
				var mi_proportion = (_widthIMG / _heightIMG);
				var mk_proportion = (_widthMAX / _heightMAX);
				var mi_new_width;
				var mi_new_height;
				if (_widthIMG >= _widthMAX || _heightIMG>= _heightMAX){
					if (mk_proportion > mi_proportion){
						mi_new_height =  (_heightMAX);
						mi_new_width  =  (mi_new_height * mi_proportion);
					}else{
						mi_new_width  =  (_widthMAX);
						mi_new_height =  (mi_new_width / mi_proportion);
					};
					if (mk_proportion == mi_proportion){
						mi_new_width =  (_widthMAX);
						mi_new_height = (_heightMAX);
					};
				}else{
					mi_new_width  = (_widthIMG);
					mi_new_height = (_heightIMG);
				};
				var point =new Object();
				point.x = mi_new_width;
				point.y = mi_new_height;
				return (point);
			};
			////----------------------------------------------------------
			////PRIVATE AUX
			////GetResizeCropImage DEVUELVE UN POINT DE ANCHO Y ALTO DE UNA IMAGEN Y SUS LIMITES DEJANDO QUE AL MENOS UNO DE LOS LADOS RESPETE EL MÁXIMO DE ANCHO O DE ALTO DEPENDIENDO DE LA PROPORCION
			////----------------------------------------------------------
			function GetResizeCropImage(_widthMAX,_heightMAX,_widthIMG,_heightIMG){
				var mi_proportion = (_widthIMG / _heightIMG);
				var mk_proportion = (_widthMAX / _heightMAX);
				var mi_new_width;
				var mi_new_height;
				
				if (mk_proportion < mi_proportion){
					mi_new_height = (_heightMAX);
					mi_new_width  = (mi_new_height * mi_proportion);
				}else{
					mi_new_width  = (_widthMAX);
					mi_new_height = (mi_new_width / mi_proportion);
				};
				if (mk_proportion == mi_proportion){
					mi_new_width = (_widthMAX);
					mi_new_height = (_heightMAX);
				};
				var point =new Object();
				point.x = mi_new_width;
				point.y = mi_new_height;
				return (point);
			};
			////----------------------------------------------------------
			////PRIVATE AUX
			////ALING
			////----------------------------------------------------------
			function boxaling($obj, $childImg){
				
				var boxWidth = Math.round ($obj.width());
				var boxHeight = Math.round ($obj.height());
				var imgWidth = Math.round ($childImg.width());
				var imgHeight = Math.round ($childImg.height());
								
				//X
				if (options.horizontalAling == "CENTER"){
					$childImg.css('margin-left', Math.round((imgWidth-boxWidth)/-2));
				};
				if (options.horizontalAling == "LEFT"){
					$childImg.css('margin-left', 0);
				};
				if (options.horizontalAling == "RIGHT"){
					$childImg.css('margin-left', -Math.round(imgWidth-boxWidth));
				};
				
				//Y
				if (options.verticalAling == "CENTER"){
					$childImg.css('margin-top' , Math.round((imgHeight-boxHeight)/-2));
				};
				if (options.verticalAling == "TOP"){
					$childImg.css('margin-top' , 0);
				};
				if (options.verticalAling == "BOTTOM"){
					$childImg.css('margin-top' , -Math.round(imgHeight-boxHeight));
				};
			};
			////----------------------------------------------------------
			
			
			////----------------------------------------------------------
			////PRIVATE
			////Manipula la imagen
			////----------------------------------------------------------			
			function ImpactResize($obj, $childImg){
				
				if ($childImg.hasRun || $childImg.processed) return; 
				
				$childImg.removeAttr("width"); 
				$childImg.removeAttr("height");
				$childImg.css('width','auto');
				$childImg.css('height','auto');
	
				var boxWidth = Math.round ($obj.width());
				var boxHeight = Math.round ($obj.height());
				var imgWidth = Math.round ($childImg.width());
				var imgHeight = Math.round ($childImg.height());
				
				if (boxWidth===0){
					boxWidth =imgWidth;
					$obj.width(boxWidth);
				};
				if (boxHeight===0){
					boxHeight = imgHeight;
					$obj.height(boxHeight);
				};
				
				//SI NECESITA EL REESCALADO
				if (imgWidth != boxWidth || imgHeight != boxHeight){
					var miNewSize = new Object();	
					if (options.typeOut) {
						miNewSize = GetResizeCropImage(boxWidth,boxHeight,imgWidth,imgHeight);
					}else{
						miNewSize = GetResizeRestringImage(boxWidth,boxHeight,imgWidth,imgHeight);
					};
					if (imgWidth != miNewSize.x || imgHeight !=  miNewSize.y){
						$childImg.width( Math.round (miNewSize.x));
						$childImg.height( Math.round (miNewSize.y));
					};
					boxaling($obj, $childImg)
				};
				
				//SHOW
				if (options.autoOcult_BackImageWrapper) $obj.css('background-image','none');
				
				var isVisible = $childImg.is(':visible');
				
				if (!isVisible)	{
					$childImg.stop(true, true).fadeIn(options.animTime);
					setTimeout(function(){
						$childImg.css('filter', 'alpha(opacity=100)');
						$childImg.css('-moz-opacity', '1');
						$childImg.css('-khtml-opacity', '1');
						$childImg.css('opacity', '1');
					},options.animTime*1.2);
				};

				
				$childImg.processed = true;
			};
			////----------------------------------------------------------
			
			////----------------------------------------------------------
			////PUBLIC START
			////----------------------------------------------------------
    		return this.each(function(indxObj) {

				var sprThis = $(this);
				var childImage = $('img:first', sprThis);
				if (childImage == null) return;	
				if (childImage.processed) return; 
				
				if (sprThis.css('display') != 'block') sprThis.css('display','block');
				if (sprThis.css('display') != 'hidden') sprThis.css('overflow','hidden');
				childImage.attr('alt', '');
				
				if  (options.avoidCahe){
					var tmpSrc = childImage.attr('src');
					childImage.attr('src', tmpSrc+'?'+Math.random());
				}
				
				//GUARDA VALORES
				childImage.hasRun = false;
				childImage.miid = pryBx_indexCall;
				childImage.reloads = 0;
				childImage.processed = false;
				
				//--------------------------------
				//LOAD
				function LoadImage($timeLoadImage){
					pryBx_dbgExecutes++;
					if (0)alert (pryBx_dbgExecutes);
					setTimeout(function(){
						///-------------
						if (childImage.hasRun || childImage.processed) return;			
						if (childImage.get(0).complete){
							if (!Boolean (childImage.width() === 0 && childImage.height() === 0)) {
								ImpactResize(sprThis, childImage);
								childImage.hasRun = true;	
							};
						};
						///-------------
						if (childImage.hasRun || childImage.processed) return;
						childImage.bind('load', function (event) {
							if (!Boolean (childImage.width() === 0 && childImage.height() === 0)) {
								ImpactResize(sprThis, childImage);
								childImage.hasRun = true;
							};
						}).each(function() {
							if(this.complete)childImage.trigger('load');
						});
						///-------------
						if (childImage.hasRun || childImage.processed) return;
						if (options.reloads > childImage.reloads){
							setTimeout(function(){
								if (childImage.hasRun || childImage.processed) return;
								LoadImage(0);
								childImage.reloads ++;
							},options.reloadTime4reintent);
						}else{
							if (options.autoOcult_OnErrorLoad){
								sprThis.hide();
								childImage.hasRun = true;
							};
						};
						///-------------
					},$timeLoadImage);
				};
				//--------------------------------
				
				
				if (pryBx_winLoaded){
					LoadImage(options.delayInit + (/*childImage.miid*/pryBx_indexCall*options.delayInit4Each));
					pryBx_indexCall++;
				}else{
					$(window).load(function(){
						LoadImage(options.delayInit + (/*childImage.miid*/pryBx_indexCall*options.delayInit4Each));
						pryBx_indexCall++;
					});
				};
								
    		});
			////----------------------------------------------------------

    	}
		////**********************************************************
	});
})(jQuery);

