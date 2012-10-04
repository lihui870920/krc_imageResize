#jQuery Plug-in | pryImageBox v0.59
04-10-12
Copyright 2012, Karacas / @krc_ale / www.proyectiva.com
Licensed under the MIT

#A jQuery Plugin to resize images to fit in a container

##Ej:
```
	HTML:
	<div id="container" class="imgBox" style="width:300px; height:200px;">
		<img alt="" src="http://www.juegostoystory.net/files/image/2010_Toy_Story_3_USLC12_Woody.jpg"/>
	</div>

	JS:
	$(".imgBox").pryImageBox()

	+ Options:
	$(".imgBox").pryImageBox({typeOut : true, animTime: 300, verticalAling: "CENTER", horizontalAling: "CENTER})
```
view in action:	http://goo.gl/9XZOv


##Fatures:
```
	- Align
	- Crop
	- FadeIn anim
	- All browsers (Incl. ie6)
```


##Options:
```
typeOut: true,
animTime: 0,
responsive: false,
verticalAling: "CENTER", //"LEFT", "RIGHT"
horizontalAling: "CENTER" //"TOP", "BOTTOM"
```

