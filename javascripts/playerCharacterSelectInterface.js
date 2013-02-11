/////////////////////////////////////
//choosePC interface initialisation//
/////////////////////////////////////


var playerCharacterSelectInterface = {
    init : function(){
                    //show display
                    $('.charSelectContainer').show();
                    //load in pc portraits
                    for (var i=0; i < $('.portrait').length; i++){
                        //switch portrait bg img
                        $('.portrait').eq(i).css('background-image','url(images/'+playerCharacters[i].portrait+')');
                    }
                    //select first portrait
                    $('.portrait').eq(0).addClass('selectedPC');
                    //run .update
                    playerCharacterSelectInterface.update();
                    //run keybind function
                    playerCharacterSelectKeyBinds();
                },
    update : function(){
                    //check for selectedPC
                    for (var i=0; i < $('.portrait').length; i++){
                        //if we find it
                        if ($('.portrait').eq(i).hasClass('selectedPC') == true){
                            //load info into bio window
                            $('.fullLengthImage').css('background-image','url(images/'+playerCharacters[i].img+')');
                            $('.bioText').html(playerCharacters[i].bio);
                            //loop through traits and append them
                            for (var c=0;c<playerCharacters[i].traits.length;c++){
                                $('.bioText').append('<br/><br/>'+playerCharacters[i].traits[c]);
                            }
                        }
                    }
                    },
    destroy : function(){
                        //hide this interface
                        $('.charSelectContainer').hide();
                        //unbind keys
                    }
}