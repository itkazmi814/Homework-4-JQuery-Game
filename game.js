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
	myCharWins: false,	

	htmlMyCharStats: '<section class="stat-block d-block align-middle"><div class="row text-center justify-content-center"><div id="my-name" class="col-md-6 message"><p> Name here </p></div></div><div class="row text-center justify-content-center"><div id="my-hp" class="col-md-6 message"> <p> HP here </p></div></div><div class="row text-center justify-content-center"><div id="my-atk" class="col-md-6 message"><p> ATK here </p></div></div>',
	htmlEnemyStats: '<section class="stat-block"><div class="row text-center justify-content-center"><div id="enemy-name" class="col-md-6 message"><p> Name here </p></div></div><div class="row text-center justify-content-center"><div id="enemy-hp" class="col-md-6 message"> <p> HP here </p></div></div><div class="row text-center justify-content-center"><div id="enemy-atk" class="col-md-6 message"><p> ATK here </p></div></div>',
	htmlPlayButton: '<button id="play-button-box" class="transparent col-md-12"><img src="assets/playbutton.png"></button>',
	htmlAttackButton: '<button id="attack-button" class="transparent"><img class="img-fluid mx-auto d-block" src="assets/logo.png"></button>',


	repositionAllCharacters: function () {
		//create character objects and put them on screen
		this.createCharacters();
		
	}, //end initializeGame

	createCharacters: function () {
		this.pikachu = new this.characterGenerator("Pikachu",160,9,9,27,this.htmlPikachu);
		this.lucario = new this.characterGenerator("Lucario",240,15,5,18,this.htmlLucario);
		this.suicune = new this.characterGenerator("Suicune",400,10,2,12,this.htmlSuicune);
		this.gardevoir = new this.characterGenerator("Gardevoir",280,12,3,15,this.htmlGardevoir);

		this.charactersArray = []
		this.charactersArray.push(this.pikachu)
		this.charactersArray.push(this.lucario)
		this.charactersArray.push(this.suicune)
		this.charactersArray.push(this.gardevoir)

		$("#instructions-box").html("");
		$("#pos-one").html(this.pikachu.html);
		$("#pos-two").html(this.lucario.html);
		$("#pos-three").html(this.suicune.html);
		$("#pos-four").html(this.gardevoir.html);
	},

	characterGenerator: function (nameInput, hpInput, atkValInput, atkIncInput, cAtkValInput, htmlInput) {
		//creates a character object
		this.name = nameInput;
		this.hp = hpInput
		this.atkVal = atkValInput;
		this.atkInc = atkIncInput;
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
			game.sendMessage("Pick an enemy for " + game.myChar.name + " to fight against")
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
			if(game.myCharWins === true){
				game.reset(); //myCharWins = true; launch WIN
				// $(".character-btn").on("click",game.characterPressed);
			}
		}
		game.enemyCharAttacks();
		if(game.isCharAlive(game.myChar) === false){
			game.reset(); //myCharWins = false (default); launch LOSE
			// $(".character-btn").on("click",game.characterPressed);
		}
	}, //end attackButtonPressed function

	fightSetup: function () {
		

		$("#pos-two").html(this.myChar.html);
		$("#pos-three").html(this.enemyChar.html);

		$("#pos-one").html(this.htmlMyCharStats);
		$("#pos-four").html(this.htmlEnemyStats);

		this.sendMessage("Press POKKEN to fight!")

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
		$("#enemy-atk").html("CATK: " + this.enemyChar.cAtkVal)
	},

	myCharAttacks: function () {
		this.enemyChar.hp -= this.myChar.atkVal //myChar attack enemyChar
		this.myChar.atkVal += this.myChar.atkInc; //myChar's atkVal increases
		this.sendMessage("You dealt " + this.myChar.atkVal + " damage to " + this.enemyChar.name)
		this.updateOnScreenStats();
	}, //end myCharAttacks functions
	
	enemyCharAttacks: function () {
		if(this.enemyChar.hp > 0){
			this.myChar.hp -= this.enemyChar.cAtkVal
		}
		this.sendMessage()
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
				this.sendMessage("Choose your next opponent")
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

		if(this.choseEnemy === true){ //this.choseEnemy === true if there are no enemies remaining
			this.myCharWins = true;
		}
	
	}, //end benchEnemyStatus

	reset: function() {
		if(this.myCharWins === true){
			this.sendMessage("You won! Click Pikachu to try again")
		}else{
			this.sendMessage("You lost. Click Pikachu to try again")
		}

		$("#pos-two").html("");
		$("#pos-three").html("");
		$("#pos-one").html("");
		$("#pos-four").html("");
		$("#attack-button").html("")

		this.choseMyChar = false,
		this.choseEnemy = false;
		this.myCharWins = false;

		this.initializeGame();

	},
	
	sendMessage: function(message) {
		$("#message-box").text(message)
	},

	initializeGame: function () {
		$("#play-button-box").html(this.htmlPlayButton)
	
		$("#play-button-box").on("click",this.startGame)
	},

	startGame: function() {
		$("#play-button-box").html("")
		game.sendMessage("Pick your Pokemon to start");
		$("#attack-button").html(game.htmlAttackButton)
		game.createCharacters();
		game.repositionAllCharacters()
		$(".character-btn").on("click",game.characterPressed);
	}

	

} //end game object

game.initializeGame();
$(".character-btn").on("click",game.characterPressed);
$("#attack-button").on("click",game.attackButtonPressed);

}); //end $(document).ready(