//create a new pattern
let buttonColors = ["red", "blue", "green", "yellow"]; 
let isNotStarted = true; 
let gamePattern = []; 
let userClickedPattern = []; 
let level = 0; 
let sequenceChecked = 0; 

//each time player hits keyboard
$("body").keydown(function() {
    if(isNotStarted) {
        isNotStarted = false; 
        nextSequence();
    }
});

//store color of triggered button, play corresponding sound & animate it
//also call a check answer function to see if user succeed or failed and determine the next step of the game
$(".btn").click(function() {
    let userChosenColor = $(this).attr("id"); 
    userClickedPattern.push(userChosenColor); 
    animatePressedButton(userChosenColor);
    playSound(userChosenColor);

    //check user's answer and determine what to do next 
    checkAnswerAndUpdateGameState(level); 
});

/**
 * + update level and display it
 * + generate a random number between 0 & 3 & push corresponding color into game pattern array
 * + show next sequence to user (flash animation + play sound)
 */
function nextSequence() {
    level++;
    $("h1").text("Level " + level);

    let randomNumber = Math.floor(Math.random() * 4); 
    gamePattern.push(buttonColors[randomNumber]); 

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
 * Control user answer and choose the next step of the game depending on :
 * + the thuth (or not) of user answer
 * + the current sequence checked
 * @param {int} currentLevel
 */
function checkAnswerAndUpdateGameState(currentLevel) { 
    //if user answer is different to game pattern for the sequence checked -> game over, else -> update sequenceChecked to control the next sequence   
    gamePattern[sequenceChecked] === userClickedPattern[sequenceChecked] ? sequenceChecked++ : displayGameOver(); 

    //if all user click's pattern is valid -> start new sequence + reset control values
    if(sequenceChecked === currentLevel) {
        setTimeout(
            function() {
                nextSequence();
                userClickedPattern.length = 0; 
                sequenceChecked = 0; 
            },
            1000
        );
    }
}

/**
 * play sound corresponding to idSound param
 * @param {*string} idSound 
 */
function playSound(idSound) {
    switch(idSound) {
        case "blue" : new Audio("sounds/blue.mp3").play(); break;
        case "green" : new Audio("sounds/green.mp3").play(); break;    
        case "red" : new Audio("sounds/red.mp3").play(); break;    
        case "yellow" : new Audio("sounds/yellow.mp3").play(); break;  
        case "wrong" : new Audio("sounds/wrong.mp3").play(); break;      
        default : console.log("Error : idSound received = " + idSound); 
    }
}

/**
 * play wrong sound and launch gameOver animation
 * also update title 
 */
function displayGameOver() {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(
        function() {
            $("body").removeClass("game-over");
        },
        100
    );
    $("h1").text("Game over, Press any key to restart the game");
}
