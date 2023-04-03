const buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var hasGameStarted = false;
var level = 0;

/**
 * This event handles a click on one of the button.
 */
$(".btn").click(function (event) {
  var userChosenColor = event.target.id;
  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);

  if (checkAnswer()) {
    if (userClickedPattern.length == level) {
      setTimeout(function () {
        nextSequence();
        userClickedPattern = [];
      }, 1000);
    }
  } else {
    $("body").addClass("game-over");
    playSound("wrong");
    setTimeout(function () {
      $("body").removeClass("game-over");
      $("h1").text(
        "Game Over!\n \n You made it to Level " +
          level +
          "\n \n Press Any Key to Restart"
      );
      startOver();
    }, 200);
  }
});

/**
 * This event handles a keypress that starts the game.
 */
document.addEventListener("keypress", function () {
  if (!hasGameStarted) {
    hasGameStarted = true;
    $("h1").text("Level " + level);
    nextSequence();
  }
});

/**
 * Progresses the sequence by increasing the level by one and picking the next color randomly.
 */
function nextSequence() {
  //increasing the level
  level++;
  $("h1").text("Level " + level);

  //picking the next color randomly
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColours[randomNumber];
  gamePattern.push(randomChosenColor);

  //animating and playing sound corresponding to the random color
  $("#" + randomChosenColor)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColor);
}

/**
 * Checks if the last input is correct.
 *
 * @returns true if last input was corecct, false otherwise
 */
function checkAnswer() {
  if (
    userClickedPattern[userClickedPattern.length - 1] ==
    gamePattern[userClickedPattern.length - 1]
  ) {
    return true;
  } else {
    return false;
  }
}

/**
 * Restarts the game.
 */
function startOver() {
  gamePattern = [];
  userClickedPattern = [];
  level = 0;
  hasGameStarted = false;
}

/**
 * Plays a sound from the sounds folder that fits the event.
 *
 * @param {*} name the sound that should be played
 */
function playSound(name) {
  var sound = new Audio("sounds/" + name + ".mp3");
  sound.play();
}

/**
 * Animates a button press by the user.
 *
 * @param {*} currentColor the color of button that was pressed
 */
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}
