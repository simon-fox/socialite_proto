/////////////////////////*
///    Agent Object   ///*
/////////////////////////*

function agentObject(){
    //status
    this.status = 5;
    //drives
    this.anger = 50;
    this.confidence = 50;
    this.lust = 50;
    this.pride = 50;
    this.envy = 50;
    //timer
    this.statusTimer = new Timer();
    //current gambit
    this.currentGambit = "";
}


