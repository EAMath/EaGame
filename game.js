var buttonColours = ["red", "blue", "green", "yellow"]

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

//For Start Key
$(".Playbtn").click(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }

});

//For Button Clic
$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});


//CheckAnswer
function checkAnswer(currentLevel) {

  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

    console.log("success");

    //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
    if (userClickedPattern.length === gamePattern.length) {

      //5. Call nextSequence() after a 1000 millisecond delay.
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    var wrongAnswerAudio = new Audio("sounds/wrong.mp3");
    wrongAnswerAudio.play();
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Score: " + level);
    startOver();
    console.log("wrong");

    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 1000);
  }
}

//Next Level
function nextSequence() {

  userClickedPattern = [];

  level++;

  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4)
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);
}

//Play Sound And Animation
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

//Play Sound And Animation
function animatePress(currentColour) {

  $("#" + currentColour).addClass("pressed" + currentColour);

  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed" + currentColour);
  }, 100);
}

function startOver(){
level = 0;
gamePattern = [];
started = false;
}
