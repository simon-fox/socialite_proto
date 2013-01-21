/////////////////////////*
/// View controller   ///*
/// set up interface  ///*
/// elements as vars  ///*
/// to create/destroy ///*
/////////////////////////*

//store interface elements

//player summary html
var playerSummaryInterfaceHtml ='\
<div class="playerSummary">\
    <div class="topLabel">PLAYER ONE</div>\
    <div class="portraitAndDrives">\
        <div class="summaryPortrait">\
            <div class="statusPosition">1st</div>\
        </div>\
        <div class="driveBarsContainer">\
            <div class="driveBar angerBar"><div>ANGER</div></div>\
            <div class="driveBar confidenceBar"><div>CONFIDENCE</div></div>\
            <div class="driveBar lustBar"><div>LUST</div></div>\
            <div class="driveBar prideBar"><div>PRIDE</div></div>\
            <div class="driveBar envyBar"><div>ENVY</div></div>\
        </div>\
    </div>\
    <div class="messageStripe">YOU WILL LOSE STATUS IN:</div>\
    <div class="timerBar"><div>STATUS: <span class="statusRaw">23</span></div></div>\
</div>\
';

//player summary prototype
function playerSummaryInterface(){
    //load in the html
    this.html = playerSummaryInterfaceHtml;
    //which player
    this.player = playerObject;
    //on initialisation
    this.init = function(){
                    //append this.html to the correct display
                    if ($('.playerSummary').length < 3){
                        $('.playerSummaryContainer').eq(0).append(this.html);
                    }
                    else{
                        $('.playerSummaryContainer').eq(1).append(this.html);
                    }
                    //start the timer
                    this.player.statusTimer = new Timer();
                    this.player.statusTimer.start();
                };
    //every tick
    this.update = function(){
                //update interface elements here
                //update player name
                $('.topLabel').eq(this.player.arrayPos).html(this.player.playerCharacter.name);
                //update status position
                $('.statusPosition').eq(this.player.arrayPos).html(this.player.statusPosition);
                //update drive bars
                $('.angerBar div').eq(this.player.arrayPos).css('width',this.player.agent.anger+"%");
                $('.confidenceBar div').eq(this.player.arrayPos).css('width',this.player.agent.confidence+"%");
                $('.lustBar div').eq(this.player.arrayPos).css('width',this.player.agent.lust+"%");
                $('.prideBar div').eq(this.player.arrayPos).css('width',this.player.agent.pride+"%");
                $('.envyBar div').eq(this.player.arrayPos).css('width',this.player.agent.envy+"%");
                //update status
                $('.statusRaw').eq(this.player.arrayPos).html(this.player.agent.status);
                //update timer bars
                    //how many seconds do we have
                    var grabGambitTimeOut = 5;
                    //if less than that has passed
                    if (this.player.statusTimer.tick<grabGambitTimeOut){
                        //display time left as a progress bar
                        var percent = (grabGambitTimeOut -  this.player.statusTimer.tick)/grabGambitTimeOut * 100;
                        $('.timerBar div').eq(this.player.arrayPos).css('width',percent+"%");
                    }
                    //if time is up
                    else if (this.player.statusTimer.tick == grabGambitTimeOut){
                        //restart timer
                        this.player.statusTimer.stop();
                        this.player.statusTimer.start();
                        //reduce status by 5
                        this.player.agent.status  = this.player.agent.status -5;
                    }
            };
}

//gambit interface html
var gambitInterfaceHtml ='\
<div class="gambit">\
    <div class="gambitText">Calmly insult Mrs Garricks Serving Dish</div>\
    <div class="gambitEffects">\
        <div class="gambitEffectsCol">- status<br/>+ anger</div>\
        <div class="gambitEffectsCol">- confidence<br/>+ lust</div>\
    </div>\
    <div class="claimGambit">\
        TO CLAIM THIS GAMBIT:<br/>\
        <div class="claimButton">P1: <h2>E</h2></div>\
        <div class="claimButton">P2: <h2>T</h2></div>\
        <div class="claimButton">P3: <h2>U</h2></div>\
        <div class="claimButton">P4: <h2>C</h2></div>\
        <div class="claimButton">P5: <h2>B</h2></div>\
        <div class="claimButton">P6: <h2>M</h2></div>\
    </div>\
    <div class="timerBar"><div></div></div>\
</div>\
';

//gambit interface prototype

function gambitInterface(){
    //load in the html
    this.html = gambitInterfaceHtml;
    //which gambit is associated with it
    this.associatedGambit = constructedGambitObject;
    //has this been initialised 
    this.onScreen = false;
    //on initialisation
    this.init = function(){
                    //append this.html to the display
                    //append correct elements to the display
                        //change gambitText
                        //change gambitEffects
                        //change claimButtons
                            //loop through playersArray
                            //build a claimButton for each player
                            //associate and bind a key
                };
    //when switching to target mode
    this.targetMode = function(){
                        //update text in claimGambit to 'WHO WILL YOU SAY THIS TO?'
                        //update claim buttons with target buttons
                            //loop through playersArray
                            //build a target button for each player
                            //associate and bind a key
                        //refresh timer in this.associatedGambit
                        };
    //every tick
    this.update = function(){
                    //update interface elements here
                    //update timer
                    
                    };
}


//choosePC interface initialisation

var playerCharacterSelectInterface = {
    init : function(){
                    //show display
                    $('.charSelectContainer').show();
                    //load in pc portraits
                    for (var i=0; i < $('.portrait').length; i++){
                        //switch portrait bg img
                        $('.portrait').eq(i).css('background-image','url(images/'+playerCharacters[i].portrait+')');
                    }
                    //select first portrait
                    $('.portrait').eq(0).addClass('selectedPC');
                    //run .update
                    playerCharacterSelectInterface.update();
                    //run keybind function
                    playerCharacterSelectKeyBinds();
                },
    update : function(){
                    //check for selectedPC
                    for (var i=0; i < $('.portrait').length; i++){
                        //if we find it
                        if ($('.portrait').eq(i).hasClass('selectedPC') == true){
                            //load info into bio window
                            $('.fullLengthImage').css('background-image','url(images/'+playerCharacters[i].img+')');
                            $('.bioText').html(playerCharacters[i].bio);
                            //loop through traits and append them
                            for (var c=0;c<playerCharacters[i].traits.length;c++){
                                $('.bioText').append('<br/><br/>'+playerCharacters[i].traits[c]);
                            }
                        }
                    }
                    },
    destroy : function(){
                        //hide this interface
                        $('.charSelectContainer').hide();
                        //unbind keys
                    }
}

//main game timer

var gameTimer = {
    html : '<div class="gameTimer">02:59</div>',
    init : function(){
                    //start new timer
                    mainGameTimer = new Timer();
                    mainGameTimer.start();
                    //create the timer html
                    $('.topBar').append(gameTimer.html);
                },
    update : function(){
                    var gameTime = 180;
                    if(mainGameTimer.tick < gameTime){
                        //update the clock html (set for 3 mins)
                        
                        var minutes = Math.floor((mainGameTimer.tick)/60);
                        var seconds = mainGameTimer.tick - minutes *60;
                        //format output
                        var newClock = "0"+(((gameTime/60)-1) - minutes)+":"+(59 - seconds);
                        //print on screen
                        $('.gameTimer').html(newClock);
                    }
                    //check for time out (set for 3 mins)
                    else if (mainGameTimer.tick == gameTime){
                       //stop the timer
                       mainGameTimer.stop();
                       $('.gameTimer').html("00:00");
                       //trigger end game state
                    }
                    },
    destroy : function(){

                    }
}

