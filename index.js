
let buttonColors = ["red", "blue", "green", "yellow"]; 
let randomChoosenColor = buttonColors[nextSequence()]; //select a random color
let gamePattern = []; //store sequence

gamePattern.push(randomChoosenColor);

function nextSequence() {
    return randomNumber = Math.floor(Math.random() * 4); // random nb between 0 & 3
}
