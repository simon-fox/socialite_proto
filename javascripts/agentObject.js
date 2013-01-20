/////////////////////////*
///    Agent Object   ///*
/////////////////////////*

function agentObject(){
    //status
    this.status = agentStatus;
    //drives
    this.anger = agentAnger;
    this.confidence = agentConfidence;
    this.lust = agentLust;
    this.pride = agentPride;
    this.envy = agentEnvy;
    //timer
    this.statusTimer = new timer();
    //current gambit
    this.currentGambit = "";
}


