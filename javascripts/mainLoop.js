//////////////////////*
/// MAIN GAME LOOP ///*
//////////////////////*

//game loop, iterates every x
function alphaLoop() {
	//get the timestamp
	var now = Date.now();
	//get the delta between updates - how much time has actually passed between loop iterations
	var delta = now - then;

        
        //code to be run every iteration goes here:

        
	//before the loop re-iterates, store the old now as then. (yes it is confusing).
	then = now;
}

//initialise the main loop 
$(document).ready(function(){
    var mainLoop = setInterval(alphaLoop,1000);
    setInterval(timer,1000);
    
    //sets space bar to pause the main loop for bugtesting
    $(document).keyup(function(e){
            if(e.which == 32){
                    clearInterval(mainLoop);
            }
    });
});