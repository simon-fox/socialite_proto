/////////////////////////////
//introduce yourselves page//
/////////////////////////////


//store html
var introduceYourselfHTML = '\
    <div class="partyDescripton"><h1>YOU ARE: </h1></div>\
    <div class="playerPortraitsContainer">\
        <div class="introducePortrait">\
            <div class="introducePortraitPlayer"></div>\
            <div class="introducePortraitImg"></div>\
            <div class="introducePortraitName"></div>\
        </div>\
        <div class="introducePortrait">\
            <div class="introducePortraitPlayer"></div>\
            <div class="introducePortraitImg"></div>\
            <div class="introducePortraitName"></div>\
        </div>\
        <div class="introducePortrait">\
            <div class="introducePortraitPlayer"></div>\
            <div class="introducePortraitImg"></div>\
            <div class="introducePortraitName"></div>\
        </div>\
        <div class="introducePortrait">\
            <div class="introducePortraitPlayer"></div>\
            <div class="introducePortraitImg"></div>\
            <div class="introducePortraitName"></div>\
        </div>\
    </div>\
    <div class="partyDescripton"><h1>NOW INTRODUCE<br/>YOURSELVES TO ONE<br/>ANOTHER </h1></div>\
    <div class="instructions">\
        PRESS SPACE TO START GAME\
    </div>\
';

var introduceYourselfPage = {
    html : introduceYourselfHTML,
    init : function(){
        //print to display
         $('.introPage').show();
        $('.introPage').append(introduceYourselfPage.html);
        //loop through players
        for (var i = 0; i<playersArray.length;i++){
            $('.introducePortrait').eq(i).children('.introducePortraitPlayer').html('player '+(i+1));
            $('.introducePortrait').eq(i).children('.introducePortraitImg').css('background-image','url(images/'+playersArray[i].playerCharacter.portrait+')');
            $('.introducePortrait').eq(i).children('.introducePortraitName').html(playersArray[i].playerCharacter.name);
        }
        
        //bind a key
        $(document).on('keyup.spaceToGossip',function(e){
        //check for space key
            if(e.which == 32){
               introduceYourselfPage.destroy();
               $(document).off('keyup.spaceToGossip');
            }
        });
    },
    destroy : function(){
        //remove from display
        $('.introPage').hide();
        //print gossip screen
        gossipPage.init();
    }
    
}