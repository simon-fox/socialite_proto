/////////////////////////*
///    Agent Object   ///*
/////////////////////////*

function agentObject(){
    //status
    this.status = 5;
    //drives
    this.anger = 55;
    this.confidence = 40;
    this.lust = 60;
    this.pride = 30;
    this.envy = 50;
    //timer
    this.statusTimer = new Timer();
    //current gambit
    this.currentGambit = "";
}


