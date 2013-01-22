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
//response boolean
var response = false;
//keysets for binding
var setOne = {
    keys:["w","r","t","u","i","p"],
    keyCodes:[87,82,84,85,73,80],
    bound: false
}
var setTwo = {
    keys:["s","f","g","j","k","l"],
    keyCodes:[83,70,71,74,75,76],
    bound: false
}
var setThree = {
    keys:["z","x","c","b","n","m"],
    keyCodes:[90,88,67,66,78,77],
    bound: false
}
var keySets = [setOne,setTwo,setThree];
//gambit pieces
var modifiers = [];
var gambits = [];
var targetObjects = [];
//global drive totals
var globalAnger;
var globalConfidence;
var globalLust;
var globalPride;
var globalEnvy;
//sorted modifiers
var angerModifiers = [];
var confidenceModifiers = [];
var lustModifiers = [];
var prideModifiers = [];
var envyModifiers = [];
//sorted gambits
var angerGambits = [];
var confidenceGambits = [];
var lustGambits = [];
var prideGambits = [];
var envyGambits = [];
//constructed gambits
var constructedGambits = [];
//status leaderboard
var statusLeaderboard = [];
//main game timer
var mainGameTimer;


//function to update scores
function updateScores(passedConstructedGambit){
    //console.log(passedConstructedGambit);
    //take effects
    // go through all modifier effects
    // if effect is 0, don't use it
    // otherwise update passedConstructedGambit.claimedBy.agent
    if (passedConstructedGambit.statusEffectM == 0){/*do nothing*/}
    else {
        passedConstructedGambit.claimedBy.agent.status =  passedConstructedGambit.claimedBy.agent.status + passedConstructedGambit.statusEffectM;
    }
    if (passedConstructedGambit.angerEffectM == 0){/*do nothing*/}
    else {
       passedConstructedGambit.claimedBy.agent.anger =  passedConstructedGambit.claimedBy.agent.anger + passedConstructedGambit.angerEffectM;
    }
    if (passedConstructedGambit.confidenceEffectM == 0){/*do nothing*/}
    else {
       passedConstructedGambit.claimedBy.agent.confidence =  passedConstructedGambit.claimedBy.agent.confidence + passedConstructedGambit.confidenceEffectM;
    }
    if (passedConstructedGambit.lustEffectM == 0){/*do nothing*/}
    else {
       passedConstructedGambit.claimedBy.agent.lust =  passedConstructedGambit.claimedBy.agent.lust + passedConstructedGambit.lustEffectM;
    }
    if (passedConstructedGambit.prideEffectM == 0){/*do nothing*/}
    else {
       passedConstructedGambit.claimedBy.agent.pride =  passedConstructedGambit.claimedBy.agent.pride + passedConstructedGambit.prideEffectM;
    }
    if (passedConstructedGambit.envyEffectM == 0){/*do nothing*/}
    else {
       passedConstructedGambit.claimedBy.agent.envy =  passedConstructedGambit.claimedBy.agent.envy + passedConstructedGambit.envyEffectM;
    }
    ////////////////////////////////
    //concat gambit effects string//
    ////////////////////////////////
    if (passedConstructedGambit.statusEffectG == 0){/*do nothing*/}
    else {
      passedConstructedGambit.targetCharacter.agent.status =  passedConstructedGambit.claimedBy.agent.status + passedConstructedGambit.statusEffectG;
    }
    if (passedConstructedGambit.angerEffectG == 0){/*do nothing*/}
    else {
       passedConstructedGambit.targetCharacter.agent.anger =  passedConstructedGambit.claimedBy.agent.anger + passedConstructedGambit.angerEffectG; 
    }
    if (passedConstructedGambit.confidenceEffectG == 0){/*do nothing*/}
    else {
        passedConstructedGambit.targetCharacter.agent.confidence =  passedConstructedGambit.claimedBy.agent.confidence + passedConstructedGambit.confidenceEffectG;
    }
    if (passedConstructedGambit.lustEffectG == 0){/*do nothing*/}
    else {
        passedConstructedGambit.targetCharacter.agent.lust =  passedConstructedGambit.claimedBy.agent.lust + passedConstructedGambit.lustEffectG;
    }
    if (passedConstructedGambit.prideEffectG == 0){/*do nothing*/}
    else {
        passedConstructedGambit.targetCharacter.agent.pride =  passedConstructedGambit.claimedBy.agent.pride + passedConstructedGambit.prideEffectG;
    }
    if (passedConstructedGambit.envyEffectG == 0){/*do nothing*/}
    else {
        passedConstructedGambit.targetCharacter.agent.envy =  passedConstructedGambit.claimedBy.agent.envy + passedConstructedGambit.envyEffectG;
    }
    //deliver to targetCharacter and claimedBy
}

//timer prototype
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

//sum array prototype
Array.prototype.sum = function() {
  return this.reduce(function(a,b){return a+b;});
}

//add remove method to array prototype
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
