///////////////////////*
/// Input Listeners ///*
///////////////////////*

//bind keys here
//keyBinds for the pcSelect screen
function playerCharacterSelectKeyBinds(){
    //clicking on a pc to read about it
    $('.portrait').click(function(){      
        $('.portrait').removeClass('selectedPC');
        $(this).addClass('selectedPC');
        //run .update
        playerCharacterSelectInterface.update();
    });
    //choosing a pc
    $('.chooseMe').click(function(){
        //create activePlayer object
        //load chosenPlayerCharacter into it
        //check for selectedPC
        for (var i=0; i < $('.portrait').length; i++){
            //if we find it
            if ($('.portrait').eq(i).hasClass('selectedPC') == true){
                chosenPlayerCharacter = playerCharacters[i];
                playersArray.push(new activePlayer());
                //show that player x has selected it
                $('.portrait').eq(i).append('<h2>p'+playersArray.length+'</h2>');
            }
        }
        
        
        //ask next player to make a choice
    });
}

//keybinds for the main game screen
function mainGameKeyBinds(){
    
}

