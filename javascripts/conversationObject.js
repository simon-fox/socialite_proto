///////////////////////////*
/// Conversation Object ///*
///////////////////////////*

//use to track the heat of the convo

conversation = {
    heat : 0,
    update: function(){
        //check heat against cap
        if (this.heat > 500){
            //end the game
            endGame();
        }
    }
}