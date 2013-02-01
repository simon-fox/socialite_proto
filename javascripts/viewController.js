/////////////////////////*
/// View controller   ///*
/// set up interface  ///*
/// elements as vars  ///*
/// to create/destroy ///*
/////////////////////////*

//store interface elements

///////////////////////
//player summary html//
///////////////////////
var playerSummaryInterfaceHtml ='\
<div class="playerSummary">\
    <div class="topLabel">PLAYER ONE</div>\
    <div class="portraitAndDrives">\
        <div class="summaryPortrait">\
            <div class="statusPosition">1st</div>\
        </div>\
        <div class="driveBarsContainer">\
            <div class="driveBar heatBar"><div>OUTRAGE</div></div>\
            <div class="driveBar statusBar"><div>STATUS</div></div>\
        </div>\
    </div>\
</div>\
';

//player summary prototype
function playerSummaryInterface(playerObject){
    //load in the html
    this.html = playerSummaryInterfaceHtml;
    //which player
    this.player = playerObject;
    //on initialisation
    this.init = function(){
        ///////////////////////////////////////////
        //append this.html to the correct display//
        ///////////////////////////////////////////
        //init a variable so that the .eq is the number in the players array -1
        $('.playerSummaryContainer').eq(this.player.arrayPos).append(this.html);
        
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
        $('.heatBar div').eq(this.player.arrayPos).css('width',(this.player.agent.outrage)+"%");
        $('.statusBar div').eq(this.player.arrayPos).css('width',0+"%");
        /////////////////////
        //update timer bars//
        /////////////////////
        //how many seconds do we have
        var grabGambitTimeOut = 1;
        //if less than that has passed
        //console.log(this.player.statusTimer.tick);
        if (this.player.statusTimer.tick<grabGambitTimeOut){
           //do nothing to no-one
        }
        //if time is up
        else if (this.player.statusTimer.tick == grabGambitTimeOut){
            //restart timer
            this.player.statusTimer.stop();
            this.player.statusTimer.start();
            //reduce status by 1
            this.player.agent.status  = this.player.agent.status -1;
            this.player.agent.outrage = this.player.agent.outrage -1;
        }
    };
    this.outraged = function() {
        /////////////////////
        // update the html //
        /////////////////////
        // player has been bumped from convo
        //update player name
        $('.topLabel').eq(this.player.arrayPos).html("OUTRAGED");
        //update status position
        $('.statusPosition').eq(this.player.arrayPos).html("XX");
        //update drive bars
        $('.heatBar div').eq(this.player.arrayPos).css('width',"100%");
        $('.statusBar div').eq(this.player.arrayPos).css('width',0+"%");
        
        /////////////////////
        //update timer bars//
        /////////////////////
        //how many seconds do we have
        var grabGambitTimeOut = 1;
        //if less than that has passed
        //console.log(this.player.statusTimer.tick);
        if (this.player.statusTimer.tick<grabGambitTimeOut){
           //do nothing to no-one
        }
        //if time is up
        else if (this.player.statusTimer.tick == grabGambitTimeOut){
            //restart timer
            this.player.statusTimer.stop();
            this.player.statusTimer.start();
            //reduce status by 1
            this.player.agent.status  = this.player.agent.status -1;
            this.player.agent.outrage = this.player.agent.outrage -1;
        }
    };
}


/////////////////////////////////
//social scoring interface html//
/////////////////////////////////
var socialScoringInterfaceHTML ='\
<div class="socialScoring">\
    <div class="gambitText">Did player X gambit?</div>\
    <div class="claimGambit"></div>\
</div>\
';
function socialScoringInterface(){
    this.html = socialScoringInterfaceHTML;
    this.boundKeys = "";
    this.init = function(lastTurn,lastGambit,nextTurn){
        console.log('socialScoringInterface.init');
        /////////////////////////////////
        //apend html to correct channel//
        /////////////////////////////////
        $('.playerSummaryContainer').eq(nextTurn).append(this.html);
        /////////////
        //bind keys//
        /////////////
        var passScoringInterface = this;
        var passGambit = lastGambit;
        bindScoringKeys(passGambit,passScoringInterface);
        ////////////////////////
        //build claim buttons //
        ////////////////////////
        var claimKeysString = "";
        //Yes
        claimKeysString = claimKeysString + '<div class="claimButton">YES<h2>'+this.boundKeys.keys[0]+'</h2></div>';
        //No
        claimKeysString = claimKeysString + '<div class="claimButton">NO<h2>'+this.boundKeys.keys[2]+'</h2></div>';
        //////////////////////////////////////////
        //append correct elements to the display//
        //////////////////////////////////////////
        $('.playerSummaryContainer').eq(nextTurn).children('.socialScoring').children('.gambitText').html('did '+playersArray[lastTurn].playerCharacter.name+' '+lastGambit.modifier.text + " " + lastGambit.gambit.text+"?");
        $('.playerSummaryContainer').eq(nextTurn).children('.socialScoring').children('.claimGambit').html(claimKeysString);
    };
    this.update = function(){
        
    };
    this.destroy = function(){
        console.log('socialScoringInterface.destroy');
        //unbind keys
        keySets[conversation.turn].bound = false;
        //remove from dom
        $('.playerSummaryContainer').eq(conversation.turn).children('.socialScoring').remove();
        //remove from array
        socialScoringInterfaces.splice(0,1);
        //init the gambit interface (look in makeGambit)
        makeGambit(playersArray[conversation.turn]); 
    };
}


