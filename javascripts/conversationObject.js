///////////////////////////*
/// Conversation Object ///*
///////////////////////////*

//use to track the heat of the convo

conversation = {
    update: function(){
        //check if there are already x gambits on the table
        if (constructedGambits.length < numberOfGambitsOnStage){
            //pick a random player
            var randomPlayer = playersArray[Math.floor(Math.random() * playersArray.length)];
            //check that player is not outraged & does not have a gambit
            if(randomPlayer.agent.outrage < 100 && $('.playerSummaryContainer').eq(randomPlayer.arrayPos).children('.gambit').length == 0){
                //if not, make a gambit
                makeGambit(randomPlayer);
            }   
        }
    }
}


