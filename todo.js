/////////////////////////////////////////*
//      TO DO for Socialite proto      //*
/////////////////////////////////////////*


- Decide on interface
    - Divided displays with privacy 
    - Single display with kb bashing
    
- Design agent model
    - Drives
        //- how many
        //- what are they
        //- how do they affect game play
        - special powers like wizard scrabble?
        - Anger
            - fuller anger means more likely to get shout modifiers
            - -- status
            - lower anger means you are more likely to get calm modifiers
            - ++ status 
        - Confidence
            - lower confidence means more likely to get mumble or murmer modifiers
            - -- status
            - fuller confidence means you are more like to get assertive modifiers
            - ++ status 
        - Lust
            - fuller lust means you are more likely to get lascivious/flirty modifiers
            - 50/50 to lose or gain you status depending on receptivity of target
        - Pride
            - fuller pride means you are more likely to get boastful modifiers
            - ++ status 
            - low pride means you are more likely to get self effacing gambits
            - -- status
        - Envy
            - fuller envy means you are more likely to admiring modifiers
            - -- status
            - lower envy means you are more likely to get snide or insulting modifiers
            - ++ status
        
    - Personality traits
        //- how many
            - a full persona could be 4 traits - 2 pos, 2 neg
        //- what are they
        //- How do they affect drives
        - affects anger:
            - bitter, petulant, cranky //neg
                - more prone to anger raising
            - calm, collected //pos
                - more resiliant to anger raising
        - affects confidence: 
            - assured, determined, resolved //pos
                - more resiliant to confidence loss
            - docile, obsequious, pliable //neg
                - more prone to confidence loss
        - affects lust: 
            - lascivious, salacious, wanton //wild card
                - more prone to lust rising
        - affects pride: 
            - boastful, esteemed, narcissist //pos
                - more prone to pride rising
            - humile, humble //neg
                - more prone to pride dropping
        - affects envy: 
            - jealous, covetous, avaricious //neg
                - more prone to envy rising 
            - comfortable, replete, self-posessed  //pos
                - more resilient to envy rising
    //- Timers
        //- how to structure
            //- timer - must be able to:
            //- initialise a timer
            //- count off every ms
            //- fire event when x ms have passed
            //- unbind timer 

- Design PC's
    - names
    - backstories
    - personas
    - images
    
- Design Gambits //largely designed, now come up with a bunch!
    - Design gambit components
        - Modifier - 'calmly', 'aggresively', 'sincerely' etc
        - Gambit - 'say', 'insult', 'compliment' etc
        - Target player - player selected
        - Target object - item from V&A collection or personality trait
        - Status effect (if any)
        - Drive effect (if any)
        EG: 'Calmly insult Mrs Garricks Serving Dish' + status for client, + anger, - status for target
        - what would a special 'power-up' gambit look like?
            - 'boast about your trip around the world' ++status, ++pride ++envy for all
            - would they have special effects?

- Design Director 
    - How is a gambit assembled?
        - Choosing components
        - escalating tension
            - taking a measurement of global 'temperature' of the game
            - ie: how much anger/anxiety etc - global total of each goal
            - augment gambits to reflect this.
                - will result in feedback loop escalating convo 
        - mario-kart rubber banding
            - how to make this work on a single display?
                - Labelled gambits which can only be claimed by specific players?
                - or which MUST be claimed?
                - could limit the players which can claim a gambit 
    - How and to who is it distributed? // irrelevant if going with single display
        - is there a type of gambit which MUST be claimed?
        - how many gambits at once?
    - How is it claimed?
    - How do we know it is completed?
    - How do we keep track of time?
    - How do we keep all displays updated appropriately?

- Design character selection
    - each char + bio
    - how are they selected?
    - how do we attribute them to each 'player' in the game?
    - how do we start the game when enough have been selected?
    - what is the limit?

- Create assets
    - create asset list
        - Character portraits
            - find that photo pixellator on r/gamedev
        - modal boxes
        - buttons
        - font
        - character ui
        - lists of gambit words and associated status effects 
    - estimate time required for creation
    
    
    
/////////////////////*
/// code planning ///*
/////////////////////*

