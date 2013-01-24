/////////////////////////*
///   Director func   ///*
/////////////////////////*

//This function to be run every cycle
function director() {
//We'll use this to:
    ////////////////////////////////////////
    //check the global timer and update it//
    ////////////////////////////////////////
    gameTimer.update();
    
    /////////////////////
    //clear leaderboard//
    /////////////////////
    statusLeaderboard = [];
    
    ///////////////////////
    //update conversation//
    ///////////////////////
    conversation.update();
    
    ////////////////////////////
    //loop through all players//
    ////////////////////////////
    for (var i=0;i<playersArray.length;i++){
        //call .update on every activePlayer
        playersArray[i].update();
        //call .update on every playerSummaryInterface
        playersArray[i].interface.update();
        //take status and push it into array for leaderboard
        var statusLeaderboardItem = {
            value: playersArray[i].agent.status,
            player: playersArray[i]
        }
        statusLeaderboard.push(statusLeaderboardItem);
        
    }
    
    //////////////////
    //sort the board//
    //////////////////
    statusLeaderboard = statusLeaderboard.sort(function(a, b) {
        return a.value - b.value;
    });
    
    //////////////////////////////////////////////////////////
    //loop through leaderboard and send data to playerObject//
    //////////////////////////////////////////////////////////
    for (var i=0;i<statusLeaderboard.length;i++){
        var rawPosition = statusLeaderboard.length - i;
        if(rawPosition == 1){
            playersArray[statusLeaderboard[i].player.arrayPos].statusPosition = "1st";
        }
        if(rawPosition == 2){
            playersArray[statusLeaderboard[i].player.arrayPos].statusPosition = "2nd";
        }
        if(rawPosition == 3){
            playersArray[statusLeaderboard[i].player.arrayPos].statusPosition = "3rd";
        }
        if(rawPosition > 3){
            playersArray[statusLeaderboard[i].player.arrayPos].statusPosition = rawPosition+"th";
        }
    }
    
    ////////////////////////////
    //run the gambit assembler//
    ////////////////////////////
    //declare variables for building the gambit
    var chosenModifier;
    var chosenGambit;
    var chosenTargetObject;
    var chosenTargetCharacter; //fill this up with empty string once we do targeting
    var modifierStatusEffect;
    var gambitStatusEffect;
    var heatEffectSum;
    var claimer;
    var response;
    var responseName;
    var constructedGambitObject
    //check number of gambits on screen
    //if plenty
    if(activeGambitInterfaces.length >= 2){
        //do nothing
    }
    else{
    /////////////////////////
    // lets build a gambit //
    /////////////////////////
        //Lets check if it's a response
        //console.log('claimants length: '+claimants.length);
        if (claimants.length){
            //we have something to respond to
            responseName = claimants[0].playerCharacter.name;
            response = true;
            //console.log('response in director: '+response)
            //autoTargeting - responses effectively target the previous claimant
            chosenTargetCharacter = claimants[0];
            //lazy hack to clear out claimants so only one response at a time :(
            claimants = [];
        }
        else if (claimants.length == 0){
            //nothing to respond to, not response specific stuff here
            response = false;
            responseName = "";
            //console.log('response in director: '+response)
            //autoTargeting - pick a random target character
            chosenTargetCharacter = "";
            
        }
        //build a normal gambit 
        //pick a random modifier from chosenDrive array
        chosenModifier = modifiers[Math.floor(Math.random() * modifiers.length)];
        //pick a random gambit from chosenDrive array
        chosenGambit = gambits[Math.floor(Math.random() * gambits.length)];
        //pick a random targetObject
        chosenTargetObject = targetObjects[Math.floor(Math.random() * targetObjects.length)];
        //modifier status effects
        modifierStatusEffect = chosenModifier.statusEffect;
        //gambit status effects
        gambitStatusEffect = chosenGambit.statusEffect;
        //conversational heat effect
        heatEffectSum = chosenModifier.heatEffect + chosenGambit.heatEffect;
        //no claimant yet
        claimer = "";
        
        //create constructedGambit
        constructedGambitObject = new constructedGambit(chosenModifier,chosenGambit,chosenTargetObject,chosenTargetCharacter,modifierStatusEffect,gambitStatusEffect,heatEffectSum,claimer,response,responseName);
        //append to constructedGambits array
        constructedGambits.push(constructedGambitObject);
        //console.log(constructedGambits);
        //initialise a new interface with this gambit
        //console.log(constructedGambits.length-1);
        activeGambitInterfaces.push(new gambitInterface(constructedGambitObject));
        
    }
            
    ////////////////////////////          
    //build and update gambits//
    ////////////////////////////
    
    //cycle through constructed gambit interfaces array
    for (var i = 0; i<activeGambitInterfaces.length ; i++){
        //if gambit has not been initialised yet
        if (activeGambitInterfaces[i].onScreen == false){
            //initialise
            activeGambitInterfaces[i].init();
        }
        else {
            //it is on screen
            //call .update on every gambitInterface
            activeGambitInterfaces[i].update();
        }
        
    }
        
}










