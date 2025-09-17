// The Dragon's Quest - Enhanced (Tasks 1-3)
// Run with Node.js (needs readline-sync): npm install readline-sync

const readline = require('readline-sync');

// ---------------------------
// Game State & Basic Items
// ---------------------------
let gameRunning = true;
let playerName = "";
let playerHealth = 100;
let playerGold = 20;
let currentLocation = "village";

/* Base templates */
const healthPotion = {
    name: "Health Potion",
    type: "potion",
    value: 5,
    effect: 30,
    description: "Restores 30 health points"
};

const sword = {
    name: "Sword",
    type: "weapon",
    value: 10,
    effect: 10,
    description: "A sturdy blade for combat"
};

const woodenShield = {
    name: "Wooden Shield",
    type: "armor",
    value: 8,
    effect: 5,
    description: "Reduces damage taken in combat"
};

const ironShield = {
    name: "Iron Shield",
    type: "armor",
    value: 20,
    effect: 15,
    description: "A sturdy iron shield for solid protection"
};

const steelSword = {
    name: "Steel Sword",
    type: "weapon",
    value: 30,
    effect: 20,
    description: "A finely crafted blade with high damage"
};

// Inventory stores objects (copies when bought)
let inventory = [];

function getItemsByType(type) {
    return inventory.filter(item => item.type === type);
}

function getBestItem(type) {
    const items = getItemsByType(type);
    if (items.length === 0) return null;
    return items.reduce((best, current) => (current.effect > best.effect ? current : best));
}

function hasGoodEquipment() {
    const bestWeapon = getBestItem("weapon");
    const bestArmor = getBestItem("armor");
    return (bestWeapon && bestWeapon.name === "Steel Sword") && (bestArmor !== null);
}

function showStatus() {
    console.log("\n=== " + playerName + "'s Status ===");
    console.log("❤️  Health: " + playerHealth);
    console.log("💰 Gold: " + playerGold);
    console.log("📍 Location: " + currentLocation);

    console.log("🎒 Inventory:");
    if (inventory.length === 0) {
        console.log("   Nothing in inventory");
    } else {
        inventory.forEach((item, i) => {
            console.log(`   ${i + 1}. ${item.name} - ${item.description}`);
        });
    }
}

function showLocation() {
    console.log("\n=== " + currentLocation.toUpperCase() + " ===");

    if (currentLocation === "village") {
        console.log("You're in a bustling village. The blacksmith, market, and road to the mountain are nearby.");
        console.log("\nWhat would you like to do?");
        console.log("1: Go to blacksmith");
        console.log("2: Go to market");
        console.log("3: Enter forest (fight monsters)");
        console.log("4: Travel to mountain (dragon)");
        console.log("5: Check status");
        console.log("6: Use item");
        console.log("7: Help");
        console.log("8: Quit game");
    } else if (currentLocation === "blacksmith") {
        console.log("The heat from the forge fills the air. Weapons and armor line the walls.");
        console.log("\nWhat would you like to do?");
        console.log("1: Buy items (weapons & armor)");
        console.log("2: Return to village");
        console.log("3: Check status");
        console.log("4: Use item");
        console.log("5: Help");
        console.log("6: Quit game");
    } else if (currentLocation === "market") {
        console.log("Merchants sell their wares from colorful stalls. A potion seller catches your eye.");
        console.log("\nWhat would you like to do?");
        console.log("1: Buy potion(s)");
        console.log("2: Return to village");
        console.log("3: Check status");
        console.log("4: Use item");
        console.log("5: Help");
        console.log("6: Quit game");
    } else if (currentLocation === "forest") {
        console.log("The forest is dark and foreboding. Monsters lurk here.");
        console.log("\nWhat would you like to do?");
        console.log("1: Return to village");
        console.log("2: Check status");
        console.log("3: Use item");
        console.log("4: Help");
        console.log("5: Quit game");
    } else if (currentLocation === "mountain") {
        console.log("You approach the mountain where the dragon resides. Smoke rises from the peak.");
        console.log("\nWhat would you like to do?");
        console.log("1: Attempt to fight the dragon");
        console.log("2: Return to village");
        console.log("3: Check status");
        console.log("4: Use item");
        console.log("5: Help");
        console.log("6: Quit game");
    }
}