Data structure:
    - Chars/Agents
        - Base agent prototype
            - track drive integers
            - track status
            - track timers
                - check timer
                - if timer runs out, deduct status 
        - Char data object
            - persona trait objects
    
    - Gambits
        - Modifiers
            - status effects
            - drive effects
        - Gambits
            - status effects
            - drive effects
        - Target objects
            - status effects
            - drive effects
    
    - Input listeners
        - Abstract input listener function prototype
            - bind random key
                - choose from array of all unbound keys
                - excise chosen key from array of unbound key and place in array of bound keys
                - also push into array of bound keys local to whatever the keypress object relates to (ie (gambit.boundKeys))
            - unbind key
                - clear listener
                - excise key from bound keys array and push into unbound key array
                - also excise from array of bound keys local to whatever the keypress object relates to (ie (gambit.boundKeys))
            //possible: give each player a row of four keys and pick from those
    
    - Interface
        - handles .update of all interface elements
        - every tick, re-draw all relevant interface bits
        - Char displays
            - drive meters
            - timers
        - gambit displays
            - text
            - buttons
            - portraits
            - effects
            - timers
        - main timer
    
    - Director
        //function run every cycle
        - run global timer
        
        //function run every cycle
        - check all drives
            - loop through array of all players
            - add up totals of each drive in the game
            - create probability weighting for assembling gambits
                - most likely to get highest global drive as modifier
                - least likely to get lowest global drive as modifier 
        
        //function run every cycle
        - assemble gambits
            - check number of gambits on the screen
                - if enough
                    - do nothing
                - else
                    - POSS: roll on low chance of picking up 'super' gambit??
                        - ideal would be to look at spacing between players scores
                        - if there is a big gap between last & penultimate players then increase chance of super gambit
                    - need to pick:
                        - modifier
                        - gambit
                        - target object
                    - need to add up status & drive effects
                    - load into gambit object and pass to decision function 
        
        //function run every cycle
        - decide who gambits are delivered to
            - check individuals drives
            - create probability list for distributing gambits
            - cycle through gambits, rolling against probability distribution each time a gambit is being delivered
            - creating an ordered list - 0 = give it to this guy first, .length = give it to this guy last. 
        
        //function run every cycle
        - deliver gambits
            - build gambit display on screen
            - bind keys for gambit claiming (gambit.boundKeys)
        
        //function run every cycle
        - release gambit for claiming to more people as time passes
            - first 2 on list get it right away
            - after x seconds release to another until all players have had a chance or gambit is claimed
            - need an exception for compulsory gambits..
        
        //listener, not run every cycle but constructed/destroyed as necessary
        - listen for gambit claiming
            - pretty straightforward, listeners already bound.
            - once listener is fired, clear the claim buttons
            - also update the claimers personal timer
            - unbind gambit claiming keys (gambit.boundKeys)
            - create target choice interface
                - bind target choice keys (gambit.boundKeys)
            - update data (gambit.claimedBy)
        
        //listener, not run every cycle but constructed/destroyed as necessary    
        - listen for target choice
            - update data (gambit.targetCharacter)
            - unbind target choice keys (gambit.boundKeys)
            - bind completion key (gambit.boundKeys)
            
        //listener, not run every cycle but constructed/destroyed as necessary
        - listen for gambit completion
            - clear the gambit from the table
            - unbind the key attached for completion
            - send desired status/drive change to update function with desired target
        
        - update statuses/drives etc //function required here to decide: how does personality affect this?
            - 
            
        //function run every cycle    
        - end game when appropriate
        
    - Game Loop
        - Run all .update functions
        

///////////////////////////////////////////////

/////////////////////*
/// data planning ///*
/////////////////////*
//useful data:

//global players array

//gambit pieces:
    // modifiers array
    // gambits array
    // target objects array

//modifier
var modifier = {
    text: "",
    statusEffect: "",
    angerEffect: "",
    confidenceEffect: "",
    lustEffect: "",
    prideEffect: "",
    envyEffect: ""
}

//gambit
var gambit = {
    text: "",
    statusEffect: "",
    angerEffect: "",
    confidenceEffect: "",
    lustEffect: "",
    prideEffect: "",
    envyEffect: ""
}

//target object
var targetObject = {
    text: "",
    img: ""
}

//global constructed gambits array
constructedGambits = [];


//constructed gambit
function gambit(){
    //the gambit message
    this.modifier = chosenModifier;
    this.gambit = chosenGambit;
    this.targetObject = chosenTargetObject;
    this.targetCharacter = chosenTargetCharacter;
    
    //gambit status & drive effects
    this.statusEffect = totalStatusEffect;
    this.angerEffect
    this.confidenceEffect
    this.lustEffect
    this.prideEffect
    this.envyEffect
    
    //gambit claimant and keybindings
    this.claimedBy = claimer;
    this.boundKeys = [];
}

//agent
    // have a .update function for timers? 

//character

//player (= agent + character data)

//interface elements
    //either have concat. strings to push to screen for each of these or
    //have them hidden on the screen to show/hide when necessary.
    //have a .update function for drawing to screen




/////////////////////////////////////////////
- Intro/ title screen
- Char selection
    - arrow keys to choose chars
    - in sequence - p1 choose, then p2 etc
    - bind specifics of chosen char onto agent class
- run game screen
    - run game loop
- end game screen
    - declare winner
    - offer awards/cheevs
    
    
/////////////////////////////////////////////
/////////////////////////////////////////////
/////////////////////////////////////////////

////////////////////////*
/// actual TODO list ///*
////////////////////////*

