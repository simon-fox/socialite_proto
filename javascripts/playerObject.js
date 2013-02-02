/////////////////////////*
/// player prototype  ///*
/////////////////////////*

function activePlayer(){
    this.playerCharacter = chosenPlayerCharacter;
    this.agent = new agentObject();
    this.interface = "";
    this.arrayPos = arrayPosition;
    this.statusPosition = "2nd";
    this.outrageTimer = new Timer();
    this.update = function(){
        //decide whether to generate a gambit or not
        //decide whether agent is in outrage or not
        if(this.agent.outrage < 100){
            //agent not outraged
            this.interface.update();
        }
        else if(this.agent.outrage >= 100){
            //agent is outraged
            this.interface.outraged();
            //don't make a gambit
            //ok
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
        if(this.agent.outrage < 0){
            this.agent.outrage = 0;
        }
        else if(this.agent.outrage > 110){
            this.agent.outrage = 110;
        }
        
    };
}

