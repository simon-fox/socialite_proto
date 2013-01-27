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
                
                //show intro text for 10 seconds
                $('.introText').show();
                setTimeout(function(){
                     $('.introText').hide();
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
                        playersArray[i].interface =  new playerSummaryInterface(playerObject);
                        //run playerSummaryInterface.init();
                        playersArray[i].interface.init();
                    }  
                    //start the main timer
                    gameTimer.init();
                    //start the game loop
                    mainLoop = setInterval(alphaLoop,15);
                },3000);     
        }
    });
}

//keybinds for the main game screen
function mainGameKeyBinds(){
    //unbinding the space key
    $(document).keyup(function(e){
        //check for space key
        if(e.which == 32){
            //do nothin
        }
    });
}

////////////////////////////////////
//binding keys to gambit claiming //
////////////////////////////////////
function bindClaimKeys(passGambit,passGambitInterface){
    //console.log(passGambitInterface);
    //pick four keys
    //check if they have been bound already
    
    var keysToBind = passGambit.claimedBy.arrayPos;
    var randomID = Math.random()*1000000000000000000 + "_" + Math.random()*1000000000000000000;
            //go through all keys
            //bind to function
            //add player who pressed key to passGambit.targetCharacter
            //switch gambit to .claimed
            $(document).on('keyup.gambits'+randomID,function(e){
                //claim
                if(e.which == eval(keySets[keysToBind].keyCodes[0])){
                   passGambitInterface.claimed();
                   $(document).off('keyup.gambits'+randomID);
                }
                //pass
                else if(e.which == eval(keySets[keysToBind].keyCodes[2])){
                    passGambitInterface.destroyTimeOut();
                    $(document).off('keyup.gambits'+randomID);
                }

            });
            //change bound to true
            keySets[keysToBind].bound = true;
            //change passGambit.boundKeys
            passGambit.boundKeys = keySets[keysToBind];
            

}

////////////////////////////////////
//binding keys to gambit targeting//
////////////////////////////////////
function bindTargetKeys(passGambit,passGambitInterface){
    console.log('bindTargetKeys is being called by '+passGambit.claimedBy.playerCharacter.name);
    //pick four keys
    //check if they have been bound already
    var keysToBind = passGambit.claimedBy.arrayPos;
    var randomID = Math.random()*1000000000000000000 + "_" + Math.random()*1000000000000000000;

            //go through all keys
            //bind to function
            //add player who pressed key to passGambit.targetCharacter
            //switch gambit to .claimed
            $(document).on('keyup.targets'+randomID,function(e){
                if(e.which == eval(keySets[keysToBind].keyCodes[0])){
                   passGambit.targetCharacter = playersArray[0];
                   passGambitInterface.destroy();
                   console.log('gambitInterface.destroy being called from bindTargetKeys');
                   $(document).off('keyup.targets'+randomID);
                }
                else if(e.which == eval(keySets[keysToBind].keyCodes[1])){
                    passGambit.targetCharacter = playersArray[1];
                    passGambitInterface.destroy();
                    console.log('gambitInterface.destroy being called from bindTargetKeys');
                    $(document).off('keyup.targets'+randomID);
                }
                else if(e.which == eval(keySets[keysToBind].keyCodes[2])){
                    passGambit.targetCharacter = playersArray[2];
                    passGambitInterface.destroy();
                    console.log('gambitInterface.destroy being called from bindTargetKeys');
                    $(document).off('keyup.targets'+randomID);
                }
                else if(e.which == eval(keySets[keysToBind].keyCodes[3])){
                    passGambit.targetCharacter = playersArray[3];
                    passGambitInterface.destroy();
                    console.log('gambitInterface.destroy being called from bindTargetKeys');
                    $(document).off('keyup.targets'+randomID);
                }
            });
            //change bound to true
            keySets[keysToBind].bound = true;
            //change passGambit.boundKeys
            passGambit.boundKeys = keySets[keysToBind];

}

