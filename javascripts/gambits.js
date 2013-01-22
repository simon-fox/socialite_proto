/////////////////////////*
/// Gambit prototypes ///*
/////////////////////////*

//modifier prototype
function modifier() {
    //text of the modifier
    this.text = modifierText;
    //status & drive effects
    this.statusEffect = modifierStatusEffect;
    this.angerEffect = modifierAngerEffect;
    this.confidenceEffect = modifierConfidenceEffect;
    this.lustEffect = modifierLustEffect;
    this.prideEffect = modifierPrideEffect;
    this.envyEffect = modifierEnvyEffect;
    //most affected
    this.mostAffected = mostAffectedIndex;
}

//gambit prototype
function gambit() {
    //text of the gambit
    this.text = gambitText;
    //status & drive effects
    this.statusEffect = gambitStatusEffect;
    this.angerEffect = gambitAngerEffect;
    this.confidenceEffect = gambitConfidenceEffect;
    this.lustEffect = gambitLustEffect;
    this.prideEffect = gambitPrideEffect;
    this.envyEffect = gambitEnvyEffect;
    //most affected
    this.mostAffected = mostAffectedIndex;
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
    
    //modifier status & drive effects
    //affects claimant
    this.statusEffectM = modifierStatusEffect;
    this.angerEffectM = modifierAngerEffect;
    this.confidenceEffectM = modifierConfidenceEffect;
    this.lustEffectM = modifierLustEffect;
    this.prideEffectM = modifierPrideEffect;
    this.envyEffectM = modifierEnvyEffect;
    //gambit status & drive effects
    //affects target 
    this.statusEffectG = gambitStatusEffect;
    this.angerEffectG = gambitAngerEffect;
    this.confidenceEffectG = gambitConfidenceEffect;
    this.lustEffectG = gambitLustEffect;
    this.prideEffectG = gambitPrideEffect;
    this.envyEffectG = gambitEnvyEffect;
    
    //gambit claimant and keybindings
    this.claimedBy = claimer;
    this.boundKeys = [];
    
    //gambit delivery schedule
    this.deliverySchedule = [];
    
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
    //drives
    this.modifierAngerEffect = 0,
    this.modifierConfidenceEffect = 15,
    this.modifierLustEffect = 0,
    this.modifierPrideEffect = 0, 
    this.modifierEnvyEffect = 0,
    //most affected
    this.mostAffectedIndex = "Confidence"
));
modifiers.push(new modifier(
    //content
    this.modifierText = "Shout something",
    //status effect
    this.modifierStatusEffect = 25,
    //drives
    this.modifierAngerEffect = 40,
    this.modifierConfidenceEffect = 0,
    this.modifierLustEffect = 0,
    this.modifierPrideEffect = 0, 
    this.modifierEnvyEffect = 0,
    //most affected
    this.mostAffectedIndex = "Anger"
));
modifiers.push(new modifier(
    //content
    this.modifierText = "Mutter",
    //status effect
    this.modifierStatusEffect = 5,
    //drives
    this.modifierAngerEffect = 0,
    this.modifierConfidenceEffect = 0,
    this.modifierLustEffect = 0,
    this.modifierPrideEffect = -10, 
    this.modifierEnvyEffect = 0,
    //most affected
    this.mostAffectedIndex = "Pride"
));
modifiers.push(new modifier(
    //content
    this.modifierText = "Whisper",
    //status effect
    this.modifierStatusEffect = 15,
    //drives
    this.modifierAngerEffect = 0,
    this.modifierConfidenceEffect = 0,
    this.modifierLustEffect = 30,
    this.modifierPrideEffect = 0, 
    this.modifierEnvyEffect = 0,
    //most affected
    this.mostAffectedIndex = "Lust"
));
modifiers.push(new modifier(
    //content
    this.modifierText = "Mention something",
    //status effect
    this.modifierStatusEffect = 35,
    //drives
    this.modifierAngerEffect = 0,
    this.modifierConfidenceEffect = 0,
    this.modifierLustEffect = 0,
    this.modifierPrideEffect = 0, 
    this.modifierEnvyEffect = 30,
    //most affected
    this.mostAffectedIndex = "Envy"
));


