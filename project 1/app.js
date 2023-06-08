const squares = document.querySelectorAll(".square");
const mole = document.querySelector(".mole");
const timeLeft = document.querySelector("#time-left");
const score = document.querySelector("#score");

let result = 0;
let hitPosition;
let currentTime = 60;
let timerId = null;

function randomSquare() {
  //function that removes the mole class from all the squares and then adds the mole class to a random square
  squares.forEach((square) => {
    //forEach is a function that loops through all the squares
    square.classList.remove("mole"); //removes the mole class from all the squares
  });

  let randomSquare = squares[Math.floor(Math.random() * 9)]; //random square is a variable that is assigned to a random square   Math.floor(Math.random() * 9) is a function that generates a random number between 0 and 8
  randomSquare.classList.add("mole"); //adds the mole class to the random square

  hitPosition = randomSquare.id; //assigns the id of the random square to the hitPosition variable
}
squares.forEach((square) => {
  //forEach is a function that loops through all the squares
  square.addEventListener("mousedown", () => {
    if (square.id == hitPosition) {
      result++;
      score.textContent = result;
      hitPosition = null;
    }
  });
});

//function on start button
startbtn.addEventListener("click", () => {
  if (timerId) {
    clearInterval(timerId);
  }

  timerId = setInterval(moveMole, 1000);
  countDownTimerId = setInterval(countDown, 1000);
  currentTime = 60;
  result = 0;
  score.textContent = result;
  timeLeft.textContent = currentTime;
});

function moveMole() {
  //function that moves the mole around the board
  timerId = setInterval(randomSquare, 5000);
}

moveMole();

function countDown() {
  currentTime--;
  timeLeft.textContent = currentTime;

  if (currentTime == 0) {
  } else if (currentTime <= 10) {
    timeLeft.style.color = "red";
  } else if (currentTime <= 20) {
    timeLeft.style.color = "yellow";
  } else if (currentTime <= 30) {
    timeLeft.style.color = "green";
  } else if (currentTime == 0) {
    clearInterval(countDownTimerId);
    clearInterval(timerId);
    //reset the timing
    currentTime = 60;
    alert("GAME OVER! Your final score is " + result);
  }
}

let countDownTimerId = setInterval(countDown, 1000);