//========================================
//The Dragon's Quest - Text Adventure Game
//A Progression-based learning project
//========================================

//Including readline for player input
const readline = require('readline-sync');

//Game state variables
let playerName = "";
let playerHealth = 100;
let playerGold = 20;//starting gold
let inventory = [];

// Weapon damage (starts at 0 until player buys a sword)
let weponDamage=0;
console.log("Starting wepon damage :"+weponDamage);
console.log("When you buy a sword , wepon damage will incerse to 10");

// Monster defense (affects combat outcomes)
let monsterDefence = 5;
console.log("Monster defence: "+monsterDefence);
console.log("Monster can withstand some damage in comat!");

// Healing potion restoration (matches final implementation)
let helingpointValue=30;
console.log("Heling point will be: "+helingpointValue);
console.log("Apotion will restore 30 helth!");

console.log("=====================================");
console.log("           The Dragon's Quest.       ");
console.log("=====================================");
console.log("\nYour quest: Defeat the dragon in the mountains!");

//get player name
playerName = readline.question("\nwhat is yourname,brave adventurer?");
console.log("welcome to the game, " + playerName + "!");
console.log("you start with" + playerGold + "gold.");

//location tracking
let currentlocation="Village";
let firstVisit=true;


//location checking and display
if(currentlocation=="village"){
    console.log("\n=====Village======");
    console.log("Your in the village.The black smith and the market are nere by .");
    console.log("\nWhere would you like to go!");
    console.log("1: go to blacksmit");
    console.log("2: go to market");
    console.log("3: enter forest");
    console.log("4: go to check status");
    console.log("6: go to Quit game");

    if(firstVisit){
        console.log("|n Villeger : Welcome the Adventure game player there is the dragon in the mountain");
        firstVisit=fals;
    }
}
else if(currentlocation === "blacksmit"){
    console.log("\n===Blacksmit===");
    console.log("The heat from the forest fills the the air. Wepons and armor line the walls.");
    console.log("\n Where would you like to go?");
    console.log("1:return to village");
    console.log("2: check status");
    console.log("3:Quit the game");
}

//Get play choice
let choice=readline.question("\nEnter your choice(number): ");
let choiceNum=parseInt(choice);

//choice handiling
if(currentlocation ==="village"){
    if(choiceNum ===1){
        currentlocation="blacksmith";
        console.log("\nYou enter the blacksmith shop.");
    }
    else if(choiceNum === 2){
        console.log("\nMarchents call out there wares.");
    }
    else if(choiceNum === 3){
        console.log("\nA dark path leads into the forest. Strange noise echo fromeithin.");
    }
    else if(choiceNum === 4){
        console.log("\n==="+playerName+"'s atatus ===");
        console.log("❤️ Helth :"+playerHealth);
        console.log("💰 gold"+playerGold);
        console.log("📍 Location: "+currentlocation);
    }
    else if(choiceNum === 5){
        console.log("\n Good by , adventure gamer");
    }

else{
    console.log("\n Invalid choice ! please enter any number form 1to 5");
}
}

else if(currentlocation =="blacksmith"){
    if(choiceNum===1){
        currentlocation=="village";
        console.log("\n You return to village");
    }
    else if(choiceNum === 2){
        console.log("\n==="+playerName+"'s atatus ===");
        console.log("❤️ Helth :"+playerHealth);
        console.log("💰 gold"+playerGold);
        console.log("📍 Location: "+currentlocation);
    }
    else if(choiceNum === 3){
        console.log("Good by brave adventure!");
    }
    else{
        console.log("\n INvalid entry please chose from 1 to 3");
    }
}