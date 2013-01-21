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
        //anger
        if(this.agent.anger<0){
            this.agent.anger = 0;
        }
        else if (this.agent.anger>100){
            this.agent.anger = 100;
        }
        //confidence
        if(this.agent.confidence<0){
            this.agent.confidence = 0;
        }
        else if (this.agent.confidence>100){
            this.agent.confidence = 100;
        }
        //lust
        if(this.agent.lust<0){
            this.agent.lust = 0;
        }
        else if (this.agent.lust>100){
            this.agent.lust = 100;
        }
        //pride
        if(this.agent.pride<0){
            this.agent.pride = 0;
        }
        else if (this.agent.pride>100){
            this.agent.pride = 100;
        }
        //envy
        if(this.agent.envy<0){
            this.agent.envy = 0;
        }
        else if (this.agent.envy>100){
            this.agent.envy = 100;
        }
    };
}

