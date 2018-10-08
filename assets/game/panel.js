/*
	panel.js
	***
	gestion du panel de jeu
*/

'use strict';

class Panel{

	constructor() {

	}

	/*
		initialise le panel de jeu qui est une zone de dessin SVG
	*/
	initialize( SVGpanel ){
		let width = 32;
		let height = 32;
		let offset = 2;

		let element = SVG('SVGDrawing').size('100%',8*(offset+height));
		let clientWidth=element.node.clientWidth;
		let padWidth = 8*(offset+width);
		let startX = (clientWidth-padWidth)/2;

		for(let i=0;i<8;++i){
			for( let j=0;j<8;++j ){
				element.rect(32, 32 )
				.move(startX+i*(width+offset) , j*(height+offset))
				.fill('#82D6FF');
			}
		}
	}


	propose(){

	}
}
