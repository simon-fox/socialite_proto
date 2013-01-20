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
    
    //gambit status & drive effects
    this.statusEffect = totalStatusEffect;
    this.angerEffect = totalAngerEffect;
    this.confidenceEffect = totalConfidenceEffect;
    this.lustEffect = totalLustEffect;
    this.prideEffect = totalPrideEffect;
    this.envyEffect = totalEnvyEffect;
    
    //gambit claimant and keybindings
    this.claimedBy = claimer;
    this.boundKeys = [];
}

/////////////////////
//set up the arrays//
/////////////////////

//modifiers first
modifiers.push(new modifier(
    this.modifierText = "test",
    this.modifierStatusEffect = 2,
    this.modifierAngerEffect = 3,
    this.modifierConfidenceEffect = 4,
    this.modifierLustEffect = 5,
    this.modifierPrideEffect = 6,
    this.modifierEnvyEffect = 7
));


//gambits
gambits.push(new gambit(
    this.gambitText = "test",
    this.gambitStatusEffect = 2,
    this.gambitAngerEffect = 3,
    this.gambitConfidenceEffect = 4,
    this.gambitLustEffect = 5,
    this.gambitPrideEffect = 6,
    this.gambitEnvyEffect = 7
));

//target objects
targetObjects.push(new targetObject(
    this.text = "",
    this.img = ""
));









