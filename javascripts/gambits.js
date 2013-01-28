/////////////////////////*
/// Gambit prototypes ///*
/////////////////////////*

//modifier prototype
function modifier() {
    //text of the modifier
    this.text = modifierText;
    //status & drive effects
    this.statusEffect = modifierStatusEffect;
    //heat effect
    this.heatEffect = modifierHeatEffect;
}

//gambit prototype
function gambit() {
    //text of the gambit
    this.text = gambitText;
    //status & drive effects
    this.statusEffect = gambitStatusEffect;
    //heat effect
    this.heatEffect = gambitHeatEffect;
}

//target object prototype
function targetObject() {
    //target object text
    this.text = targetObjectText;
    //associated image src
    this.img = targetObjectImg;
}

//constructed gambit prototype
function constructedGambit(chosenModifier,chosenGambit,chosenTargetObject,chosenTargetCharacter,modifierStatusEffect,gambitStatusEffect,heatEffectSum,claimer,response,responseName){
    //the gambit message
    this.modifier = chosenModifier;
    this.gambit = chosenGambit;
    this.targetObject = chosenTargetObject;
    this.targetCharacter = chosenTargetCharacter;
    
    //modifier status effect
    //affects claimant
    this.statusEffectM = modifierStatusEffect;
    //gambit status effect
    //affects target 
    this.statusEffectG = gambitStatusEffect;
    //heat effect
    this.heatEffect = heatEffectSum;
    
    //gambit claimant and keybindings
    this.claimedBy = claimer;
    this.boundKeys = [];
    
    //response?
    this.responseBoolean = response;
    this.responseBy = responseName;
    
    //build switch
    this.onScreen = false;
    
    //timer
    this.gambitTimer = new Timer();
    
    //unique id
    this.constructedGambitID = Math.random()*1000000000000000000;
}

//////////////////////
// gambit assembler //
//////////////////////
function makeGambit(passedPlayer){
    console.log('making gambit for: '+passedPlayer);
     //declare variables for building the gambit
     var chosenModifier;
     var chosenGambit;
     var chosenTargetObject;
     var chosenTargetCharacter; //fill this up with empty string once we do targeting
     var modifierStatusEffect;
     var gambitStatusEffect;
     var heatEffectSum;
     var claimer;
     var response;
     var responseName;
     var constructedGambitObject
     
     /////////////////////////
     // lets build a gambit //
     /////////////////////////
     //Lets check if it's a response
     //console.log('claimants length: '+claimants.length);
     if (claimants.length){
         //we have something to respond to
         responseName = claimants[0].playerCharacter.name;
         response = true;
         //console.log('response in director: '+response)
         //autoTargeting - responses effectively target the previous claimant
         chosenTargetCharacter = claimants[0];
         //lazy hack to clear out claimants so only one response at a time :(
         claimants = [];
     }
     else if (claimants.length == 0){
         //nothing to respond to, not response specific stuff here
         response = false;
         responseName = "";
         //console.log('response in director: '+response)
         //autoTargeting - pick a random target character
         chosenTargetCharacter = "";
         
     }
     //build a normal gambit 
     //pick a random modifier from chosenDrive array
     chosenModifier = modifiers[Math.floor(Math.random() * modifiers.length)];
     //pick a random gambit from chosenDrive array
     chosenGambit = gambits[Math.floor(Math.random() * gambits.length)];
     //pick a random targetObject
     chosenTargetObject = targetObjects[Math.floor(Math.random() * targetObjects.length)];
     //modifier status effects
     modifierStatusEffect = chosenModifier.statusEffect;
     //gambit status effects
     gambitStatusEffect = chosenGambit.statusEffect;
     //conversational heat effect
     heatEffectSum = chosenModifier.heatEffect + chosenGambit.heatEffect;
     
    //decide who it gets distributed to 
    claimer = passedPlayer;
    //create constructedGambit
    constructedGambitObject = new constructedGambit(chosenModifier,chosenGambit,chosenTargetObject,chosenTargetCharacter,modifierStatusEffect,gambitStatusEffect,heatEffectSum,claimer,response,responseName);
    //append to constructedGambits array
    constructedGambits.push(constructedGambitObject);
    //append to player
    passedPlayer.agent.currentGambit = constructedGambitObject;
 
    //new activeGambitInterface
    var tempActiveGambitInterface = new gambitInterface(constructedGambitObject);
    //initialise a new interface with this gambit
    activeGambitInterfaces.push(tempActiveGambitInterface);
    //initialise
    tempActiveGambitInterface.init();
    
    
}

/////////////////////
//set up the arrays//
/////////////////////

