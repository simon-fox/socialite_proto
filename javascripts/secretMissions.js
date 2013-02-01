///////////////////////////////////////**
// build secret mission proto's and  //**
//load them into secretMissions array//**
///////////////////////////////////////**

//outrage player x!
secretMissions.push(function secretMissionOutrage(targetVar, claimantVar){
    this.target = targetVar;
    this.claimant = claimantVar;
    this.text = 'Outrage '+this.target.playerCharacter.name+'!';
    this.amountToMatch = 101;
    this.checkAgainst = this.target.agent.outrage;
    this.type = "ascend";
});
//prevent player x from being outraged!
secretMissions.push(function secretMissionDontOutrage(targetVar, claimantVar){
    this.target = targetVar;
    this.claimant = claimantVar;
    this.text = this.text = 'Prevent '+this.target.playerCharacter.name+' from becoming outraged!';
    this.amountToMatch = 10;
    this.checkAgainst = this.target.agent.outrage;
    this.type = "descend";
});
//Be higher status than player x!
secretMissions.push(function secretMissionHigherStatus(targetVar, claimantVar){
    this.target = targetVar;
    this.claimant = claimantVar;
    this.text = 'Embarrass '+this.target.playerCharacter.name+' by raising your status!';
    this.amountToMatch = this.target.agent.status;
    this.checkAgainst = this.claimant.agent.status;
    this.type = "ascend";
});
//Be lower statys than player x!
secretMissions.push(function secretMissionLowerStatus(targetVar, claimantVar){
    this.target = targetVar;
    this.claimant = claimantVar;
    this.text = 'Befriend '+this.target.playerCharacter.name+' by lowering your status!';
    this.amountToMatch = this.target.agent.status;
    this.checkAgainst = this.claimant.agent.status;
    this.type = "descend";
});

//distirbute missions
function pickSecretMission(claimant){
    //give mission claimant
    var claimantVar = claimant; 
    //give mission target
    var targetVar;
    do {
        targetVar = playersArray[Math.floor(Math.random() * playersArray.length)];
    } while (targetVar == claimantVar);
    //init a mission
    var constructedMission = new secretMissions[Math.floor(Math.random() * secretMissions.length)](targetVar,claimantVar);
    //init an interface
    //push interfaqce into secretMissionInterfaces array
    var constructedMissionInterface = new secretMissionInterface(constructedMission);
    constructedMissionInterface.init();
    secretMissionInterfaces.push(constructedMissionInterface);
}







