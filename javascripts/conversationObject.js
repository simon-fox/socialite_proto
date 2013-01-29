///////////////////////////*
/// Conversation Object ///*
///////////////////////////*

//use to track the heat of the convo

conversation = {
    heat : 0,
    turn : 0,
    turnsTakenThisRound : 0,
    moveTurnForward: function(targetCharacter){
        
        //move turn index forward
        conversation.turn = targetCharacter.arrayPos;
        console.log('changed turn index to: '+conversation.turn);
        
        
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
        
    }
} 