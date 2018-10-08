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
		let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

		for(let i=0;i<8;++i){
			for( let j=0;j<8;++j ){
				let x = i*(width+offset);
				let y = j*(height+offset);
				element
					.rect(32, 32 )
					.move( x, y)
					.fill('#82D6FF');

				/*element
					.ellipse(32,32)
					.move(x,y).fill('#FFF9B8');

				element
				.text(alphabet[(i+j*8)%26])
				.font({size:30}).move( x+5,y );*/
				
			}
		}
	}


	propose( str ){

	}
}
