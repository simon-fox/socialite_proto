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
    this.pcName = "Mr Garrick",
    this.pcImg = "fullPortrait9.png",
    this.pcPortrait = "portrait9.png",
    this.pcTraitsArray = ["bitter", "determined", "boastful", "jealous"],
    this.pcBio = "Mr Garrick, playwrite, thespian, gourmande. Garrick never spends a moment alone if he can help it, for introspection looms behind him like a spectre."
));

playerCharacters.push(new playerCharacter(
    this.pcName = "Mrs Garrick",
    this.pcImg = "fullPortrait2.png",
    this.pcPortrait = "portrait2.png",
    this.pcTraitsArray = ["calm","docile","narcissistic","jealous"],
    this.pcBio = "Mrs Garrick"
));

playerCharacters.push(new playerCharacter(
    this.pcName = "Cardinal Wolsey",
    this.pcImg = "fullPortrait5.png",
    this.pcPortrait = "portrait5.png",
    this.pcTraitsArray = ["petulant","assured","salacious","replete"],
    this.pcBio = "Cardinal Wolsey"
));

playerCharacters.push(new playerCharacter(
    this.pcName = "Catherine Bastille",
    this.pcImg = "fullPortrait3.png",
    this.pcPortrait = "portrait3.png",
    this.pcTraitsArray = ["cranky","wanton","resolved","covetous"],
    this.pcBio = "Catherine Bastille"
));

playerCharacters.push(new playerCharacter(
    this.pcName = "Mr Gatsby",
    this.pcImg = "fullPortrait8.png",
    this.pcPortrait = "portrait8.png",
    this.pcTraitsArray = ["calm","assured","salacious","comfortable"],
    this.pcBio = "Mr Gatsby"
));

playerCharacters.push(new playerCharacter(
    this.pcName = "Lord Pomp",
    this.pcImg = "fullPortrait7.png",
    this.pcPortrait = "portrait7.png",
    this.pcTraitsArray = ["jealous","humble","docile","cranky"],
    this.pcBio = "Lord Pomp"
));

playerCharacters.push(new playerCharacter(
    this.pcName = "Lady Pomp",
    this.pcImg = "fullPortrait4.png",
    this.pcPortrait = "portrait4.png",
    this.pcTraitsArray = ["boastful","jealous","bitter","pliable"],
    this.pcBio = "Lady Pomp"
));

playerCharacters.push(new playerCharacter(
    this.pcName = "Charlotte Bronte",
    this.pcImg = "fullPortrait6.png",
    this.pcPortrait = "portrait6.png",
    this.pcTraitsArray = ["collected","determined","salacious","jealous"],
    this.pcBio = "Charlotte Bronte"
));