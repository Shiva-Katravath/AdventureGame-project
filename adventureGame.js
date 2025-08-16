// ===========================================
// The Dragon's Quest - Text Adventure Game
// A progression-based learning project
// ===========================================

// Include readline for player input
const readline = require('readline-sync');

// Game state variables
let playerName = "";
let playerHealth = 100;
let playerGold = 20;  // Starting gold
let inventory = [];

// Weapon damage (starts at 0 until player buys a sword)
let weaponDamage = 0;      // Will increase to 10 when player gets a sword
console.log("Starting weapon damage: " + weaponDamage);
console.log("When you buy a sword, weapon damage will increase to 10!");

// Monster defense (affects combat outcomes)
let monsterDefense = 5;    // Monster's defense value
console.log("Monster defense: " + monsterDefense);
console.log("Monsters can withstand some damage in combat!");

// Healing potion restoration (matches final implementation)
let healingPotionValue = 30;  // How much health is restored
console.log("Healing potion value: " + healingPotionValue);
console.log("A potion will restore 30 health!");

console.log("=================================");
console.log("       The Dragon's Quest        ");
console.log("=================================");
console.log("\nYour quest: Defeat the dragon in the mountains!");

// Get player's name
playerName = readline.question("\nWhat is your name, brave adventurer? ");
console.log("\nWelcome, " + playerName + "!");
console.log("You start with " + playerGold + " gold.");

// =========================================
// START Lab: Adventure Loops
// =========================================
// Game state variables
let gameRunning = true;
let currentLocation = "village";
let firstVisit = true;
let hasWeapon = false;
let hasPotion = false;
let hasArmor = false;

// Main game loop
while (gameRunning) {
    // Location display
    if (currentLocation === "village") {
        console.log("\n=== VILLAGE ===");
        console.log("You're in a bustling village. The blacksmith and market are nearby.");
        
        console.log("\nWhat would you like to do?");
        console.log("1: Go to blacksmith");
        console.log("2: Go to market");
        console.log("3: Enter forest");
        console.log("4: Check status");
        console.log("5: Check inventory");
        console.log("6: Quit game");
        
        if (firstVisit) {
            console.log("\nVillager: 'Welcome, adventurer! Rumor has it there's a dragon in the mountains...'");
            firstVisit = false;
        }
    }
    else if (currentLocation === "blacksmith") {
        console.log("\n=== BLACKSMITH ===");
        console.log("The heat from the forge fills the air. Weapons and armor line the walls.");
        
        console.log("\nWhat would you like to do?");
        console.log("1: Return to village");
        console.log("2: Check status");
        console.log("3: Check inventory");
        console.log("4: Quit game");
    }
    else if (currentLocation === "market") {
        console.log("\n=== MARKET ===");
        console.log("Merchants sell their wares from colorful stalls. A potion seller catches your eye.");
        
        console.log("\nWhat would you like to do?");
        console.log("1: Return to village");
        console.log("2: Check status");
        console.log("3: Check inventory");
        console.log("4: Quit game");
    }
    else if (currentLocation === "forest") {
        console.log("\n=== FOREST ===");
        console.log("A dark forest surrounds you. You hear strange noises...");
        
        // Simple battle when entering forest
        let inBattle = true;
        let monsterHealth = 3;
        console.log("\nBattle started!");
        
        while (inBattle) {
            console.log("Monster health: " + monsterHealth);
            console.log("You attack!");
            monsterHealth--;
            
            if (monsterHealth <= 0) {
                console.log("Monster defeated!");
                inBattle = false;
            }
        }
        
        currentLocation = "village";  // Return to village after battle
        console.log("\nYou return to the safety of the village.");
    }

    // Get player choice
    let choice = readline.question("\nEnter choice (number): ");
    let choiceNum = parseInt(choice);

    // Handle choices based on location
    if (currentLocation === "village") {
        if (choiceNum === 1) {
            currentLocation = "blacksmith";
            console.log("\nYou enter the blacksmith's shop.");
        }
        else if (choiceNum === 2) {
            currentLocation = "market";
            console.log("\nYou enter the market.");
        }
        else if (choiceNum === 3) {
            currentLocation = "forest";
            console.log("\nYou venture into the forest...");
        }
        else if (choiceNum === 4) {
            // Show status
            console.log("\n=== " + playerName + "'s Status ===");
            console.log("❤️  Health: " + playerHealth);
            console.log("💰 Gold: " + playerGold);
            console.log("📍 Location: " + currentLocation);
        }
        else if (choiceNum === 5) {
            // Simple inventory check
            for (let slot = 1; slot <= 3; slot++) {
                console.log("Checking item slot " + slot + "...");
                if (slot === 1 && hasWeapon) {
                    console.log("Found: Sword");
                } else if (slot === 2 && hasPotion) {
                    console.log("Found: Health Potion");
                } else if (slot === 3 && hasArmor) {
                    console.log("Found: Shield");
                } else {
                    console.log("Empty slot");
                }
            }
        }
        else if (choiceNum === 6) {
            gameRunning = false;
            console.log("\nThanks for playing!");
        }
        else {
            console.log("\nInvalid choice! Please enter a number between 1 and 6.");
        }
    }
    else if (currentLocation === "blacksmith" || currentLocation === "market") {
        if (choiceNum === 1) {
            currentLocation = "village";
            console.log("\nYou return to the village center.");
        }
        else if (choiceNum === 2) {
            // Show status
            console.log("\n=== " + playerName + "'s Status ===");
            console.log("❤️  Health: " + playerHealth);
            console.log("💰 Gold: " + playerGold);
            console.log("📍 Location: " + currentLocation);
        }
        else if (choiceNum === 3) {
            // Simple inventory check
            for (let slot = 1; slot <= 3; slot++) {
                console.log("Checking item slot " + slot + "...");
                if (slot === 1 && hasWeapon) {
                    console.log("Found: Sword");
                } else if (slot === 2 && hasPotion) {
                    console.log("Found: Health Potion");
                } else if (slot === 3 && hasArmor) {
                    console.log("Found: Shield");
                } else {
                    console.log("Empty slot");
                }
            }
        }
        else if (choiceNum === 4) {
            gameRunning = false;
            console.log("\nThanks for playing!");
        }
        else {
            console.log("\nInvalid choice! Please enter a number between 1 and 4.");
        }
    }

    // Check if player died
    if (playerHealth <= 0) {
        console.log("\nGame Over! Your health reached 0!");
        gameRunning = false;
    }
}
// =========================================
// END Lab: Adventure Loops
// =========================================