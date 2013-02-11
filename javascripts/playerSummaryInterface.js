//////////////////////////////
// player summary interface //
//////////////////////////////


///////////////////////
//player summary html//
///////////////////////
var playerSummaryInterfaceHtml ='\
<div class="playerSummary">\
    <div class="topLabel">PLAYER ONE</div>\
    <div class="portraitAndDrives">\
        <div class="summaryPortrait">\
            <div class="statusPosition">1st</div>\
        </div>\
        <div class="driveBarsContainer">\
            <div class="driveBar heatBar"><div>OUTRAGE</div></div>\
            <div class="driveBar statusBar"><div>STATUS</div></div>\
        </div>\
    </div>\
</div>\
';

//player summary prototype
function playerSummaryInterface(playerObject){
    //load in the html
    this.html = playerSummaryInterfaceHtml;
    //which player
    this.player = playerObject;
    //on initialisation
    this.init = function(){
        ///////////////////////////////////////////
        //append this.html to the correct display//
        ///////////////////////////////////////////
        //init a variable so that the .eq is the number in the players array -1
        $('.playerSummaryContainer').eq(this.player.arrayPos).append(this.html);
        
        /////////////////
        //load portrait//
        /////////////////
        $('.summaryPortrait').eq(this.player.arrayPos).css('background-image','url(images/'+this.player.playerCharacter.portrait+')');
        ///////////////////
        //start the timer//
        ///////////////////
        this.player.statusTimer = new Timer();
        this.player.statusTimer.start();
        console.log('timer started');
    };
    this.update = function(){
        /////////////////////
        // update the html //
        /////////////////////
        //update player name
        $('.topLabel').eq(this.player.arrayPos).html(this.player.playerCharacter.name);
        //update status position
        $('.statusPosition').eq(this.player.arrayPos).html(this.player.statusPosition);
        //update drive bars
        $('.heatBar div').eq(this.player.arrayPos).css('width',(this.player.agent.outrage)+"%");
        $('.statusBar div').eq(this.player.arrayPos).css('width',(this.player.agent.status)+"%");
        /////////////////////
        //update timer bars//
        /////////////////////
        //how many seconds do we have
        var grabGambitTimeOut = 1;
        //if less than that has passed
        //console.log(this.player.statusTimer.tick);
        if (this.player.statusTimer.tick<grabGambitTimeOut){
           //do nothing to no-one
        }
        //if time is up
        else if (this.player.statusTimer.tick == grabGambitTimeOut){
            //restart timer
            this.player.statusTimer.stop();
            this.player.statusTimer.start();
            //reduce status by 1
            this.player.agent.status  = this.player.agent.status -1;
            this.player.agent.outrage = this.player.agent.outrage -1;
        }
    };
    this.outraged = function() {
        /////////////////////
        // update the html //
        /////////////////////
        // player has been bumped from convo
        //update player name
        $('.topLabel').eq(this.player.arrayPos).html("OUTRAGED");
        //update status position
        $('.statusPosition').eq(this.player.arrayPos).html("XX");
        //update drive bars
        $('.heatBar div').eq(this.player.arrayPos).css('width',"100%");
        $('.statusBar div').eq(this.player.arrayPos).css('width',0+"%");
        
        /////////////////////
        //update timer bars//
        /////////////////////
        //how many seconds do we have
        var grabGambitTimeOut = 1;
        //if less than that has passed
        //console.log(this.player.statusTimer.tick);
        if (this.player.statusTimer.tick<grabGambitTimeOut){
           //do nothing to no-one
        }
        //if time is up
        else if (this.player.statusTimer.tick == grabGambitTimeOut){
            //restart timer
            this.player.statusTimer.stop();
            this.player.statusTimer.start();
            //reduce status by 1
            this.player.agent.status  = this.player.agent.status -1;
            this.player.agent.outrage = this.player.agent.outrage -1;
        }
    };
}