///////////////////////////*
/// Conversation Object ///*
///////////////////////////*

//use to track the heat of the convo

conversation = {
    heat : 0,
    turn : 0,
    turnsTakenThisRound : 0,
    moveTurnForward: function(){
        //move turn index forward
        if (conversation.turn < playersArray.length){
            conversation.turn = conversation.turn + 1;
        }
        else if (conversation.turn == playersArray.length){
            conversation.turn = 0;
        }
        //keep track of turns taken this round
        if (conversation.turnsTakenThisRound < playersArray.length){
            conversation.turnsTakenThisRound = conversation.turnsTakenThisRound + 1;
        }
        else if (conversation.turnsTakenThisRound == playersArray.length){
            //ROUND IS OVER!!!
            conversation.turnsTakenThisRound = 0;
        }
    },
    update: function(){
        //check heat against cap
        if (this.heat > 500){
            //end the game
            endGame();
        }
        else if(this.heat > 300){
            $('.heatBar div').css('background-color','#ff0000')
        }
    }
} 