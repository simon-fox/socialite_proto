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
    <div class="timerBar"><div>STATUS: 23</div></div>\
</div>\
';

//player summary prototype
function playerSummaryInterface(){
    //load in the html
    this.html = playerSummaryInterfaceHtml;
    //which player is associated with this
    this.player = playerObject;
    //on initialisation
    this.init = function(){
                    //append this.html to the display
                };
    //every tick
    this.update = function(){
                    //update interface elements here
                    //update player name
                    //update status position
                    //update drive bars
                    //update status
                    //update timer bars
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

