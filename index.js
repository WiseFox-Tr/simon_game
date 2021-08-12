//create a new pattern
let buttonColors = ["red", "blue", "green", "yellow"]; 
let gamePattern = []; 
let userClickedPattern = []; 
let isNotStarted = true; 
let level = 0; 

//each time player hits keyboard
$("body").keydown(function() {
    if(isNotStarted) {
        isNotStarted = !isNotStarted; 
        nextSequence();
    }
});

//detect user clicks, store color of triggered button & play corresponding sound + animate it
$(".btn").click(function() {
    let userChosenColor = $(this).attr("id"); 
    userClickedPattern.push(userChosenColor); 
    animatePressedButton(userChosenColor);
    playSound(userChosenColor);
});

/**
 * 1- update level and display it
 * 
 * 2- generate a random number between 0 & 3 & push color into game pattern
 * 
 * 3 - show sequence to user (flash animation + play sound)
 */
function nextSequence() {
    //1
    level++;
    $("h1").text("Level " + level);
    //2
    let randomNumber = Math.floor(Math.random() * 4); 
    gamePattern.push(buttonColors[randomNumber]); 
    //3
    let sequenceButton = $("#" + gamePattern[gamePattern.length -1]);
    sequenceButton.fadeOut(100).fadeIn(100);
    playSound(sequenceButton.attr("id"));
}

/**
 * Animate pressed button by adding & removing a class stylised in css
 * @param {*string} btnId 
 */
 function animatePressedButton(btnId) {
    $("#" + btnId).addClass("pressed");
    setTimeout(
        function() {
            $("#" + btnId).removeClass("pressed");
        },
        100
    );
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
