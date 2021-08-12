//create a new pattern
let buttonColors = ["red", "blue", "green", "yellow"]; 
let gamePattern = []; 
let userClickedPattern = []; 

//each time player hits keyboard
$("body").keydown(function() {
    gamePattern.push(nextSequence()); // new color into gamePattern
    
    //show sequence to user 
    let sequenceButton = $("#" + gamePattern[gamePattern.length -1]);
    sequenceButton.fadeOut(100).fadeIn(100);
    playSound(sequenceButton.attr("id"));
});

//detect user clicks, store color of button triggered & play corresponding sound 
$(".btn").click(function() {
    let userChosenColor = $(this).attr("id"); 
    userClickedPattern.push(userChosenColor); 
    playSound(userChosenColor)
});

/**
 * generate a random number between 0 & 3
 * @returns a color randomly choosen 
 */
function nextSequence() {
    let randomNumber = Math.floor(Math.random() * 4); 
    return buttonColors[randomNumber]; 
}

/**
 * play sound corresponding to idSound param
 * @param {*string} idSound 
 */
function playSound(idSound) {
    console.log("id value --> " + idSound);
    switch(idSound) {
        case "blue" : new Audio("sounds/blue.mp3").play(); break;
        case "green" : new Audio("sounds/green.mp3").play(); break;    
        case "red" : new Audio("sounds/red.mp3").play(); break;    
        case "yellow" : new Audio("sounds/yellow.mp3").play(); break;  
        case "wrong" : new Audio("sounds/wrong.mp3").play(); break;      
        default : console.log("Error : idSound received = " + idSound); 
    }
}
