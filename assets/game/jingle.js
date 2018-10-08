/*
	jingle.js
	***
	Gestion de tout ce qui contient le jingle
*/

'use strict';
class Jingle{

	constructor( pointsMarker ){
		this.pointsMarker = pointsMarker;
		this.points = 0;
	}

	intialize(){
		$( this.pointsMarker ).html( this.points );
	}

	incPoints( pts ){
		this.points = this.points + pts;
		$( this.pointsMarker ).html( this.points );
	}
}