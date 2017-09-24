$(document).ready(function() {

var game = {

	myChar: null, //holds the player's initially selected character
	enemyChar: null, //holds the enemy the player is currently fighting
	htmlPikachu: "<p>hello pikachu</p>",
	htmlLucario: "<p>hello lucario</p>",
	htmlSuicune: "<p>hello suicune</p>",
	htmlGardevoir: "<p>hello gardevoir</p>",
	choseMyChar: false,
	choseEnemy: false,
	pikachu: null,
	lucario: null,
	suicune: null,
	gardevoir: null	,
	charactersArray: [],			
	
	initializeCharacters: function () {
		this.pikachu = new this.characterGenerator("Pikachu",110,6,6,this.htmlPikachu);
		this.lucario = new this.characterGenerator("Lucario",110,6,6,this.htmlLucario);
		this.suicune = new this.characterGenerator("Suicune",110,6,6,this.htmlSuicune);
		this.gardevoir = new this.characterGenerator("Gardevoir",110,6,6,this.htmlGardevoir);

		this.charactersArray.push(this.pikachu)
		this.charactersArray.push(this.lucario)
		this.charactersArray.push(this.suicune)
		this.charactersArray.push(this.gardevoir)
	},

	characterGenerator: function (nameInput, hpInput, atkValInput, cAtkValInput, htmlInput) {
		//creates a character object
		this.name = nameInput;
		this.hp = hpInput
		this.atkVal = atkValInput;
		this.cAtkVal = cAtkValInput;
		this.html = htmlInput;
		this.chosen = false;

	}, //end characterGenerator function

	characterPressed: function () {
		//creates the player's character based on the ID of the button pressed
		//"this" refers to the button pressed by the player at character selection

		console.log($(this))

		if(game.choseMyChar === false){ //block runs if you have not picked a character$(this).attr("id") === "pikachu")

			for(var i = 0; i < game.charactersArray.length; i++){
				if($(this).attr("id") === game.charactersArray[i].name.toLowerCase()){
					game.myChar = game.charactersArray[i]
					game.choseMyChar = true //when true, the else block will run to set enemyChar
					game.charactersArray[i].chosen = true //marks the character as chosen
					console.log("your char: " + game.myChar.name)
				}
			}



			if($(this).attr("id") === "pikachu"){
				game.myChar = game.pikachu
				game.choseMyChar = true; 
				game.pikachu.chosen = true; 
				
				

			}else if($(this).attr("id") === "lucario"){
				game.myChar = game.lucario
				game.choseMyChar = true;
				game.lucario.chosen = true;
				console.log("your char: " + game.myChar.name)

			}else if($(this).attr("id") === "suicune"){
				game.myChar = game.suicune
				game.choseMyChar = true;
				game.suicune.chosen = true;
				console.log("your char: " + game.myChar.name)

			}else if($(this).attr("id") === "gardevoir"){
				game.myChar = game.gardevoir
				game.choseMyChar = true;
				game.gardevoir.chosen = true;
				console.log("your char: " + game.myChar.name)

			} //end choseMyChar === false block
		} else if(game.choseMyChar === true){ //block runs if you have picked a character - choseMyChar===true

			if($(this).attr("id") === "pikachu" && game.pikachu.chosen === false){
				game.enemyChar =  game.pikachu;
				game.choseEnemy = true;
				game.pikachu.chosen = true;

			}else if($(this).attr("id") === "lucario" && game.lucario.chosen === false){
				game.enemyChar = game.lucario
				game.choseEnemy = true;
				game.lucario.chosen = true;

			}else if($(this).attr("id") === "suicune" && game.suicune.chosen === false){
				game.enemyChar = game.suicune
				game.choseEnemy = true;
				game.suicune.chosen = true;

			}else if($(this).attr("id") === "gardevoir" && game.gardevoir.chosen === false){
				game.enemyChar = game.gardevoir
				game.choseEnemy = true;
				game.gardevoir.chosen = true;
				

			}else {
				console.log("You already chose " + game.myChar.name + " as your character.")

			}
		}//end choseMyChar === true block

	
		if(game.choseMyChar && game.choseEnemy){
			console.log("you are ready to play with " + game.myChar.name + " and " + game.enemyChar.name)
			//call repositioning function
		}

	}// end characterPressed function

} //end game object



	game.initializeCharacters();
	console.log(game.charactersArray)
	console.log(game.charactersArray[0])
	$(".character-btn").on("click",game.characterPressed);
	



}); //end $(document).ready(


		// $("#replace-test").html(myChar.html);
		//this will replace the html of the contents of the ID