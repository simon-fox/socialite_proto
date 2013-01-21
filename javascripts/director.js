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
    console.log(sortedGlobalTemp);
    
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
    console.log(total);
    //build an array of probabilities
    for (var c=0;c<sortedGlobalTemp.length;c++){
            driveProbabilities.push(sortedGlobalTemp[c].value/total);
    }
    //sort the probabilities by numerical ascendancy
    driveProbabilities.sort(function(a,b){return a-b});
    console.log(driveProbabilities);
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
    console.log(exitValue * total);
    for (var c=0;c<sortedGlobalTemp.length;c++){
          if (sortedGlobalTemp[c].value == (exitValue * total)){
            chosenDrive = sortedGlobalTemp[c].drive;
            console.log(chosenDrive);
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
    
    //run the gambit assembler
    //check number of gambits on screen
    //if plenty
    if(constructedGambits.length >= 3){
        //do nothing
    }
    else{
        
    }
            
            //else
                //using prob. weights from above
                //pick a modifier, gambit and target
                //add up the status & drive effects
                    //Modifiers affect claimant
                    //Gambits affect target
                //make a decision about delivery
                    //check individuals drives
                    //create a prob. weighting for for distribution
                    //create a list, append to gambit.deliverySchedule
                    //append gambit to constructedGambits array
                    
                    
    //build gambits
        //cycle through constructed gambits array
        //.init the ones which need to be built
        //call .update on every gambitInterface
            //will update every front end from the data
        
}