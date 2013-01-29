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
        //make sure scores don't dip below zero or above 100
        //status
        if(this.agent.status<0){
            this.agent.status = 0;
        }
        else if (this.agent.status>100){
            this.agent.status = 100;
        }
        
        //check heat against cap
        if (this.agent.outrage > 100){
            //knock out that player
            this.interface.destroy();
        }
        else if(this.agent.outrage > 80){
            $('.heatBar div').css('background-color','#ff0000')
        }
    };
}

