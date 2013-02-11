///////////////
//gossip page//
///////////////

//store html
var gossipPageHTML = '\
<div class="gossipContainer">\
    <div class="partyDescripton"><h1>YOU ARE ATTENDING A GALA <br/>HOSTED BY LORD SUCH<br/> IN HONOR OF THE GRADUATION OF HIS SWANS <br/>FROM FINISHING SCHOOL<br/><br/>EVERYONE IS TALKING ABOUT:</h1></div>\
    <div class="gossipWindowContainer">\
        <div class="gossipWindow">Mr Gatsbys new Silk Jacket</div>\
        <div class="gossipWindow">The shocking behaviour of Lord Pomps nephew</div>\
        <div class="gossipWindow">The possible romance between Charlotte Bronte and Mr Garrick</div>\
    </div>\
    <div class="instructions">\
        PRESS SPACE TO START GAME\
    </div>\
</div>\
';

var gossipPage ={
    html : gossipPageHTML,
    init: function(){
        //show container
        $('.gossipContainer').show();
        //bind a key
        $(document).on('keyup.spaceToLaunch',function(e){
        //check for space key
            if(e.which == 32){
               gossipPage.destroy();
               $(document).off('keyup.spaceToLaunch');
            }
        });
    },
    update: function(){
        
    },
    destroy: function(){
        //hide this
        $('.gossipContainer').hide();
        startGame();
    }
}
