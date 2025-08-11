const readline = require('readline-sync');

let playerName = "";
let playerHealth = 100;
let playerGold = 20;
let currentlocation = "village";
let gameRunning = true;
let inventory = [];
// readline.question();
playerName = readline.question("\nwhat is yourname,brave adventurer?");
console.log("welcome to the game", playerName + "!");
console.log("you start with" + playerGold + "gold.")