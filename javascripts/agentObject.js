/////////////////////////*
///    Agent Object   ///*
/////////////////////////*

function agentObject(){
    //status
    this.status = 0;
    //drives
    this.anger = 10;
    this.confidence = 25;
    this.lust = 15;
    this.pride = 75;
    this.envy = 42;
    //timer
    this.statusTimer = new Timer();
    //current gambit
    this.currentGambit = "";
}


