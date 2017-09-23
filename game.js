$(document).ready(function() {

function characterGenerator(nameInput, hpInput, attackValInput, counterAtkValInput, htmlInput) {
	this.name = nameInput;
	this.hp = hpInput
	this.attackVal = attackValInput;
	this.counterAtkVal = counterAtkValInput
	this.html = htmlInput;

	this.attackEnemy = function () {
		console.log("function attackEnemy");
	};

	this.loseHP = function () {
		console.log("function loseHP");
	};




} //end characterGenerator function

var myChar = new characterGenerator("testName",100,10,5,"<p>testHTML</p>");
// console.log(myChar);
// myChar.attackEnemy();

$("button").on("click", function(){
	console.log($(".instructions"));
	$(".instructions")[0].innerText = "test"


})

}); //end $(document).ready(