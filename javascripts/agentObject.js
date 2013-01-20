/////////////////////////*
///    Agent Object   ///*
/////////////////////////*

function agentObject(){
    //status
    this.status = 0;
    //drives
    this.anger = 0;
    this.confidence = 0;
    this.lust = 0;
    this.pride = 0;
    this.envy = 0;
    //timer
    this.statusTimer = new timer();
    //current gambit
    this.currentGambit = "";
}


