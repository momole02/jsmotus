/*
	panel.js
	***
	gestion du panel de jeu
*/

'use strict';


const WORD_SIZE_MISMATCH = -1;

class Panel{

	constructor() {

		this.__toFind = "MOMOOOLE";
		this.__masked = "M.M..OL."; 
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


	/* analyse les differentes lettre du mot par rapport au mot à trouver */
	analyzeWord( word ){
		let results = [];
			if( word.length === this.__toFind.length ){
			for( let i=0;i<word.length;++i ){
				results[i] = {
					'letter' : word[i],
					'contain' : (this.__toFind.indexOf(word[i])!=-1), /* vrai si le mot à deviner contient cette lettre */
					'wellpos' : (this.__toFind[i]===word[i]), /* vrai si les position des lettres sont les memes dans 
					le mot à deviner et le mot soumis*/
				}
			}
			return results;
		}
		return WORD_SIZE_MISMATCH;
		
	}

	/* effectue une propostion de mots */
	propose( str ){
		let regex = /[^\s]/i;
		this.analyzeWord(str.toUpperCase());
	}
}
