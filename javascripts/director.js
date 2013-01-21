/////////////////////////*
///   Director func   ///*
/////////////////////////*

//This function to be run every cycle
//We'll use this to:
    //check the global timer and update it
    //call .update on every playerSummaryInterface
        //will update every front end from the data
    
    //check the global temperature of the conversation
        //loop through all players
        //add up totals for each drive in the game
        //create a list giving us prob. weighting for gambit assembly
    //run the gambit assembler
        //check number of gambits on screen
            //if enough
                //do nothing
            //else
                //using prob. weights from above
                //pick a modifier, gambit and target
                //add up the status & drive effects
                //make a decision about delivery
                    //check individuals drives
                    //create a prob. weighting for for distribution
                    //create a list, append to gambit.deliverySchedule
                    //append gambit to constructedGambits array
    //build gambits
        //cycle through constructed gambits array
        //.init the ones which need to be built
        //call .update on every gambitInterface
            //will update every front end from the data
        
    