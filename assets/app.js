 'use strict'

 document.body.onload = function () {
 	if( SVG.supported ){

 		let panel = new Panel();
 		panel.initialize();
 	}else{
 		$('SVGDrawing').html('<h3>Votre navigateur ne supporte pas le SVG<h3>');
 	}
 }
