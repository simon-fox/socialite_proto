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
                arrayPosition = playersArray.length;
                playersArray.push(new activePlayer());
                //show that player x has selected it
                $('.portrait').eq(i).append('<h2>p'+playersArray.length+'</h2>');
            }
        }
    });
    //starting the game
    $(document).keyup(function(e){
        //check for space key
        if(e.which == 32){
                //destroy pcselect interface
                playerCharacterSelectInterface.destroy();
                //show main game interface
                $('.mainGameContainer').show();
                //bind mainGameKeyBinds
                mainGameKeyBinds();
                //loop through playersArray
                for (var i=0;i<playersArray.length;i++){
                    //create a new playerSummaryInterface for each player
                    //attach the playerObject
                    playerObject = playersArray[i];
                    //push into playerObject 
                    playersArray[i].interface =  new playerSummaryInterface();
                    //run playerSummaryInterface.init();
                    playersArray[i].interface.init();
                }  
                //start the main timer
                gameTimer.init();
                //start the game loop
                mainLoop = setInterval(alphaLoop,1000);
        }
    });
}

//keybinds for the main game screen
function mainGameKeyBinds(){
    
}

