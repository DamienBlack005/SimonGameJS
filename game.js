gamePattern = [];
userClickedPattern = [];
buttonColors = ["red", "blue", "green", "yellow"];

// Detect Mouse-click

$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  // console.log(userClickedPattern);

  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

// Detect Keypress

var started = false;
// setting a default bool value to check if the game has started.
var level = 0;

$(document).keypress(function() {
  if (started === false) {
    // condition can also be set as (!started) which is equal to the condition started === false.

    $("#level-title").text("Level" + level);
    nextSequence();

    started = true;
  } else {
    alert("the game has already started.");
  }
});

function nextSequence() {

  userClickedPattern = [];

  level++; // whenever nextSequence is called the level is also to be incremented.

  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);

  var randomChosenColor = buttonColors[randomNumber];

  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  // Using jQuery to select the button with the same id as the randomChosenColour...

  playSound(randomChosenColor);
  animatePress(randomChosenColor);

}

function playSound(name) {
  var sound = new Audio("sounds/" + name + ".mp3");
  sound.play();
}

function animatePress(currentColor) {
  var animeButton = $("#" + currentColor);
  $(animeButton).addClass("pressed");

  setTimeout(function() {
    $(animeButton).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("success");
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("#level-title").text("Game Over, Press Any Key to Restart");
    $("body").addClass("game-over");

    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    startOver();
    // console.log("wrong");
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
