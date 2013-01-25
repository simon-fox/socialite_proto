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
        //check if they have a gambit 
        if (playersArray[i].agent.currentGambit == ""){
            //no gambit, lets make one!!!!
            makeGambit(playersArray[i]);
        }
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
    //update gambit interfaces//
    ////////////////////////////
    
    //cycle through constructed gambit interfaces array
    for (var i = 0; i<activeGambitInterfaces.length ; i++){
        if (activeGambitInterfaces[i].onScreen == false){
        }
        else {
            //it is on screen
            //call .update on every gambitInterface
            activeGambitInterfaces[i].update();
        }
        
    }
        
}










