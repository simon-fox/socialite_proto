//////////////////////
// gambit interface //
//////////////////////

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
                    $(claimedGambitDOM).children('.claimGambit').html('<div class ="sayCommand">SAY THIS TO '+this.associatedGambit.targetCharacter.playerCharacter.name + ' NOW!</div>');
                    
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
                        
                        //update scores?
                        updateScores(tempThis.associatedGambit);
                        //console.log(tempThis.associatedGambit.targetCharacter);
                        //console.log(tempThis.associatedGambit.claimedBy);
                        
                        //clear from player
                        tempThis.associatedGambit.claimedBy.agent.currentGambit = "";
                        
                    
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