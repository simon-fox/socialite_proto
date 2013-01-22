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

//binding keys to gambit claiming/targeting
function bindGambitKeys(passGambit,passGambitInterface){
    console.log(passGambitInterface);
    //pick four keys
    //check if they have been bound already
    for (var i=0;i<keySets.length;i++){
        if(keySets[i].bound == false){
            //go through all four keys
            //bind to function
            //add player who pressed key to passGambit.claimedBy
            //switch gambit to .claimed
            $(document).keyup(function(e){
                if(e.which == eval(keySets[i].keyCodes[0])){
                   passGambit.claimedBy = playersArray[0];
                   //bug: it's not running the right .claimed() method
                   // so it must be finding the wrong thing in the array
                   //so we have to look through activeGambitInterfaces to find the right one
                   var indexPos = activeGambitInterfaces.indexOf(passGambitInterface);
                   console.log(indexPos);
                   activeGambitInterfaces[indexPos].claimed();
                   console.log('keypress');
                }
                else if(e.which == eval(keySets[i].keyCodes[1])){
                    passGambit.claimedBy = playersArray[1];
                    var indexPos = activeGambitInterfaces.indexOf(passGambitInterface);
                   activeGambitInterfaces[indexPos].claimed(passGambit);
                   console.log('keypress');
                }
                else if(e.which == eval(keySets[i].keyCodes[2])){
                    passGambit.claimedBy = playersArray[2];
                    var indexPos = activeGambitInterfaces.indexOf(passGambitInterface);
                   activeGambitInterfaces[indexPos].claimed(passGambit);
                   console.log('keypress');
                }
                else if(e.which == eval(keySets[i].keyCodes[3])){
                    passGambit.claimedBy = playersArray[3];
                    var indexPos = activeGambitInterfaces.indexOf(passGambitInterface);
                   activeGambitInterfaces[indexPos].claimed(passGambit);
                   console.log('keypress');
                }
                else if(e.which == eval(keySets[i].keyCodes[4])){
                    passGambit.claimedBy = playersArray[4];
                    var indexPos = activeGambitInterfaces.indexOf(passGambitInterface);
                   activeGambitInterfaces[indexPos].claimed(passGambit);
                   console.log('keypress');
                }
                else if(e.which == eval(keySets[i].keyCodes[5])){
                    passGambit.claimedBy = playersArray[5];
                    var indexPos = activeGambitInterfaces.indexOf(passGambitInterface);
                   activeGambitInterfaces[indexPos].claimed(passGambit);
                   console.log('keypress');
                }
            });
               
            //change bound to true
            keySets[i].bound = true;
            //change passGambit.boundKeys
            passGambit.boundKeys = keySets[i];
            
            
            //only do this once
            break;
            
            
        }
    }
}

