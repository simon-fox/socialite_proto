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
function constructedGambit(){
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
    this.heatEffect = gambitHeatEffect + modifierHeatEffect;
    
    //gambit claimant and keybindings
    this.claimedBy = claimer;
    this.boundKeys = [];
    
    //build switch
    this.onScreen = false;
    
    //timer
    this.gambitTimer = new Timer();
    
    //response?
    this.responseBoolean = response;
    this.responseBy = responseName;
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
    this.modifierHeatEffect = 0,
));
modifiers.push(new modifier(
    //content
    this.modifierText = "Shout something",
    //status effect
    this.modifierStatusEffect = 25,
    //Heat effect
    this.modifierHeatEffect = 0,
));
modifiers.push(new modifier(
    //content
    this.modifierText = "Mutter",
    //status effect
    this.modifierStatusEffect = 5,
    //Heat effect
    this.modifierHeatEffect = 0,
));
modifiers.push(new modifier(
    //content
    this.modifierText = "Whisper",
    //status effect
    this.modifierStatusEffect = 15,
    //Heat effect
    this.modifierHeatEffect = 0,
));
modifiers.push(new modifier(
    //content
    this.modifierText = "Mention something",
    //status effect
    this.modifierStatusEffect = 35,
    //Heat effect
    this.modifierHeatEffect = 0,
));


//gambits
gambits.push(new gambit(
    //content
    this.gambitText = "Angrily",
    //status effect
    this.gambitStatusEffect = -45,
    //Heat effect
    this.modifierHeatEffect = 0,
));
gambits.push(new gambit(
    //content
    this.gambitText = "Lovingly",
    //status effect
    this.gambitStatusEffect = -15,
    //Heat effect
    this.modifierHeatEffect = 0,
));
gambits.push(new gambit(
    //content
    this.gambitText = "Furiously",
    //status effect
    this.gambitStatusEffect = -35,
    //Heat effect
    this.modifierHeatEffect = 0,
));
gambits.push(new gambit(
    //content
    this.gambitText = "Mockingly",
    //status effect
    this.gambitStatusEffect = -45,
    //Heat effect
    this.modifierHeatEffect = 0,
));
gambits.push(new gambit(
    //content
    this.gambitText = "Archly",
    //status effect
    this.gambitStatusEffect = -45,
    //Heat effect
    this.modifierHeatEffect = 0,
));
gambits.push(new gambit(
    //content
    this.gambitText = "Sarcastically",
    //status effect
    this.gambitStatusEffect = -45,
    //Heat effect
    this.modifierHeatEffect = 0,
));
gambits.push(new gambit(
    //content
    this.gambitText = "Graciously",
    //status effect
    this.gambitStatusEffect = -45,
    //Heat effect
    this.modifierHeatEffect = 0,
));
gambits.push(new gambit(
    //content
    this.gambitText = "Wittily",
    //status effect
    this.gambitStatusEffect = -45,
    //Heat effect
    this.modifierHeatEffect = 0,
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

