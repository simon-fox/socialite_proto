////////////////////////////
// secretMissionInterface //
////////////////////////////


//store html
var secretMissionHTML = '\
<div class="secretMission">\
    <div class="secretMissionText"></div>\
    <div class="secretMissionProgressBar"><div></div></div>\
</div>\
';

function secretMissionInterface(constructedMission) {
    this.html = secretMissionHTML;
    this.associatedMission = constructedMission;
    this.init = function(){
        ///////////////////////////////////
        //append this.html to the display//
        ///////////////////////////////////
        $('.playerSummaryContainer').eq(this.associatedMission.claimant.arrayPos).children('.playerSummary').after(this.html);
        var constructedSecretMissionInterfaceHtml = $('.playerSummaryContainer').eq(this.associatedMission.claimant.arrayPos).children('.secretMission');
        //add identifying class to .data
        $(constructedSecretMissionInterfaceHtml).data('associatedMission',this.associatedMission); 
        //print correct data
        $(constructedSecretMissionInterfaceHtml).children('.secretMissionText').html(this.associatedMission.text);
    };
    this.update = function(){
        //////////////////////////////
        // get the right dom element//
        //////////////////////////////
        var missionDOM;
        for (var i=0;i<$('.secretMission').length;i++){
            if ($('.secretMission').eq(i).data().associatedMission == this.associatedMission){
                missionDOM = $('.secretMission').eq(i);
            }
        }
        //update necessary data in object
        if (this.associatedMission.category == "outrage"){
            this.associatedMission.amountToMatch = 101;
            this.associatedMission.checkAgainst = this.associatedMission.target.agent.outrage;
        }
        else if (this.associatedMission.category == "highStatus"){
            this.associatedMission.amountToMatch = this.associatedMission.target.agent.status + 20;
            this.associatedMission.checkAgainst = this.associatedMission.claimant.agent.status;
        }
        else if (this.associatedMission.category == "lowStatus"){
            this.associatedMission.amountToMatch = this.associatedMission.target.agent.status;
            this.associatedMission.checkAgainst = this.associatedMission.claimant.agent.status;
        }
        //store how close we are as a variable to affect the bar
        var howCloseAreWe;
        //check how close we are to fulfilling mission
        if (this.associatedMission.type == "ascend"){
            //is this.associatedMission.checkAgainst above amountToMatch?
            if(this.associatedMission.checkAgainst>this.associatedMission.amountToMatch){
               //mission is complete
               this.destroy();
            }
            else{
                howCloseAreWe = (this.associatedMission.checkAgainst / this.associatedMission.amountToMatch) *100;
            }
        }
        else if(this.associatedMission.type == "descend"){
            //is this.associatedMission.checkAgainst below amountToMatch?
            if(this.associatedMission.checkAgainst<this.associatedMission.amountToMatch){
                //mission is complete
                this.destroy();
            }
            else{
                howCloseAreWe = ((this.associatedMission.checkAgainst - this.associatedMission.amountToMatch) / this.associatedMission.checkAgainst) *100;
                //console.log('howCloseAreWe in secretMissionInterface.update for descender: '+howCloseAreWe);
            }
        }
        
        //update visual elements
        $(missionDOM).children('.secretMissionProgressBar').children('div').css('width',howCloseAreWe+"%");
    };
    this.destroy = function(){
        //////////////////////////////
        // get the right dom element//
        //////////////////////////////
        var missionDOM;
        for (var i=0;i<$('.secretMission').length;i++){
            if ($('.secretMission').eq(i).data().associatedMission == this.associatedMission){
                missionDOM = $('.secretMission').eq(i);
            }
        }
        //excise from DOM
        $(missionDOM).remove();
        //excise from array
        for (var i=0;i<secretMissionInterfaces.length;i++){
            if (secretMissionInterfaces[i] == this){
                secretMissionInterfaces.splice(i,1);
            }
        }
        //award any points?
        this.associatedMission.claimant.agent.score = this.associatedMission.claimant.agent.score + this.associatedMission.score;
        //get new mission for this player
        pickSecretMission(this.associatedMission.claimant);
    };
    
}