//gambits
gambits.push(new gambit(
    //content
    this.gambitText = "Angrily",
    //status effect
    this.gambitStatusEffect = -45,
    //drives
    this.gambitAngerEffect = 15,
    this.gambitConfidenceEffect = 0,
    this.gambitLustEffect = 0,
    this.gambitPrideEffect = 0,
    this.gambitEnvyEffect = 0,
    //most affected
    this.mostAffectedIndex = "Anger"
));
gambits.push(new gambit(
    //content
    this.gambitText = "Lovingly",
    //status effect
    this.gambitStatusEffect = -15,
    //drives
    this.gambitAngerEffect = 0,
    this.gambitConfidenceEffect = 0,
    this.gambitLustEffect = 40,
    this.gambitPrideEffect = 0,
    this.gambitEnvyEffect = 0,
    //most affected
    this.mostAffectedIndex = "Lust"
));
gambits.push(new gambit(
    //content
    this.gambitText = "Furiously",
    //status effect
    this.gambitStatusEffect = -35,
    //drives
    this.gambitAngerEffect = 25,
    this.gambitConfidenceEffect = 0,
    this.gambitLustEffect = 0,
    this.gambitPrideEffect = 0,
    this.gambitEnvyEffect = 0,
    //most affected
    this.mostAffectedIndex = "Anger"
));
gambits.push(new gambit(
    //content
    this.gambitText = "Mockingly",
    //status effect
    this.gambitStatusEffect = -45,
    //drives
    this.gambitAngerEffect = 0,
    this.gambitConfidenceEffect = 30,
    this.gambitLustEffect = 0,
    this.gambitPrideEffect = 0,
    this.gambitEnvyEffect = 0,
    //most affected
    this.mostAffectedIndex = "Confidence"
));
gambits.push(new gambit(
    //content
    this.gambitText = "Archly",
    //status effect
    this.gambitStatusEffect = -45,
    //drives
    this.gambitAngerEffect = 0,
    this.gambitConfidenceEffect = 0,
    this.gambitLustEffect = 0,
    this.gambitPrideEffect = 30,
    this.gambitEnvyEffect = 0,
    //most affected
    this.mostAffectedIndex = "Pride"
));
gambits.push(new gambit(
    //content
    this.gambitText = "Sarcastically",
    //status effect
    this.gambitStatusEffect = -45,
    //drives
    this.gambitAngerEffect = 0,
    this.gambitConfidenceEffect = 0,
    this.gambitLustEffect = 0,
    this.gambitPrideEffect = 0,
    this.gambitEnvyEffect = 30,
    //most affected
    this.mostAffectedIndex = "Envy"
));
gambits.push(new gambit(
    //content
    this.gambitText = "Graciously",
    //status effect
    this.gambitStatusEffect = -45,
    //drives
    this.gambitAngerEffect = 15,
    this.gambitConfidenceEffect = 0,
    this.gambitLustEffect = 0,
    this.gambitPrideEffect = 0,
    this.gambitEnvyEffect = 0,
    //most affected
    this.mostAffectedIndex = "Anger"
));
gambits.push(new gambit(
    //content
    this.gambitText = "Wittily",
    //status effect
    this.gambitStatusEffect = -45,
    //drives
    this.gambitAngerEffect = 0,
    this.gambitConfidenceEffect = 0,
    this.gambitLustEffect = 0,
    this.gambitPrideEffect = 40,
    this.gambitEnvyEffect = 0,
    //most affected
    this.mostAffectedIndex = "Pride"
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


//function to index gambits by drive most affected
function indexGambits(){
    for (var i=0;i<gambits.length;i++){
        if(gambits[i].mostAffected == "Anger"){
            angerGambits.push(gambits[i]);
        }
        else if(gambits[i].mostAffected == "Confidence"){
            confidenceGambits.push(gambits[i]);
        }
        else if(gambits[i].mostAffected == "Lust"){
            lustGambits.push(gambits[i]);
        }
        else if(gambits[i].mostAffected == "Pride"){
            prideGambits.push(gambits[i]);
        }
        else if(gambits[i].mostAffected == "Envy"){
            envyGambits.push(gambits[i]);
        }
    }
}

//function to index modifiers by drive most affected 
function indexModifiers(){
    for (var i=0;i<modifiers.length;i++){
        if(modifiers[i].mostAffected == "Anger"){
            angerModifiers.push(modifiers[i]);
        }
        else if(modifiers[i].mostAffected == "Confidence"){
            confidenceModifiers.push(modifiers[i]);
        }
        else if(modifiers[i].mostAffected == "Lust"){
            lustModifiers.push(modifiers[i]);
        }
        else if(modifiers[i].mostAffected == "Pride"){
            prideModifiers.push(modifiers[i]);
        }
        else if(modifiers[i].mostAffected == "Envy"){
            envyModifiers.push(modifiers[i]);
        }
    }
}