/////////////////////////
//gambit interface html//
/////////////////////////
var gambitInterfaceHtml ='\
<div class="gambit">\
    <div class="gambitText">Calmly insult Mrs Garricks Serving Dish</div>\
    <div class="gambitEffects">\
    </div>\
    <div class="claimGambit">\
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
        
        
        
        if(  !$('.playerSummaryContainer').eq(this.associatedGambit.claimedBy.arrayPos).children('.gambit').length ){
            ///////////////////////////////////
            //append this.html to the display//
            ///////////////////////////////////
            $('.playerSummaryContainer').eq(this.associatedGambit.claimedBy.arrayPos).append(this.html);
            var constructedGambitInterfaceHtml = $('.playerSummaryContainer').eq(this.associatedGambit.claimedBy.arrayPos).children('.gambit');
            //add identifying class to .data
            $(constructedGambitInterfaceHtml).data('associatedGambit',this.associatedGambit);
            
            /////////////
            //bind keys//
            /////////////
            var passGambitInterface = this;
            var passGambit = this.associatedGambit;
            bindClaimKeys(passGambit,passGambitInterface);
            
            //////////////////////////////////////////
            //append correct elements to the display//
            //////////////////////////////////////////
            //concat actual text of assembledGambit: modifier, gambits, targetCharacter, targetObject
            //console.log('response in viewController:'+this.associatedGambit.responseBoolean);
            if (this.associatedGambit.responseBoolean == true){
                console.log('response!');
                var constructedGambitText = "Respond "+this.associatedGambit.gambit.text+" to "+this.associatedGambit.responseBy+"'s comment"; 
            }
            else{
                var constructedGambitText = this.associatedGambit.modifier.text + " " + this.associatedGambit.gambit.text;
            }
            
            
            ////////////////////////
            //build claim buttons //
            ////////////////////////
            var claimKeysString = "";
            //Claim
            claimKeysString = claimKeysString + '<div class="claimButton">OK!<h2>'+this.associatedGambit.boundKeys.keys[0]+'</h2></div>';
            //Pass
            claimKeysString = claimKeysString + '<div class="claimButton">PASS<h2>'+this.associatedGambit.boundKeys.keys[2]+'</h2></div>';
        
            //concat modifier effects string//
            var modifierEffectsString ="";
            if (this.associatedGambit.statusEffectM == 0){/*do nothing*/}
            else {
                //add to string
                modifierEffectsString = this.associatedGambit.statusEffectM+" status</br>";
            }
            
            //concat gambit effects string//
            var gambitEffectsString = "";
            if (this.associatedGambit.statusEffectG == 0){/*do nothing*/}
            else {
                //add to string
                gambitEffectsString = "<br/>"+this.associatedGambit.statusEffectG+" status</br>";
            }
            
            //get heatEffect
            var heatEffectsString = "<br/>"+this.associatedGambit.heatEffect+" Outrage";
        
            ////////////////////
            //initialise timer//
            ////////////////////
            this.associatedGambit.gambitTimer.start();
            
            ///////////////////
            //print to screen//
            ///////////////////
            $(constructedGambitInterfaceHtml).children('.gambitText').html(constructedGambitText);
            $(constructedGambitInterfaceHtml).children('.gambitEffects').append(modifierEffectsString);
            $(constructedGambitInterfaceHtml).children('.gambitEffects').append(gambitEffectsString);
            $(constructedGambitInterfaceHtml).children('.gambitEffects').append(heatEffectsString);
            $(constructedGambitInterfaceHtml).children('.claimGambit').html(claimKeysString);
            
            //switch .onScreen to true
            this.onScreen = true;  
        }
        
        
    };
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
                    
                    ////////////////////////////////////
                    //search for duplicates to destroy//
                    ////////////////////////////////////
                    var tempText = $(claimedGambitDOM).children('.gambitText').text();
                    for (var i=0;i<$('.gambit').length;i++){
                        if ($('.gambit').eq(i).children('.gambitText').text() == tempText && $('.gambit').eq(i).data().associatedGambit != $(claimedGambitDOM).data().associatedGambit){
                            $('.gambit').eq(i).children('.gambitText').text('TAKEN');
                             $('.gambit').eq(i).children('.claimGambit').children('.claimButton').text('NO');
                            $('.gambit').eq(i).data().associatedGambit.gambitTimer.tick = 12;
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
                    
                    //clear keybinds
                    for (var i=0;i<keySets.length;i++){
                        if (keySets[i] == this.associatedGambit.boundKeys) {
                            keySets[i].bound = false;
                            this.associatedGambit.boundKeys = [];
                        }
                    }
                    
                    //if there is no target
                    if(this.associatedGambit.targetCharacter == ""){
                        //go to target mode
                        this.targetMode();
                    }
                    else{
                        console.log('gambitInterface.destroy is being called from .claimed')
                        //go to destroy
                        this.destroy();
                    }
                    
                    
    };
    //when switching to target mode                   
    this.targetMode = function(){
                    //////////////////////////////
                    // get the right dom element//
                    //////////////////////////////
                    var claimedGambitDOM;
                    for (var i=0;i<$('.gambit').length;i++){
                        if ($('.gambit').eq(i).data().associatedGambit == this.associatedGambit){
                            claimedGambitDOM = $('.gambit').eq(i);
                        }
                    }
                    
                    /////////////////
                    //refresh timer//
                    /////////////////
                    this.associatedGambit.gambitTimer.stop();
                    this.associatedGambit.gambitTimer.start();
                    
                    /////////////
                    //bind keys//
                    /////////////
                   
                    var passGambitInterface = this;
                    var passGambit = this.associatedGambit;
                    bindTargetKeys(passGambit,passGambitInterface);
                    
                    ////////////////////////
                    //build target buttons//
                    ////////////////////////
                    var claimKeysString = "TO WHO?<br/>";
                    for (var i=0;i<playersArray.length;i++){
                        if(playersArray[i] == this.associatedGambit.claimedBy ){
                            //dont print anything
                        }
                        else{
                            claimKeysString = claimKeysString + '<div class="targetButton" style= "background-image:url(images/'+playersArray[i].playerCharacter.portrait+');"><h2>'+this.associatedGambit.boundKeys.keys[i]+'</h2></div>';
                        }
                    }
                    //print to screen
                    $(claimedGambitDOM).children('.claimGambit').html(claimKeysString);
    };
    this.speakNow = function(){
        //in here everything relating to
        //displaying chosen gambit & target and
        //commanding player to SPEAK
    };
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
                       this.destroyTimeOut();
                    }
                        
    };                
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
                    
                    //stop timer and destroy interface after x seconds
                    this.associatedGambit.gambitTimer.stop();
                    
                    //show who has been targeted
                    $(claimedGambitDOM).children('.claimGambit').html('You will say this to '+this.associatedGambit.targetCharacter.playerCharacter.name);
                    
                    //wait to destroy
                    var tempThis = this;
                    setTimeout(function(){
                        //////////////////////////////
                        // get the right dom element//
                        //////////////////////////////
                        var claimedGambitDOM;
                        for (var i=0;i<$('.gambit').length;i++){
                            if ($('.gambit').eq(i).data().associatedGambit == tempThis.associatedGambit){
                                claimedGambitDOM = $('.gambit').eq(i);
                            }
                        }

                        ///////////////
                        //unbind keys//
                        ///////////////
                        tempThis.associatedGambit.boundKeys.bound = false;
    
                        /////////////////////////////////////
                        //clear from activeGambitInterfaces//
                        /////////////////////////////////////
                        for (var i=0;i<activeGambitInterfaces.length;i++){
                            if (activeGambitInterfaces[i] == tempThis){
                                activeGambitInterfaces.splice(i,1);
                            }
                        }
                        
                        /////////////////////////////////
                        //clear from constructedGambits//
                        /////////////////////////////////
                        for (var i=0;i<constructedGambits.length;i++){
                            if (constructedGambits[i] == tempThis.associatedGambit){
                                constructedGambits.splice(i,1);
                            }
                        }
                        
                        /////////////////////
                        //clear from screen//
                        /////////////////////
                        $(claimedGambitDOM).remove();
                        
                        
                        //console.log(tempThis.associatedGambit.targetCharacter);
                        //console.log(tempThis.associatedGambit.claimedBy);
                        
                        //clear from player
                        tempThis.associatedGambit.claimedBy.agent.currentGambit = "";
                        
                        //store previous gambit
                        previousGambit = tempThis.associatedGambit;
                        //store previous turn
                        previousTurn = conversation.turn;
              
                        console.log('about to build social scoring');
                        //it's not the first turn, init a socialscore
                        //we need to know who's turn it just was
                        var lastTurn = previousTurn;
                        //next turn
                        var nextTurn = tempThis.associatedGambit.targetCharacter.arrayPos;
                        //and what their gambit was
                        var lastGambit = previousGambit;
                        //only do this once
                        if (socialScoringInterfaces.length<1){
                            socialScoringInterfaces.push(new socialScoringInterface());
                            socialScoringInterfaces[socialScoringInterfaces.length-1].init(lastTurn,lastGambit,nextTurn);
                        }
                          
                     
                        
                        //move turn forward
                        conversation.moveTurnForward(tempThis.associatedGambit.targetCharacter);
                        
                       
                    
                    },6000);

    };
    this.destroyTimeOut = function(){
                    //////////////////////////////
                    // get the right dom element//
                    //////////////////////////////
                    var claimedGambitDOM;
                    for (var i=0;i<$('.gambit').length;i++){
                        if ($('.gambit').eq(i).data().associatedGambit == this.associatedGambit){
                            claimedGambitDOM = $('.gambit').eq(i);
                        }
                    }
      
                    //stop timer and destroy interface after x seconds
                    this.associatedGambit.gambitTimer.stop();
                    


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
                    
                    //clear from player
                    this.associatedGambit.claimedBy.agent.currentGambit = "";
                        
                    /////////////////////
                    //clear from screen//
                    /////////////////////
                    $(claimedGambitDOM).remove(); 
    

    };
}