//setting up the framework
//- set up page framework & file structure
//- set up main game loop
//- set up data structures/prototypes
    //- set up agent object prototype
    //- set up player character object prototypes
        //- set up global array of PCs
        //- set up pushing pc object protos into array
    //- set up player prototype
    //- set up interface element objects
        //- stored strings of html essentialy
        //- set up structure which allows for updating in loop
        //- set up structure which allows for dynamic gambit displays
        //- set up structure which allows for dynamic player summaries
    //- set up gambit prototypes
        //- set up gambit pieces:
            //- modifiers
            //- target objects
            //- gambit statements
        //- set up gambit piece arrays
            //- set up pushing instantiated items into global arrays
            //- modifiers
            //- gambits
            //- target objects
        //- set up assembled gambit
   // - set up global players array
    //- set up global constructed gambits array
    //- set up global gambit piece arrays

//setting up the interface 
//- build basic html interface pieces

    //game screen
    //- global timer
    //- pc portrait
    //- pc readout box
        //- %/progress bar for each drive
        //- readout for status
        //- progress bar for individual timer
       // - message bit
    //- 3 col layout
    //- gambit readout box
        //- text of gambit
        //- status/drive effects
        //- claim buttons
        //- timer bar
    //- gambit choose target box
        //- target portraits/buttons
        //- timer bar
    ///////////////////////
    /// DO WE NEED THIS? //
    ///////////////////////
    //- gambit completed report box
        //- report complete button
        //- timer bar
    ///////////////////////
    - pic for bg
    
    //charselect screen
    //- char selection portraits
    //- instruction
    //- char readouts
    
    //intro screen
    - title
    - party pic
    
    //game over screen
    - winner
    - cheevs

//setting up the game logic
//main game
//- build timer prototype
//- build the input listener prototype
//- build the director
    //- build game timer
    //- build leaderboard
    //- update all player interfaces
    //- bound player scores
    //- update display of leaderboard
    //- build grab gambit timers
    //- update scores
    
    //- build drive checker
        //- involves probabilities stuff/ building a list
    //- build gambit assembler - test to see if it spits out gambits
        //- involves probabilities stuff/ weighted random choice
    - build gambit delivery
    - build gambit releasing //maybe ignore this for proto
    - build gambit listener
        //- claiming
        - target choice
        - completion
    //- build score updater
        //- augmentors for each persona type
    //- build responses
        - fix responses bugs

//building game assets
    - bunch of gambits
    - bunch of modifiers
    - bunch of target objects
    - 8 pc's

//char select
//- build input listeners
//- build transport to player objects

//end game
- announce winner
- cheevs

//////////////////////////////////////////////
//////////////////////////////////////////////


//loading interfaces & players process
//- init player choice screen
//- every player that chooses, init a new activePlayer();
    //- give it the chosen PC
    //- fill up the playersArray
//- when game starts
    //- loop through playersArray
    //- for each player create a new playerSummaryInterface
    //- run .init in that playerSummaryInterface
    //- from then on, call .update on it every tick
    //this should keep everything updated on the display
//- when director creates a gambit
    //- .init a new gambitInterface
    //- init all the listeners
    //- when claimed run .targetMode
    //- update listeners
    //- destroy interface 2-3 seconds after claiming
    
    
    
////////////////////////
//// gambit creation ///
////////////////////////

- Simplest method:
    - pick a random modifier
    - pick a random gambit
    - pick a random targetObject
    
    - concatenate the descriptions and display the effects

    - build gambit, throw into array
    
//- less simple method
    //- index gambits & modifiers
    //- index by drive most affected
    //- add a key value for this
    
    //- make weighted random choice in global drive temps
    //- pick from appropriate index
    
    //- build gambit
    //- sort constructed gambits by greatest value (status affect?)
    //- use sorting to decide release schedule
    
    
////////////////////////
//// todo for v 3.0  ///
////////////////////////

//- remove all drives from obejcts
//- replace with conversational heat measure
//- make object to store conversational variables
    - probably scope everything to this rather than globally
//- re-write the prototypes so they have parameters
//- remove weighted random gambit creation from director
//- fix up the .init and .update methods on gambitInterface so they work
  //with the new gambits.
//- fix up playerSummaryInterface init and update 
//- fix up scoring so that it reflects new variables involved
- design new gambit creation method
    - something around keeping a track of response chains
    - this is lower priority than getting responses/targeting working
- re-make the html interface as per new design
- re-write key-binding to reflect only two keys per player
//- simplify data structures
    //- only one pointer connecting gambitInterface with constructedGambit.
    //- every constructedGambit should have a unique id
    //- every .gambit div should have a reference to it as .data()
- design new emotional gambits/modifiers 

//- fix responses
- add targeting
- add intro screen showing YOU ARE: X
- add outro screen showing winners
    

    