// ---------------------------
// Item usage & inventory
// ---------------------------
function useItem() {
    if (inventory.length === 0) {
        console.log("\nYou have no items!");
        return false;
    }

    console.log("\n=== Inventory ===");
    inventory.forEach((it, i) => console.log(`${i + 1}. ${it.name} - ${it.description}`));
    let choice = readline.question("Use which item? (number or 'cancel'): ");
    if (choice === 'cancel') return false;

    const idx = parseInt(choice) - 1;
    if (isNaN(idx) || idx < 0 || idx >= inventory.length) {
        console.log("\nInvalid item number!");
        return false;
    }

    const item = inventory[idx];
    if (item.type === "potion") {
        console.log(`\nYou drink the ${item.name}.`);
        playerHealth = updateHealth(item.effect);
        inventory.splice(idx, 1);
        console.log(`Health restored to: ${playerHealth}`);
        return true;
    } else if (item.type === "weapon") {
        console.log(`\nYou ready your ${item.name} for battle (equipped automatically in fights).`);
        return true;
    } else if (item.type === "armor") {
        console.log(`\nYou hold the ${item.name}, it will be used automatically for protection in combat.`);
        return true;
    }

    return false;
}

function buyFromBlacksmith() {
    console.log("\nBlacksmith shop: Items available:");
    const shopItems = [sword, steelSword, woodenShield, ironShield];
    shopItems.forEach((it, i) => {
        console.log(`${i + 1}. ${it.name} - ${it.description} (Cost: ${it.value} gold)`);
    });
    console.log("0. Cancel");

    let choice = readline.question("Buy which item? (number): ");
    const idx = parseInt(choice) - 1;
    if (isNaN(idx) || idx < -1 || idx >= shopItems.length) {
        console.log("Invalid choice.");
        return;
    }
    if (idx === -1) return;

    const selected = shopItems[idx];
    if (playerGold >= selected.value) {
        playerGold -= selected.value;
        inventory.push({ ...selected });
        console.log(`You bought a ${selected.name} for ${selected.value} gold.`);
        console.log(`Gold remaining: ${playerGold}`);
    } else {
        console.log("You can't afford that item.");
    }
}

function buyFromMarket() {
    console.log(`\nPotion seller: Health Potion - ${healthPotion.value} gold each (restores ${healthPotion.effect} HP).`);
    let qty = readline.question("How many potions would you like to buy? (number or 0 to cancel): ");
    const q = parseInt(qty);
    if (isNaN(q) || q < 0) {
        console.log("Invalid number.");
        return;
    }
    if (q === 0) return;

    const cost = q * healthPotion.value;
    if (playerGold >= cost) {
        playerGold -= cost;
        for (let i = 0; i < q; i++) inventory.push({ ...healthPotion });
        console.log(`You bought ${q} potion(s) for ${cost} gold. Gold remaining: ${playerGold}`);
    } else {
        console.log("You don't have enough gold.");
    }
}

// ---------------------------
// Health update helper
// ---------------------------
function updateHealth(amount) {
    playerHealth += amount;
    if (playerHealth > 100) playerHealth = 100;
    if (playerHealth < 0) playerHealth = 0;
    console.log("Health is now: " + playerHealth);
    return playerHealth;
}

