/////////////////////////*
/// player prototype  ///*
/////////////////////////*

function activePlayer(){
    this.playerCharacter = chosenPlayerCharacter;
    this.agent = new agentObject();
    this.interface = "";
    this.arrayPos = arrayPosition;
    this.statusPosition = "2nd";
    this.update = function(){
        //decide whether to generate a gambit or not
        //decide whether agent is in outrage or not
        if(this.agent.outrage < 100){
            //agent not outraged
            this.interface.update();
            //check if it is their turn 
            if (this.arrayPos == conversation.turn){
                //if so, make a gambit
                makeGambit(this);
            }
        }
        else if(this.agent.outrage >= 100){
            //agent is outraged
            this.interface.outraged();
            //check if it is their turn 
            if (this.arrayPos == conversation.turn){
                //get the next player
                var nextPlayer;
                if(this.arrayPos == playersArray.length -1){
                    nextPlayer = 0;
                }
                else{
                    nextPlayer = this.arrayPos +1;
                }
                conversation.moveTurnForward(playersArray[nextPlayer]);
            }
        }

        //make sure scores don't dip below zero or above 100
        //status
        if(this.agent.status<0){
            this.agent.status = 0;
        }
        else if (this.agent.status>100){
            this.agent.status = 100;
        }
        //change outrage bar color if necessary
        if(this.agent.outrage > 80){
            $('.heatBar div').eq(this.arrayPos).css('background-color','#ff0000')
        }
        
        
    };
}

