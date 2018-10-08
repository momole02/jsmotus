 'use strict'

 document.body.onload = function () {
 	if( SVG.supported ){

 		let panel = new Panel();
 		panel.initialize(); /* initialiser la zone de jeu */


 		$('#propositionForm').on('submit' , (e)=>{
 			let word = $('#proposition').val();
 			panel.propose( word );
 			e.preventDefault();
 			
 		});
 		

 	}else{
 		$('SVGDrawing').html('<h3>Votre navigateur ne supporte pas le SVG<h3>');
 	}
 }
