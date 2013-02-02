/////////////////////////*
/// global variabless ///*
/////////////////////////*

//main game loop
var mainLoop;
//delta of the main loop
var delta;
//then defined for game loop delta
var then = Date.now();
//all active players in the game
var playersArray = [];
//all active player summary interfaces
var activePlayerSummaryInterfaces = [];
//all active gambit interfaces
var activeGambitInterfaces = [];
//player character global array
var playerCharacters = [];
//claimants array
var claimants = [];
//secret missions
var secretMissions = [];
//secret mission interfaces
var secretMissionInterfaces = [];
//keysets for binding
var setOne = {
    keys:["q","w","e","r"],
    keyCodes:[81,87,69,82],
    bound: false
}
var setTwo = {
    keys:["u","i","o","p"],
    keyCodes:[85,73,79,80],
    bound: false
}
var setThree = {
    keys:["z","x","c","v"],
    keyCodes:[90,88,67,86],
    bound: false
}
var setFour = {
    keys:["h","j","k","l"],
    keyCodes:[72,74,75,76],
    bound: false
}
var keySets = [setOne,setTwo,setThree,setFour];
//gambit pieces
var modifiers = [];
var gambits = [];
var targetObjects = [];
//constructed gambits
var constructedGambits = [];
//status leaderboard
var statusLeaderboard = [];
//main game timer
var mainGameTimer;
//how many gambits can we have at once?
var numberOfGambitsOnStage = 2;

/////////////////////////////
//function to update scores//
/////////////////////////////
function updateScores(passedConstructedGambit){
    console.log('scores updating');
    //send modifier effect to claimant
    console.log("claimed by: "+passedConstructedGambit.claimedBy.playerCharacter.name+' Target: '+passedConstructedGambit.targetCharacter.playerCharacter.name)
    passedConstructedGambit.claimedBy.agent.status =  passedConstructedGambit.claimedBy.agent.status + passedConstructedGambit.statusEffectM;
    //send gambit effects to target
    passedConstructedGambit.targetCharacter.agent.status =  passedConstructedGambit.targetCharacter.agent.status + passedConstructedGambit.statusEffectG;
    //send outrage effect to target
    passedConstructedGambit.targetCharacter.agent.outrage = passedConstructedGambit.targetCharacter.agent.outrage + passedConstructedGambit.heatEffect; 
}

////////////////////
// start the game //
////////////////////
function startGame(){
    //show main game interface
    $('.mainGameContainer').show();
    //loop though playersArray
    for (var i = 0;i<playersArray.length;i++){
        //run playerSummaryInterface.init();
        playersArray[i].interface.init();
        //pick secret missions
        pickSecretMission(playersArray[i]);
    }
    //start the main timer
    gameTimer.init();
    //start the game loop
    mainLoop = setInterval(alphaLoop,15);
}


//////////////////
// End the game //
//////////////////
function endGame(){
    clearInterval(mainLoop);
}

///////////////////
//timer prototype//
///////////////////
Function.prototype.scope = function(context) {
    var f = this;
    return function() {
        return f.apply(context, arguments);
    };
};

Timer = function() {
    this.tick = 0;
    this.intervalId = null;
    this.period = 1000; // in ms
    this.isPaused = false;
};

jQuery.extend(Timer.prototype, {

    onTick: function() {
        if (!this.isPaused) {
            this.tick++;
        }
    },

    start: function() {
        this.intervalId = setInterval(function() {this.onTick()}.scope(this), this.period);
    },

    pause: function() {
        this.isPaused = !this.isPaused;
    },

    stop: function() {
        clearInterval(this.intervalId);

        var result = this.tick;
        this.tick = 0;
        this.isPaused = false;

        return result;
    }
});

///////////////////////
//sum array prototype//
///////////////////////
Array.prototype.sum = function() {
  return this.reduce(function(a,b){return a+b;});
}

////////////////////////////////////////
//add remove method to array prototype//
////////////////////////////////////////
Array.prototype.remove= function(){
    var what, a= arguments, L= a.length, ax;
    while(L && this.length){
        what= a[--L];
        while((ax= this.indexOf(what))!= -1){
            this.splice(ax, 1);
        }
    }
    return this;
}
