//***///////////////////////////////////////////////////***//
//***// STORY OBJECT PROTOTYPE & OBJECT BUILDING HERE //***//
//***///////////////////////////////////////////////////***//

//we may well need a separate file for each story to keep
//acts/gambits/missions/cast in one place. 

//Story object
var storyObject = {
    title: "title",
    type: "Name of type", //might be redundant
    cast: [0,1,2,3], //bespoke playerCharacterObjects 
    acts: [0,1,2], 
}

//cast objects
storyObject.cast.push(new playerCharacter(
    this.pcName = "Mr Garrick",
    this.pcImg = "fullPortrait9.png",
    this.pcPortrait = "portrait9.png",
    this.pcTraitsArray = ["bitter", "determined", "boastful", "jealous"],
    this.pcBio = "Mr Garrick"
));

//Acts
var actObject = {
    tile: "title",
    inScene: obj,  //contains data to run into a function to generate cutscenes
    gambits: [0,1,2,3],
    modifiers: [0,1,2,3],
    missions: [0,1,2,3],
}

//inScene

//gambits - remember to push
actObject.gambits.push(new gambit(
    //content
    this.gambitText = "Bawdily",
    //status effect
    this.gambitStatusEffect = 5,
    //Heat effect
    this.gambitHeatEffect = -10
));

//modifiers 
actObject.modifiers.push(new modifier(
    //content
    this.modifierText = "Say something",
    //status effect
    this.modifierStatusEffect = 30,
    //Heat effect
    this.modifierHeatEffect = 10
));

//missions 
//Be lower status than player x!
actObject.missions.push(function secretMissionLowerStatus(targetVar, claimantVar){
    this.target = targetVar;
    this.claimant = claimantVar;
    this.text = 'Befriend '+this.target.playerCharacter.name+' by lowering your status!';
    this.amountToMatch = this.target.agent.status;
    this.checkAgainst = this.claimant.agent.status;
    this.type = "descend";
    this.category = "lowStatus";
    this.score = 1;
});