//modifiers first
modifiers.push(new modifier(
    //content
    this.modifierText = "Say something",
    //status effect
    this.modifierStatusEffect = 30,
    //Heat effect
    this.modifierHeatEffect = 10
));
modifiers.push(new modifier(
    //content
    this.modifierText = "Shout something",
    //status effect
    this.modifierStatusEffect = 25,
    //Heat effect
    this.modifierHeatEffect = 30
));
modifiers.push(new modifier(
    //content
    this.modifierText = "Mutter",
    //status effect
    this.modifierStatusEffect = 5,
    //Heat effect
    this.modifierHeatEffect = 10
));
modifiers.push(new modifier(
    //content
    this.modifierText = "Whisper",
    //status effect
    this.modifierStatusEffect = 15,
    //Heat effect
    this.modifierHeatEffect = 5
));
modifiers.push(new modifier(
    //content
    this.modifierText = "Mention something",
    //status effect
    this.modifierStatusEffect = 15,
    //Heat effect
    this.modifierHeatEffect = 10
));
modifiers.push(new modifier(
    //content
    this.modifierText = "Sing something",
    //status effect
    this.modifierStatusEffect = 20,
    //Heat effect
    this.modifierHeatEffect = -15
));
modifiers.push(new modifier(
    //content
    this.modifierText = "Bellow",
    //status effect
    this.modifierStatusEffect = 25,
    //Heat effect
    this.modifierHeatEffect = 55
));
modifiers.push(new modifier(
    //content
    this.modifierText = "Purr something",
    //status effect
    this.modifierStatusEffect = 25,
    //Heat effect
    this.modifierHeatEffect = -25
));
modifiers.push(new modifier(
    //content
    this.modifierText = "Coo something",
    //status effect
    this.modifierStatusEffect = 15,
    //Heat effect
    this.modifierHeatEffect = -25
));

//gambits
gambits.push(new gambit(
    //content
    this.gambitText = "Angrily",
    //status effect
    this.gambitStatusEffect = -45,
    //Heat effect
    this.gambitHeatEffect = 30
));
gambits.push(new gambit(
    //content
    this.gambitText = "Lovingly",
    //status effect
    this.gambitStatusEffect = -15,
    //Heat effect
    this.gambitHeatEffect = -30
));
gambits.push(new gambit(
    //content
    this.gambitText = "Furiously",
    //status effect
    this.gambitStatusEffect = -35,
    //Heat effect
    this.gambitHeatEffect = 50
));
gambits.push(new gambit(
    //content
    this.gambitText = "Mockingly",
    //status effect
    this.gambitStatusEffect = -45,
    //Heat effect
    this.gambitHeatEffect = 20
));
gambits.push(new gambit(
    //content
    this.gambitText = "Archly",
    //status effect
    this.gambitStatusEffect = -45,
    //Heat effect
    this.gambitHeatEffect = 20
));
gambits.push(new gambit(
    //content
    this.gambitText = "Sarcastically",
    //status effect
    this.gambitStatusEffect = -45,
    //Heat effect
    this.gambitHeatEffect = 30
));
gambits.push(new gambit(
    //content
    this.gambitText = "Graciously",
    //status effect
    this.gambitStatusEffect = -45,
    //Heat effect
    this.gambitHeatEffect = -20
));
gambits.push(new gambit(
    //content
    this.gambitText = "Wittily",
    //status effect
    this.gambitStatusEffect = -45,
    //Heat effect
    this.gambitHeatEffect = -10
));
gambits.push(new gambit(
    //content
    this.gambitText = "Bawdily",
    //status effect
    this.gambitStatusEffect = 5,
    //Heat effect
    this.gambitHeatEffect = -10
));
gambits.push(new gambit(
    //content
    this.gambitText = "Nakedly",
    //status effect
    this.gambitStatusEffect = 5,
    //Heat effect
    this.gambitHeatEffect = 10
));
gambits.push(new gambit(
    //content
    this.gambitText = "Stupidly",
    //status effect
    this.gambitStatusEffect = 5,
    //Heat effect
    this.gambitHeatEffect = -50
));
gambits.push(new gambit(
    //content
    this.gambitText = "Nobly",
    //status effect
    this.gambitStatusEffect = -15,
    //Heat effect
    this.gambitHeatEffect = 10
));
gambits.push(new gambit(
    //content
    this.gambitText = "Nakedly",
    //status effect
    this.gambitStatusEffect = 5,
    //Heat effect
    this.gambitHeatEffect = 10
));
gambits.push(new gambit(
    //content
    this.gambitText = "Pompously",
    //status effect
    this.gambitStatusEffect = -25,
    //Heat effect
    this.gambitHeatEffect = 20
));


//target objects
targetObjects.push(new targetObject(
    this.targetObjectText = "Serving dish",
    this.targetObjectImg = ""
));
targetObjects.push(new targetObject(
    this.targetObjectText = "Clothing",
    this.targetObjectImg = ""
));
targetObjects.push(new targetObject(
    this.targetObjectText = "Teeth",
    this.targetObjectImg = ""
));
targetObjects.push(new targetObject(
    this.targetObjectText = "Armoire",
    this.targetObjectImg = ""
));
targetObjects.push(new targetObject(
    this.targetObjectText = "Trip to the orient",
    this.targetObjectImg = ""
));
targetObjects.push(new targetObject(
    this.targetObjectText = "Porcelain complexion",
    this.targetObjectImg = ""
));
targetObjects.push(new targetObject(
    this.targetObjectText = "Life choices",
    this.targetObjectImg = ""
));
targetObjects.push(new targetObject(
    this.targetObjectText = "Parisian automota",
    this.targetObjectImg = ""
));
targetObjects.push(new targetObject(
    this.targetObjectText = "Ego",
    this.targetObjectImg = ""
));
targetObjects.push(new targetObject(
    this.targetObjectText = "Taste",
    this.targetObjectImg = ""
));
targetObjects.push(new targetObject(
    this.targetObjectText = "Philosophy",
    this.targetObjectImg = ""
));
targetObjects.push(new targetObject(
    this.targetObjectText = "Profession",
    this.targetObjectImg = ""
));
targetObjects.push(new targetObject(
    this.targetObjectText = "Fine Ceramics",
    this.targetObjectImg = ""
));

