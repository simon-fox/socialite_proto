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
            <div class="driveBar heatBar"><div>HEAT</div></div>\
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
                ///////////////////////////////////////////
                //append this.html to the correct display//
                ///////////////////////////////////////////
                if ($('.playerSummary').length < 3){
                    $('.playerSummaryContainer').eq(0).append(this.html);
                }
                else{
                    $('.playerSummaryContainer').eq(1).append(this.html);
                }
                /////////////////
                //load portrait//
                /////////////////
                $('.summaryPortrait').eq(this.player.arrayPos).css('background-image','url(images/'+this.player.playerCharacter.portrait+')');
                ///////////////////
                //start the timer//
                ///////////////////
                this.player.statusTimer = new Timer();
                this.player.statusTimer.start();
            };
    this.update = function(){
                /////////////////////
                // update the html //
                /////////////////////
                //update player name
                $('.topLabel').eq(this.player.arrayPos).html(this.player.playerCharacter.name);
                //update status position
                $('.statusPosition').eq(this.player.arrayPos).html(this.player.statusPosition);
                //update drive bars
                $('.heatBar div').eq(this.player.arrayPos).css('width',conversation.heat+"%");
                //update status
                $('.statusPosition').eq(this.player.arrayPos).html(this.player.statusPosition);
                $('.statusRaw').eq(this.player.arrayPos).html(this.player.agent.status);
                
                /////////////////////
                //update timer bars//
                /////////////////////
                //how many seconds do we have
                var grabGambitTimeOut = 15;
                //if less than that has passed
                //console.log(this.player.statusTimer.tick);
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
        <div class="gambitEffectsCol">You get:<br/><div class="modifiersCol"></div></div>\
        <div class="gambitEffectsCol">They get:<br/><div class="gambitsCol"></div></div>\
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
    <div class="timerBarGambit"><div></div></div>\
</div>\
';

//gambit interface prototype

function gambitInterface(constructedGambitObject){
    //load in the html
    this.html = gambitInterfaceHtml;
    //which gambit is associated with it
    this.associatedGambit = constructedGambitObject;
    //has this been initialised 
    this.onScreen = false;
    //on initialisation
    this.init = function(){
                    ///////////////////////////////////
                    //append this.html to the display//
                    ///////////////////////////////////
                    $('.gambitContainer').append(this.html);
                    var constructedGambitInterfaceHtml = $('.gambit').eq($('.gambit').length-1);
                    //add identifying class to .data
                    $(constructedGambitInterfaceHtml).data('associatedGambit',this.associatedGambit);
                    
                    //////////////////////////////////////////
                    //append correct elements to the display//
                    //////////////////////////////////////////
                    //concat actual text of assembledGambit: modifier, gambits, targetCharacter, targetObject
                    console.log('response in viewController:'+this.associatedGambit.responseBoolean);
                    if (this.associatedGambit.responseBoolean == true){
                        console.log('response!');
                        var constructedGambitText = "Respond "+this.associatedGambit.gambit.text+" to "+this.associatedGambit.responseBy+"'s comment";
                    }
                    else{
                        var constructedGambitText = this.associatedGambit.modifier.text + " " + this.associatedGambit.gambit.text + " to " + this.associatedGambit.targetCharacter.playerCharacter.name;// + "'s " + this.associatedGambit.targetObject.text;
                    }
                    
                    //concat modifier effects string//
                    var modifierEffectsString ="";
                    if (this.associatedGambit.statusEffectM == 0){/*do nothing*/}
                    else {
                        //add to string
                        modifierEffectsString = modifierEffectsString + this.associatedGambit.statusEffectM+" status</br>";
                    }
                    
                    //concat gambit effects string//
                    var gambitEffectsString = "";
                    if (this.associatedGambit.statusEffectG == 0){/*do nothing*/}
                    else {
                        //add to string
                        gambitEffectsString = gambitEffectsString + this.associatedGambit.statusEffectG+" status</br>";
                    }
                    
                    //get heatEffect
                    var modifierEffectsString = modifierEffectsString+"<br/> Everyone Gets:<br/>"+this.associatedGambit.heatEffect+" heat";
                
                    ////////////////////
                    //initialise timer//
                    ////////////////////
                    this.associatedGambit.gambitTimer.start();
                    
                    /////////////
                    //bind keys//
                    /////////////
                    var passGambitInterface = this;
                    var passGambit = this.associatedGambit;
                    bindGambitKeys(passGambit,passGambitInterface);
                    
                    ///////////////////////
                    //build claim buttons//
                    ///////////////////////
                    var claimKeysString = "TO CLAIM THIS GAMBIT:<br/>";
                    for (var i=0;i<playersArray.length;i++){
                        if(playersArray[i] == this.associatedGambit.targetCharacter){
                            claimKeysString = claimKeysString + '<div class="claimButton">P'+(i+1)+': <h2> _ </h2></div>';
                        }
                        else{
                            claimKeysString = claimKeysString + '<div class="claimButton">P'+(i+1)+': <h2>'+this.associatedGambit.boundKeys.keys[i]+'</h2></div>';
                        }
                    }
                    
                     ///////////////////
                    //print to screen//
                    ///////////////////
                    $(constructedGambitInterfaceHtml).children('.gambitText').html(constructedGambitText);
                    $(constructedGambitInterfaceHtml).children('.gambitEffects').children('.gambitEffectsCol').children('.modifiersCol').html(modifierEffectsString);
                    $(constructedGambitInterfaceHtml).children('.gambitEffects').children('.gambitEffectsCol').children('.gambitsCol').html(gambitEffectsString);
                    $(constructedGambitInterfaceHtml).children('.claimGambit').html(claimKeysString);
                    
                    //switch .onScreen to true
                    this.onScreen = true;  
                    
                };
    //when switching to claimed
    this.claimed = function(){
                    //////////////////////////////
                    // get the right dom element//
                    //////////////////////////////
                    var claimedGambitDOM;
                    for (var i=0;i<$('.gambit').length;i++){
                        if ($('.gambit').eq(i).data().associatedGambit == this.associatedGambit){
                            claimedGambitDOM = $('.gambit').eq(i);
                        }
                    }
                    
                    //////////////////////////////
                    // update the html and timer//
                    //////////////////////////////
                    //change color of div
                    $(claimedGambitDOM).css('background-color','rgb(66, 31, 31)');
                    //print out the claimant
                    $(claimedGambitDOM).children('.claimGambit').html("Claimed by: "+this.associatedGambit.claimedBy.playerCharacter.name );
                    //load claimant into claimants array
                    claimants.push(this.associatedGambit.claimedBy);
                    //stop timer and destroy interface after x seconds
                    this.associatedGambit.gambitTimer.stop();
                    
                    ////////////////////////////////////
                    // destroy timer and update scores//
                    ////////////////////////////////////
                    var tempThis = this;
                    setTimeout(function(){
                        tempThis.destroy();
                        //update scores?
                        updateScores(tempThis.associatedGambit);
                    },8000);
                        
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
    //when claimed and scored                
    this.destroy = function(){
                    //////////////////////////////
                    // get the right dom element//
                    //////////////////////////////
                    var claimedGambitDOM;
                    for (var i=0;i<$('.gambit').length;i++){
                        if ($('.gambit').eq(i).data().associatedGambit == this.associatedGambit){
                            claimedGambitDOM = $('.gambit').eq(i);
                        }
                    }
    
                    ///////////////
                    //unbind keys//
                    ///////////////
                    this.associatedGambit.boundKeys.bound = false;

                    /////////////////////////////////////
                    //clear from activeGambitInterfaces//
                    /////////////////////////////////////
                    for (var i=0;i<activeGambitInterfaces.length;i++){
                        if (activeGambitInterfaces[i] == this){
                            activeGambitInterfaces.splice(i,1);
                        }
                    }
                    
                    /////////////////////////////////
                    //clear from constructedGambits//
                    /////////////////////////////////
                    for (var i=0;i<constructedGambits.length;i++){
                        if (constructedGambits[i] == this.associatedGambit){
                            constructedGambits.splice(i,1);
                        }
                    }
                    
                    /////////////////////
                    //clear from screen//
                    /////////////////////
                    $(claimedGambitDOM).remove();
                        
                };
    //every tick
    this.update = function(){
                    //////////////////////////////
                    // get the right dom element//
                    //////////////////////////////
                    var claimedGambitDOM;
                    for (var i=0;i<$('.gambit').length;i++){
                        if ($('.gambit').eq(i).data().associatedGambit == this.associatedGambit){
                            claimedGambitDOM = $('.gambit').eq(i);
                        }
                    }
                    
                    /////////////////////
                    //update timer bars//
                    /////////////////////
                    //how many seconds do we have
                    var constructedGambitTimeOut = 15;
                    //if less than that has passed
                    if (this.associatedGambit.gambitTimer.tick < constructedGambitTimeOut){
                        //display time left as a progress bar
                        var percent = (constructedGambitTimeOut -  this.associatedGambit.gambitTimer.tick)/constructedGambitTimeOut * 100;
                        $(claimedGambitDOM).children('.timerBarGambit').children('div').css('width',percent+"%");
                    }
                    //if time is up
                    else if (this.associatedGambit.gambitTimer.tick == constructedGambitTimeOut){
                       //destroy the gambit
                       this.destroy();
                    }
                        
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
                       
                       //////////////////////////
                       //trigger end game state//
                       //////////////////////////
                       clearInterval(mainLoop);
                       
                       
                    }
                    },
    destroy : function(){

                    }
}

