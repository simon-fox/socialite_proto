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
}

/////////////////////
//set up the arrays//
/////////////////////

//modifiers first
modifiers.push(new modifier(
    //content
    this.modifierText = "Calmly",
    //status effect
    this.modifierStatusEffect = 15,
    //drives
    this.modifierAngerEffect = 0,
    this.modifierConfidenceEffect = 15,
    this.modifierLustEffect = 0,
    this.modifierPrideEffect = 10, 
    this.modifierEnvyEffect = 0,
    //most affected
    this.mostAffectedIndex = "Confidence"
));
modifiers.push(new modifier(
    //content
    this.modifierText = "At the top of your voice",
    //status effect
    this.modifierStatusEffect = -10,
    //drives
    this.modifierAngerEffect = 25,
    this.modifierConfidenceEffect =105,
    this.modifierLustEffect = -5,
    this.modifierPrideEffect = 0, 
    this.modifierEnvyEffect = 0,
    //most affected
    this.mostAffectedIndex = "Anger"
));
modifiers.push(new modifier(
    //content
    this.modifierText = "Sincerely",
    //status effect
    this.modifierStatusEffect = 5,
    //drives
    this.modifierAngerEffect = -10,
    this.modifierConfidenceEffect = 15,
    this.modifierLustEffect = 0,
    this.modifierPrideEffect = 0, 
    this.modifierEnvyEffect = -25,
    //most affected
    this.mostAffectedIndex = "Envy"
));
modifiers.push(new modifier(
    //content
    this.modifierText = "Curtly",
    //status effect
    this.modifierStatusEffect = 15,
    //drives
    this.modifierAngerEffect = 15,
    this.modifierConfidenceEffect = 10,
    this.modifierLustEffect = -5,
    this.modifierPrideEffect = 0, 
    this.modifierEnvyEffect = 0,
    //most affected
    this.mostAffectedIndex = "Anger"
));
modifiers.push(new modifier(
    //content
    this.modifierText = "Saucily",
    //status effect
    this.modifierStatusEffect = 25,
    //drives
    this.modifierAngerEffect = 0,
    this.modifierConfidenceEffect = 15,
    this.modifierLustEffect = 20,
    this.modifierPrideEffect = 0, 
    this.modifierEnvyEffect = 0,
    //most affected
    this.mostAffectedIndex = "Lust"
));
modifiers.push(new modifier(
    //content
    this.modifierText = "Proudly",
    //status effect
    this.modifierStatusEffect = 20,
    //drives
    this.modifierAngerEffect = 0,
    this.modifierConfidenceEffect = 15,
    this.modifierLustEffect = 0,
    this.modifierPrideEffect = 25, 
    this.modifierEnvyEffect = 0,
    //most affected
    this.mostAffectedIndex = "Pride"
));


//gambits
gambits.push(new gambit(
    //content
    this.gambitText = "Insult",
    //status effect
    this.gambitStatusEffect = -25,
    //drives
    this.gambitAngerEffect = 15,
    this.gambitConfidenceEffect = 0,
    this.gambitLustEffect = 0,
    this.gambitPrideEffect = -15,
    this.gambitEnvyEffect = 0,
    //most affected
    this.mostAffectedIndex = "Anger"
));
gambits.push(new gambit(
    //content
    this.gambitText = "Compliment",
    //status effect
    this.gambitStatusEffect = 15,
    //drives
    this.gambitAngerEffect = 0,
    this.gambitConfidenceEffect = 0,
    this.gambitLustEffect = 10,
    this.gambitPrideEffect = 25,
    this.gambitEnvyEffect = 0,
    //most affected
    this.mostAffectedIndex = "Pride"
));
gambits.push(new gambit(
    //content
    this.gambitText = "Observe",
    //status effect
    this.gambitStatusEffect = 5,
    //drives
    this.gambitAngerEffect = 0,
    this.gambitConfidenceEffect = 10,
    this.gambitLustEffect = 0,
    this.gambitPrideEffect = 25,
    this.gambitEnvyEffect = 0,
    //most affected
    this.mostAffectedIndex = "Pride"
));
gambits.push(new gambit(
    //content
    this.gambitText = "Venerate",
    //status effect
    this.gambitStatusEffect = 15,
    //drives
    this.gambitAngerEffect = 0,
    this.gambitConfidenceEffect = 25,
    this.gambitLustEffect = 30,
    this.gambitPrideEffect = 0,
    this.gambitEnvyEffect = 0,
    //most affected
    this.mostAffectedIndex = "Lust"
));
gambits.push(new gambit(
    //content
    this.gambitText = "Scorn",
    //status effect
    this.gambitStatusEffect = -35,
    //drives
    this.gambitAngerEffect = 35,
    this.gambitConfidenceEffect = -25,
    this.gambitLustEffect = 0,
    this.gambitPrideEffect = 0,
    this.gambitEnvyEffect = 0,
    //most affected
    this.mostAffectedIndex = "Anger"
));
gambits.push(new gambit(
    //content
    this.gambitText = "Boast about",
    //status effect
    this.gambitStatusEffect = -15,
    //drives
    this.gambitAngerEffect = 20,
    this.gambitConfidenceEffect = -15,
    this.gambitLustEffect = 0,
    this.gambitPrideEffect = 0,
    this.gambitEnvyEffect = 25,
    //most affected
    this.mostAffectedIndex = "Envy"
));
gambits.push(new gambit(
    //content
    this.gambitText = "Brag about",
    //status effect
    this.gambitStatusEffect = -30,
    //drives
    this.gambitAngerEffect = 35,
    this.gambitConfidenceEffect = -35,
    this.gambitLustEffect = 0,
    this.gambitPrideEffect = 0,
    this.gambitEnvyEffect = 0,
    //most affected
    this.mostAffectedIndex = "Confidence"
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




