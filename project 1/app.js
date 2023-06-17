const squares = document.querySelectorAll(".square");
const mole = document.querySelector(".mole");
const timeLeft = document.querySelector("#time-left");
const score = document.querySelector("#score");

let result = 0;
let hitPosition;
let currentTime = 60;
let timerId = null;
let countDownTimerId = null;

randomSquare = () => {
  squares.forEach((square) => {
    square.removeEventListener("mousedown", removeMoleClass);
    square.classList.remove("mole");
  });

  let randomSquareIndex = Math.floor(Math.random() * 9);
  let randomSquare = squares[randomSquareIndex];
  randomSquare.classList.add("mole");
  randomSquare.addEventListener("mousedown", (event) =>
    removeMoleClass(event.target)
  );

  hitPosition = randomSquare.id;
};

removeMoleClass = (clickedSquare) => {
  if (clickedSquare.id == hitPosition) {
    result++;
    score.textContent = result;
    hitPosition = null;
  }
};

moveMole = () => {
  timerId = setInterval(randomSquare, 5000);
  if (currentTime === 0) {
    clearInterval(timerId);
    return;
  }

  randomSquare();
};

countDown = () => {
  currentTime--;
  timeLeft.textContent = currentTime;

  if (currentTime <= 10) {
    timeLeft.style.color = "red";
  } else if (currentTime <= 20) {
    timeLeft.style.color = "yellow";
  } else if (currentTime <= 30) {
    timeLeft.style.color = "green";
  }

  if (currentTime === 0) {
    clearInterval(countDownTimerId);
    clearInterval(timerId);
    endGame();
  }
};

startGame = () => {
  if (timerId) {
    clearInterval(timerId);
  }

  timerId = setInterval(moveMole, 1000);
  countDownTimerId = setInterval(countDown, 1000);
  currentTime = 60;
  result = 0;
  score.textContent = result;
  timeLeft.textContent = currentTime;
  timeLeft.style.color = "white";
};

resetGame = () => {
  clearInterval(countDownTimerId);
  clearInterval(timerId);
  currentTime = 60;
  result = 0;
  score.textContent = result;
  timeLeft.textContent = currentTime;
  timeLeft.style.color = "white";
};

endGame = () => {
  alert("GAME OVER! Your final score is " + result);
  clearInterval(countDownTimerId);
  clearInterval(timerId);
  resetGame();
};

// Event listeners
startbtn.addEventListener("click", startGame);
resetbtn.addEventListener("click", resetGame);

// Initial game setup
resetGame();

// Add event listeners to squares after defining removeMoleClass
squares.forEach((square) => {
  square.addEventListener("mousedown", (event) =>
    removeMoleClass(event.target)
  );
});
