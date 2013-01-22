/////////////////////////*
///   Director func   ///*
/////////////////////////*

//This function to be run every cycle
function director() {
//We'll use this to:
    //check the global timer and update it
    gameTimer.update();
    
    //clear leaderboard
    statusLeaderboard = [];
    
    //clear global temperatures
    var sortedGlobalTemp = [];
    globalAnger = {drive:"anger",value:0};
    globalConfidence = {drive:"confidence",value:0};
    globalLust = {drive:"lust",value:0};
    globalPride = {drive:"pride",value:0};
    globalEnvy = {drive:"envy",value:0};
    
    //loop through all players
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
        
        //take the temperature of the convo
        //anger
        globalAnger = {
            drive : "anger",
            value: globalAnger.value + playersArray[i].agent.anger
        }
        //confidence
        globalConfidence = {
            drive : "confidence",
            value: globalConfidence.value + playersArray[i].agent.confidence
        }
        //lust
        globalLust = {
            drive : "lust",
            value: globalLust.value + playersArray[i].agent.lust 
        }
        //pride
        globalPride = {
            drive : "pride",
            value : globalPride.value + playersArray[i].agent.pride
        }
        //envy
        globalEnvy = {
            drive : "envy",
            value : globalEnvy.value + playersArray[i].agent.envy
        }
    }
    
    //order values
    sortedGlobalTemp = [globalAnger,globalConfidence,globalLust,globalPride,globalEnvy];
    //create temp. list of global drive values lowest->highest
    sortedGlobalTemp = sortedGlobalTemp.sort(function(a,b){return a.value-b.value});
    //console.log(sortedGlobalTemp);
    
    ////////////////////////////////////////////////
    //      Make weighted random drive choice     //
    ////////////////////////////////////////////////
    //variable to hold the chosen drive
    var chosenDrive;
    //create an array to hold the probabilities
    var driveProbabilities = [];
    //roll a random number
    var randNum = Math.random();
    //create a total for probabilities
    var total = globalAnger.value + globalConfidence.value + globalLust.value + globalPride.value + globalEnvy.value;
    //console.log(total);
    //build an array of probabilities
    for (var c=0;c<sortedGlobalTemp.length;c++){
            driveProbabilities.push(sortedGlobalTemp[c].value/total);
    }
    //sort the probabilities by numerical ascendancy
    driveProbabilities.sort(function(a,b){return a-b});
    //console.log(driveProbabilities);
    //create a runnning sum and compare the randNum, then exit when randNum<sum
    var runningSum = 0;
    var exitValue;
    for(var c=0;c<driveProbabilities.length;c++){
            runningSum = runningSum + driveProbabilities[c];
            if (randNum<runningSum){
                    exitValue = driveProbabilities[c];
                    break;
            }
    }
    //find which drive the exitValue corresponds to
    //console.log(exitValue);
    //console.log(exitValue * total);
    //console.log(Math.ceil(exitValue * total));
    for (var c=0;c<sortedGlobalTemp.length;c++){
          if (sortedGlobalTemp[c].value == (Math.ceil(exitValue * total))){
            chosenDrive = sortedGlobalTemp[c].drive;
            //console.log(chosenDrive);
          }
    }
    ////////////////////////////////////////////////
    ////////////////////////////////////////////////
    
    //sort the board
    statusLeaderboard = statusLeaderboard.sort(function(a, b) {
        return a.value - b.value;
    });
    
    //loop through leaderboard and send data to playerObject
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
    //check number of gambits on screen
    //if plenty
    if(activeGambitInterfaces.length >= 2){
        //do nothing
    }
    else{
        //pick a random modifier from chosenDrive array
        chosenModifier = eval(chosenDrive+"Modifiers")[Math.floor(Math.random() * eval(chosenDrive+"Modifiers").length)];
        //console.log(chosenModifier);
        //pick a random gambit from chosenDrive array
        chosenGambit = eval(chosenDrive+"Gambits")[Math.floor(Math.random() * eval(chosenDrive+"Gambits").length)];
        //pick a random targetObject
        chosenTargetObject = targetObjects[Math.floor(Math.random() * targetObjects.length)];
        //autoTargeting - pick a random target character
        chosenTargetCharacter = playersArray[Math.floor(Math.random() * playersArray.length)];
        //modifier status & drive effects
        modifierStatusEffect = chosenModifier.statusEffect;
        modifierAngerEffect = chosenModifier.angerEffect;
        modifierConfidenceEffect = chosenModifier.confidenceEffect;
        modifierLustEffect = chosenModifier.lustEffect;
        modifierPrideEffect = chosenModifier.prideEffect;
        modifierEnvyEffect = chosenModifier.envyEffect;
        //gambit status & drive effects
        gambitStatusEffect = chosenGambit.statusEffect;
        gambitAngerEffect = chosenGambit.angerEffect;
        gambitConfidenceEffect = chosenGambit.confidenceEffect;
        gambitLustEffect = chosenGambit.lustEffect;
        gambitPrideEffect = chosenGambit.prideEffect;
        gambitEnvyEffect = chosenGambit.envyEffect;
        //no claimant yet
        claimer = "";
        //create constructedGambit
        //append to constructedGambits array
        constructedGambits.push(new constructedGambit());
        //console.log(constructedGambits);
        //initialise a new interface with this gambit
        constructedGambitObject = constructedGambits[constructedGambits.length-1];
        activeGambitInterfaces.push(new gambitInterface());
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
                //make a decision about delivery
                    //check individuals drives
                    //create a prob. weighting for for distribution
                    //create a list, append to gambit.deliverySchedule
                    //append gambit to constructedGambits array
                    
    
        
}










