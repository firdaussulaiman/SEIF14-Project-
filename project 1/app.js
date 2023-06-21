const squares = document.querySelectorAll(".square"); //select all the squares
const timeLeft = document.querySelector("#time-left"); //select the time left
const score = document.querySelector("#score"); //select the score
const startbtn = document.getElementById("startbtn");

let result = 0; //set the initial score to 0
let hitPosition; //set the initial hit position to null
let currentTime = 60; //set the initial time left to 60 seconds
let timerId = null; //set the initial timer id to null
let countDownTimerId = null; //set the initial countdown timer id to null
let moleIntervalIds = []; //array to store the mole interval IDs

startGame = () => {
  //function to start the game
  if (timerId) {
    //if timer id is not null, clear the timer id
    clearInterval(timerId); //clear the timer id
  }

  countDownTimerId = setInterval(countDown, 1000); //set the countdown timer id to the countDown function
  currentTime = 60; //set the initial time left to 60 seconds
  result = 0; //set the initial score to 0
  score.textContent = result; //set the score to 0
  timeLeft.textContent = currentTime; //set the time left to 60 seconds
  timeLeft.style.color = "white"; //set the time left color to white

  startMoleMovement(); //start moving the mole

  // Remove the mole class and event listener from all squares initially
  squares.forEach((square) => {
    square.removeEventListener("mousedown", removeMoleClass);
    square.classList.remove("mole");
  });

  hitPosition = null; //set the hit position to null
};

randomSquare = () => {
  //function to generate random square
  squares.forEach((square) => {
    //for each square, remove the mole class and event listener
    square.removeEventListener("mousedown", removeMoleClass); //remove the event listener
    square.classList.remove("mole"); //remove the mole class
  });

  let randomSquareIndex = Math.floor(Math.random() * 9); //generate random number from 0 to 8 (9 squares)
  let randomSquare = squares[randomSquareIndex]; //select the random square from the squares array
  randomSquare.classList.add("mole"); //add the mole class to the random square selected
  randomSquare.addEventListener(
    "mousedown",
    (
      event //add the event listener to the random square to remove the mole class
    ) => removeMoleClass(event.target) //remove the mole class
  );

  hitPosition = randomSquare.id; //set the hit position to the random square id
};

// Function to remove mole class
const removeMoleClass = (clickedSquare) => {
  //function to remove the mole class
  if (clickedSquare.id == hitPosition) {
    //if the clicked square id is equal to the hit position
    result++; //increase the result by 1
    score.textContent = result; //set the score to the result
    hitPosition = null; //set the hit position to null
  }
};

startMoleMovement = () => {
  //function to start the mole movement
  moleIntervalIds.push(setInterval(randomSquare, 1000)); // push the interval ID to the moleIntervalIds array
};

countDown = () => {
  //function to count down the time left
  currentTime--; //decrease the current time by 1
  timeLeft.textContent = currentTime; //set the time left to the current time

  if (currentTime <= 10) {
    //if the current time is less than or equal to 10 seconds
    timeLeft.style.color = "red"; //set the time left color to red
  } else if (currentTime <= 20) {
    //if the current time is less than or equal to 20 seconds
    timeLeft.style.color = "yellow"; // set the time left color to yellow
  } else if (currentTime <= 30) {
    //if the current time is less than or equal to 30 seconds
    timeLeft.style.color = "green"; // set the time left color to green
  }

  if (currentTime === 0) {
    //if the current time is 0 seconds left
    clearInterval(countDownTimerId); //clear the countdown timer id
    clearInterval(timerId); //clear the timer id
    endGame(); //call the endGame function
  }
};

endGame = () => {
  // Remove the mole class and event listener from all squares
  squares.forEach((square) => {
    square.removeEventListener("mousedown", removeMoleClass);
    square.classList.remove("mole");
  });

  alert("GAME OVER! Your final score is " + result);
  clearInterval(countDownTimerId);
  clearInterval(timerId);
  resetGame();

  // Clear all the mole interval IDs
  moleIntervalIds.forEach((intervalId) => {
    clearInterval(intervalId);
  });
  moleIntervalIds = []; // Clear the mole interval IDs array
};

resetGame = () => {
  //function to reset the game
  clearInterval(countDownTimerId); //clear the countdown timer id
  clearInterval(timerId); //clear the timer id
  currentTime = 60; //set the initial time left to 60 seconds
  result = 0; // set the initial score to 0
  score.textContent = result; // set the score to 0
  timeLeft.textContent = currentTime; //set the time left to 60 seconds
  timeLeft.style.color = "white"; //set the time left color to white
};

// Event listeners
startbtn.addEventListener("click", startGame);

// Initial game setup
resetGame(); //rename to startGame or something?

// Add event listeners to squares after defining removeMoleClass
squares.forEach((square) => {
  square.addEventListener("mousedown", (event) =>
    removeMoleClass(event.target)
  );
});