/////////////////////////////////////
//choosePC interface initialisation//
/////////////////////////////////////
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

///////////////
//gossip page//
///////////////
var gossipPageHTML = '\
<div class="gossipContainer">\
    <div class="partyDescripton"><h1>YOU ARE ATTENDING A GALA <br/>HOSTED BY LORD SUCH<br/> IN HONOR OF THE GRADUATION OF HIS SWANS <br/>FROM FINISHING SCHOOL<br/><br/>EVERYONE IS TALKING ABOUT:</h1></div>\
    <div class="gossipWindowContainer">\
        <div class="gossipWindow">Mr Gatsbys new Silk Jacket</div>\
        <div class="gossipWindow">The shocking behaviour of Lord Pomps nephew</div>\
        <div class="gossipWindow">The possible romance between Charlotte Bronte and Mr Garrick</div>\
    </div>\
    <div class="instructions">\
        PRESS SPACE TO START GAME\
    </div>\
</div>\
';

var gossipPage ={
    html : gossipPageHTML,
    init: function(){
        //show container
        $('.gossipContainer').show();
        //bind a key
        $(document).on('keyup.spaceToLaunch',function(e){
        //check for space key
            if(e.which == 32){
               gossipPage.destroy();
               $(document).off('keyup.spaceToLaunch');
            }
        });
    },
    update: function(){
        
    },
    destroy: function(){
        //hide this
        $('.gossipContainer').hide();
        //show main game interface
        $('.mainGameContainer').show();
        //start the main timer
        gameTimer.init();
        //start the game loop
        mainLoop = setInterval(alphaLoop,15);
        //make the first gambit
        makeGambit(playersArray[0]); 
    }
}


/////////////////////////////
//introduce yourselves page//
/////////////////////////////
var introduceYourselfHTML = "";

var introduceYourselfPage = {
    html : introduceYourselfHTML,
    init : function(){
        
    },
    update : function(){
        
    },
    destroy : function(){
        
    }
    
}



///////////////////
//main game timer//
///////////////////
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
                       endGame();
                       
                       
                    }
                    },
    destroy : function(){

                    }
}

