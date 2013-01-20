///////////////////////////////*
/// Player Character Object ///*
///////////////////////////////*

function playerCharacter(){
    this.name = pcName;
    this.img = pcImg;
    this.portrait = pcPortrait;
    this.traits = pcTraitsArray;
    this.bio = pcBio;
}

//set up PC's and push them into global array
playerCharacters.push(new playerCharacter(
    this.pcName = "",
    this.pcImg = "",
    this.pcPortrait = "",
    this.pcTraitsArray = [],
    this.bio = ""
));