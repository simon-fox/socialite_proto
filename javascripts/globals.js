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
//constructed gambits
var constructedGambits = [];
//status leaderboard
var statusLeaderboard = [];
//main game timer
var mainGameTimer;

/////////////////////////////
//function to update scores//
/////////////////////////////
function updateScores(passedConstructedGambit){
    //send modifier effect to claimant
    passedConstructedGambit.claimedBy.agent.status =  passedConstructedGambit.claimedBy.agent.status + passedConstructedGambit.statusEffectM;
    //send gambit effects to target
    passedConstructedGambit.targetCharacter.agent.status =  passedConstructedGambit.claimedBy.agent.status + passedConstructedGambit.statusEffectG;
    //send heat effect to conversation
    conversation.heat = conversation.heat + passedConstructedGambit.heatEffect; 
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
