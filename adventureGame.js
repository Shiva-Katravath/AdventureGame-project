//========================================
//The Dragon's Quest - Text Adventure Game
//A Progression-based learning project
//========================================

//Including readline for player input
const readline = require('readline-sync');

//Game state variables
let playerName = "";
let playerHealth = 100;
let playerGold = 20;
let currentlocation = "village";
let gameRunning = true;
let inventory = [];


console.log("=====================================");
console.log("           The Dragon's Quest.       ");
console.log("=====================================");
console.log("\nYour quest: Defeat the dragon in the mountains!");

//get player name
playerName = readline.question("\nwhat is yourname,brave adventurer?");
console.log("welcome to the game, " + playerName + "!");
console.log("you start with" + playerGold + "gold.")