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
		this.__currentRow = 0;
		this.__marker = 'SVGDrawing';
		this.width = 32;
		this.height = 32;
		this.offset = 3;
		this.points=0;
	}


	generateWord(){
		let dictLen = WORDS.length;
		let choosed="";
		do{
			let rnd = Math.floor( Math.random()*(dictLen-1) );
			choosed =  WORDS[rnd]; 
		}while( choosed.length!=8 );
		this.__toFind = choosed.toUpperCase();
		
		//console.log( this.__toFind);
		let indexes = [];
		for( let i=0;i<this.__toFind.length;++i )
			indexes.push(i);

		for( let i=0;i<5;++i ){ /* retirer 5 lettres */
			let idx = Math.floor(Math.random()*indexes.length);
			indexes = indexes.slice( 0 , idx ).concat( indexes.slice(idx+1,indexes.length) );
		}
		//console.log(indexes);
		this.__masked="";
		for( let i=0; i<this.__toFind.length;++i ){
			this.__masked += ((indexes.indexOf(i)!==-1) ? this.__toFind[i]: '.');
		}
	}
	/*
		initialise le panel de jeu qui est une zone de dessin SVG
	*/
	initialize( ){

		let width = this.width;
		let height = this.height;
		let offset = this.offset;
	
		let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

		this.__currentRow = 0;

		this.generateWord();
		$("#points").html(this.points);
		$('#'+this.__marker).html('');
		let element = SVG(this.__marker).size('100%',8*(offset+height));
		this.element = element;		
		
		for(let i=0;i<8;++i){
			for( let j=0;j<8;++j ){
				let x = i*(width+offset);
				let y = j*(height+offset);
				element
					.rect(32, 32 )
					.move( x, y)
					.fill('#82D6FF');
			}
		}
		this.writeWord( this.__masked );
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

	/* ecrit un mot */
	writeWord( word , analysis_results ){
		let element = this.element;
		let results = analysis_results;

		for( let i=0;i<8;++i ){

			let x = i*(this.width+this.offset)+5;
			let y = this.__currentRow*(this.height+this.offset);
			if( analysis_results != null && analysis_results != undefined ){
				if( results[i]['contain']===true ){
					if( results[i]['wellpos']===true ){ /* bien positionné */
						element
							.rect(32, 32 )
							.move(x-5, y)
							.fill('#F7A47C');
					}else{ /* mal positionné */
						element
							.ellipse(32,32)
							.move(x-5,y).fill('#FFF9B8');	

						
					}	
				}
			}

			element
				.text(word[i])
				.font({size:30}).move(x,y);
		}
	}

	/* effectue une propostion de mots */
	propose( str ){
		let regex = /^[ABCDEFGHIJKLMNOPQRSTUVWXYZ]+$/i;
		if( !regex.test(str) ){
			alert("Le mot ne dois pas contenir d'espaces et caractères spéciaux");	
		}else if(str.length !== 8){
			alert('Mot de 8 caractères exigé');
		}else{

			str = str.toUpperCase();
			let analysisResults = this.analyzeWord(str);
			this.__currentRow = this.__currentRow + 1;
			this.writeWord( str , analysisResults );
			let win=true;
			for( let i=0;i<analysisResults.length;++i ){
				if( !analysisResults[i].wellpos ) win=false;
			}
			if( win ){
				$('#SVGDrawing').html('<h3 style="color:green">Vous avez gagné !</h3>');
				setTimeout( ()=>{this.initialize()},1000);
				this.points = this.points+15;
				$("#points").html(this.points);

			}else{
				if( this.__currentRow==7 ){
					$('#SVGDrawing').html('<h3 style="color:red">Vous avez perdu !</h3>');
					setTimeout( ()=>{this.initialize()},1000 );	
				}
			}
		}
	}
}