// ---------------------------
// Combat System
// ---------------------------
function handleCombat(isDragon = false) {
    const monsterDamage = isDragon ? 20 : 10;
    let monsterHealth = isDragon ? 50 : 20;

    const bestWeapon = getBestItem("weapon");
    const bestArmor = getBestItem("armor");
    const weaponName = bestWeapon ? bestWeapon.name : "No weapon";
    const weaponPower = bestWeapon ? bestWeapon.effect : 1;
    const armorName = bestArmor ? bestArmor.name : "No armor";
    const armorProtection = bestArmor ? bestArmor.effect : 0;

    console.log("\n--- Combat Start ---");
    console.log(`Enemy: ${isDragon ? "Dragon (Boss)" : "Forest Monster"}`);
    console.log(`Enemy HP: ${monsterHealth}, Enemy Damage: ${monsterDamage}`);
    console.log(`Using Weapon: ${weaponName} (Damage: ${weaponPower})`);
    console.log(`Using Armor: ${armorName} (Protection: ${armorProtection})`);

    if (isDragon && !hasGoodEquipment()) {
        console.log("\nYou are not properly equipped to face the dragon.");
        console.log("You need the Steel Sword and at least one piece of armor to challenge the dragon.");
        return false;
    }

    while (monsterHealth > 0 && playerHealth > 0) {
        console.log(`\nYou strike the enemy for ${weaponPower} damage.`);
        monsterHealth -= weaponPower;
        if (monsterHealth <= 0) {
            console.log("You have defeated the enemy!");
            const goldFound = isDragon ? 100 : 10;
            playerGold += goldFound;
            console.log(`You loot ${goldFound} gold. Total gold: ${playerGold}`);

            if (isDragon) {
                console.log("\n=== DRAGON SLAIN ===");
                showFinalVictory();
                return true;
            }
            return true;
        } else {
            console.log(`Enemy HP remaining: ${monsterHealth}`);
        }

        let damageReceived = monsterDamage - armorProtection;
        if (damageReceived < 1) damageReceived = 1;
        console.log(`The enemy attacks! Incoming damage: ${monsterDamage}. Armor reduces it by ${armorProtection}. You take ${damageReceived} damage.`);
        updateHealth(-damageReceived);

        if (playerHealth <= 0) {
            console.log("\nYou have been slain in battle!");
            return false;
        }

        let action = readline.question("Press Enter to continue fighting, or type 'flee' to run: ");
        if (action.trim().toLowerCase() === 'flee') {
            console.log("You flee from combat and return to the village.");
            updateHealth(-5);
            return false;
        }
    }
    return false;
}

// ---------------------------
// FIXED: Movement Function
// ---------------------------
function move(choiceNum) {
    let validMove = false;

    if (currentLocation === "village") {
        if (choiceNum === 1) {
            currentLocation = "blacksmith";
            console.log("\nYou enter the blacksmith's shop.");
            validMove = true;
        } else if (choiceNum === 2) {
            currentLocation = "market";
            console.log("\nYou enter the market.");
            validMove = true;
        } else if (choiceNum === 3) {
            currentLocation = "forest";
            console.log("\nYou venture into the forest...");
            validMove = true;
            console.log("\nA monster appears!");
            if (!handleCombat(false)) {
                currentLocation = "village";
            }
        } else if (choiceNum === 4) {
            currentLocation = "mountain";
            console.log("\nYou travel to the mountain path.");
            validMove = true;
        }
    } else if (currentLocation === "blacksmith") {
        if (choiceNum === 2) {
            currentLocation = "village";
            console.log("\nYou return to the village center.");
            validMove = true;
        }
    } else if (currentLocation === "market") {
        if (choiceNum === 2) {
            currentLocation = "village";
            console.log("\nYou return to the village center.");
            validMove = true;
        }
    } else if (currentLocation === "forest") {
        if (choiceNum === 1) {
            currentLocation = "village";
            console.log("\nYou hurry back to the safety of the village.");
            validMove = true;
        }
    } else if (currentLocation === "mountain") {
        if (choiceNum === 2) {
            currentLocation = "village";
            console.log("\nYou descend back to the village.");
            validMove = true;
        }
    }

    return validMove;
}

// ---------------------------
// Helpers
// ---------------------------
function isValidChoice(input, max) {
    if (input === "") return false;
    const num = parseInt(input);
    return !isNaN(num) && num >= 1 && num <= max;
}

