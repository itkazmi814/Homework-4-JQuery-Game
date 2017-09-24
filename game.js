$(document).ready(function() {

	var game = {

	myChar: null, //holds the player's initially selected character
	enemyChar: null, //holds the enemy the player is currently fighting
	htmlPikachu: '<button id="pikachu" class="character-btn transparent mx-auto d-block"><img class="img-fluid mx-auto d-block" src="assets/pikachu.png"></button>',
	htmlLucario: '<button id="lucario" class="character-btn transparent mx-auto d-block img-fluid"><img class="img-fluid mx-auto d-block" src="assets/lucario.png"></button>',
	htmlSuicune: '<button id="suicune" class="character-btn transparent mx-auto d-block"><img class="img-fluid mx-auto d-block" src="assets/suicune.png"></button>',
	htmlGardevoir: '<button id="gardevoir" class="character-btn transparent mx-auto d-block"><img class="img-fluid mx-auto d-block" src="assets/gardevoir.png"></button>',

	choseMyChar: false,
	choseEnemy: false,
	pikachu: null,
	lucario: null,
	suicune: null,
	gardevoir: null	,
	charactersArray: [],		

	htmlMyCharStats: '<section class="stat-block mx-auto d-block"><div class="row text-center"><div id="my-name" class="col-md-12"><p> Name here </p></div></div><div class="row text-center"><div id="my-hp" class="col-md-12"> HP here </p></div></div><div class="row text-center"><div id="my-atk" class="col-md-12"><p> ATK here </p></div></div></section>',
	htmlEnemyStats: '<section class="stat-block mx-auto d-block"><div class="row text-center"><div id="enemy-name" class="col-md-12"><p> Name here </p></div></div><div class="row text-center"><div id="enemy-hp" class="col-md-12"><p> HP here </p></div></div><div class="row text-center"><div id="enemy-atk" class="col-md-12"><p> ATK here </p></div></div></section>',

	initializeCharacters: function () {
		this.pikachu = new this.characterGenerator("Pikachu",110,6,6,this.htmlPikachu);
		this.lucario = new this.characterGenerator("Lucario",120,6,6,this.htmlLucario);
		this.suicune = new this.characterGenerator("Suicune",130,6,6,this.htmlSuicune);
		this.gardevoir = new this.characterGenerator("Gardevoir",140,6,6,this.htmlGardevoir);

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
		console.log(this)
		game.selectOpponents(this);

		if(game.choseMyChar && game.choseEnemy){
			game.fightSetup(); //repositions myChar and enemyChar, displays stats, and attack button
		}
	}, // end characterPressed function

	selectOpponents: function (context) {
		if(game.choseMyChar === false){ //block runs if you have not picked a character$(this).attr("id") === "pikachu")

			for(var i = 0; i < game.charactersArray.length; i++){
				if($(context).attr("id") === game.charactersArray[i].name.toLowerCase()){
					game.myChar = game.charactersArray[i]
					game.choseMyChar = true //when true, the else block will run to set enemyChar
					game.charactersArray[i].chosen = true //marks the character as chosen
					console.log("your char: " + game.myChar.name)
				} //end if statement
			} //end myChar for loop
		}else if (game.choseMyChar === true) { //if you picked myChar, pick the enemy
			for(var i = 0; i < game.charactersArray.length; i++){
				if($(context).attr("id") === game.charactersArray[i].name.toLowerCase() && $(context).attr("id") !== game.myChar.name.toLowerCase()){
					game.enemyChar = game.charactersArray[i]
					game.choseEnemy = true //when true, the else block will run to set enemyChar
					game.charactersArray[i].chosen = true //marks the character as chosen
					console.log("enemy char: " + game.enemyChar.name)
				} //end if statement
			} //end enemyChar for loop
		}else{
			console.log("You already chose " + game.myChar.name + " as your character.")
		} //end chosemyChar conditionals
	}, //end selectOpponents function

	attackButtonPressed: function () {
		//"this" -> $("#attack-button")		
		game.myCharAttacks();
		if(game.isCharAlive(game.enemyChar) === false){
			game.benchEnemyStatus();
			if(game.choseEnemy === false){
				$(".character-btn").on("click",game.characterPressed);
			}
			//
		}
		game.enemyCharAttacks();
		if(game.isCharAlive(game.myChar) === false){
			//LOSE
		}



	}, //end attackButtonPressed function

	fightSetup: function () {
		$("#pos-two").html(this.myChar.html);
		$("#pos-three").html(this.enemyChar.html);

		$("#pos-one").html(this.htmlMyCharStats);
		$("#pos-four").html(this.htmlEnemyStats);

		this.updateOnScreenStats();
	}, //end fightSetup 

	updateOnScreenStats: function() {
		//Update myChar stats
		$("#my-name").html(this.myChar.name)
		$("#my-hp").html("HP: " + this.myChar.hp)
		$("#my-atk").html("ATK: " + this.myChar.atkVal)
		//Update enemyChar stats
		$("#enemy-name").html(this.enemyChar.name)
		$("#enemy-hp").html("HP: " + this.enemyChar.hp)
		$("#enemy-atk").html("ATK: " + this.enemyChar.atkVal)
	},

	myCharAttacks: function () {
		this.enemyChar.hp -= this.myChar.atkVal //myChar attack enemyChar
		this.myChar.atkVal += 6; //myChar's atkVal increases
		this.updateOnScreenStats();
	}, //end myCharAttacks functions
	
	enemyCharAttacks: function () {
		this.myChar.hp -= this.enemyChar.atkVal
		this.updateOnScreenStats()
	},

	isCharAlive: function (char) {
		if(char.hp > 0){
			return true //returns true if the character is alive
		}
		return false;
	},

	benchEnemyStatus: function () {
		var posFourFilled = false; //Used to determine where to place enemyChar

		for(var i=0; i<this.charactersArray.length; i++){
			if(this.charactersArray[i].chosen === false){
				$("#pos-one").html(this.myChar.html); //moves myChar in pos1
				$("#pos-two").html(""); //makes space between myChar and remaining enemies

				if(posFourFilled === false){
					this.choseEnemy = false //allows you to pick a new enemy at character select screen
					$("#pos-four").html(this.charactersArray[i].html); //puts non-chosen enemy on field
					posFourFilled = true;
					$("#pos-three").html("") //empties out the battle stats in pos4
				}else{ //only runs if a second character is found remaining
					$("#pos-three").html(this.charactersArray[i].html); //puts non-chosen enemy on field
				}
			}//end if
		} //end for loop
	
		//this.choseEnemy === true if there are no enemies remaining

	} //end benchEnemyStatus


} //end game object



game.initializeCharacters();
$(".character-btn").on("click",game.characterPressed);
$("#attack-button").on("click",game.attackButtonPressed);




}); //end $(document).ready(


		// $("#replace-test").html(myChar.html);
		//this will replace the html of the contents of the ID