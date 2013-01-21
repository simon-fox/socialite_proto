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
    }
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
    
    
    //check the global temperature of the conversation
        //loop through all players
        //add up totals for each drive in the game
        //create a list giving us prob. weighting for gambit assembly
    
    //build status leaderboard
        //loop through all players
        //take their status
        //build an ordered list
        //update player data 
    
    //run the gambit assembler
        //check number of gambits on screen
            //if enough
                //do nothing
            //else
                //using prob. weights from above
                //pick a modifier, gambit and target
                //add up the status & drive effects
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