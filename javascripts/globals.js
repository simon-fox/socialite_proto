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
//player character global array
var playerCharacters = [];
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
