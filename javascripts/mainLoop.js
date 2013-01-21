//////////////////////*
/// MAIN GAME LOOP ///*
//////////////////////*

//game loop, iterates every x
function alphaLoop() {
	//get the timestamp
	var now = Date.now();
	//get the delta between updates - how much time has actually passed between loop iterations
	var delta = now - then;
        
	//call the director
	director();
	
	//before the loop re-iterates, store the old now as then. (yes it is confusing).
	then = now;
}

//initialise the main loop 
$(document).ready(function(){
    //load in the char select screen
    playerCharacterSelectInterface.init();
    
    //sets space bar to pause the main loop for bugtesting
    $(document).keyup(function(e){
            if(e.which == 32){
                    //clearInterval(mainLoop);
            }
    });
});