function showFinalVictory() {
    console.log("\n================================");
    console.log("  VICTORY! You have slain the dragon!");
    console.log("================================");
    console.log(`Hero: ${playerName}`);
    console.log(`Final Health: ${playerHealth}`);
    console.log(`Gold: ${playerGold}`);
    console.log("Inventory:");
    inventory.forEach((it, i) => console.log(`  ${i + 1}. ${it.name}`));
    console.log("\nThank you for playing!");
    gameRunning = false;
}

function showHelp() {
    console.log("\n=== AVAILABLE COMMANDS ===");
    console.log("- Use the numbered options displayed at each location.");
    console.log("- You need a weapon to win battles. Steel Sword + armor required for dragon.");
    console.log("- Potions restore health. Buy at the market.");
    console.log("- Buy weapons and armor at the blacksmith.");
    console.log("- In combat, you may press Enter to continue or type 'flee' to run away.");
}

// ---------------------------
// Main Game Loop
// ---------------------------
console.log("=================================");
console.log("       The Dragon's Quest        ");
console.log("=================================");
console.log("\nYour quest: Defeat the dragon in the mountains!");

playerName = readline.question("\nWhat is your name, brave adventurer? ");
console.log(`\nWelcome, ${playerName}! You start with ${playerGold} gold.`);

while (gameRunning) {
    showLocation();

    let maxChoice = 8;
    if (currentLocation === "blacksmith") maxChoice = 6;
    else if (currentLocation === "market") maxChoice = 6;
    else if (currentLocation === "forest") maxChoice = 5;
    else if (currentLocation === "mountain") maxChoice = 6;

    let input = readline.question("\nEnter choice (number): ");
    try {
        if (!isValidChoice(input, maxChoice)) {
            throw `Please enter a number between 1 and ${maxChoice}.`;
        }

        const choiceNum = parseInt(input);

        if (currentLocation === "village") {
            switch (choiceNum) {
                case 1: move(1); break;
                case 2: move(2); break;
                case 3: move(3); break;
                case 4: move(4); break;
                case 5: showStatus(); break;
                case 6: useItem(); break;
                case 7: showHelp(); break;
                case 8: console.log("\nThanks for playing!"); gameRunning = false; break;
            }
        } else if (currentLocation === "blacksmith") {
            switch (choiceNum) {
                case 1: buyFromBlacksmith(); break;
                case 2: move(2); break;
                case 3: showStatus(); break;
                case 4: useItem(); break;
                case 5: showHelp(); break;
                case 6: console.log("\nThanks for playing!"); gameRunning = false; break;
            }
        } else if (currentLocation === "market") {
            switch (choiceNum) {
                case 1: buyFromMarket(); break;
                case 2: move(2); break;
                case 3: showStatus(); break;
                case 4: useItem(); break;
                case 5: showHelp(); break;
                case 6: console.log("\nThanks for playing!"); gameRunning = false; break;
            }
        } else if (currentLocation === "forest") {
            switch (choiceNum) {
                case 1: move(1); break;
                case 2: showStatus(); break;
                case 3: useItem(); break;
                case 4: showHelp(); break;
                case 5: console.log("\nThanks for playing!"); gameRunning = false; break;
            }
        } else if (currentLocation === "mountain") {
            switch (choiceNum) {
                case 1:
                    console.log("\nYou approach the dragon's lair...");
                    const dragonResult = handleCombat(true);
                    if (!dragonResult) {
                        console.log("\nYou were unable to defeat the dragon (or retreated). You return to the village for now.");
                        currentLocation = "village";
                    }
                    break;
                case 2: move(2); break;
                case 3: showStatus(); break;
                case 4: useItem(); break;
                case 5: showHelp(); break;
                case 6: console.log("\nThanks for playing!"); gameRunning = false; break;
            }
        }

    } catch (err) {
        console.log("\nError: " + err);
        console.log("Please try again.");
    }

    if (playerHealth <= 0) {
        console.log("\nGame Over! Your health reached 0!");
        gameRunning = false;
    }
}
