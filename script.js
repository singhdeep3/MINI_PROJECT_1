const boxes = document.querySelectorAll(".box");
const game_info = document.querySelector(".game_info");
const button = document.querySelector(".btn");
const again = document.querySelector(".again");
const wrapper = document.querySelector(".wrapper");

let current_player;
let grid_count;

const winning_pos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const tournament = document.querySelector(".tournament");
const winner = document.querySelector(".winner");
const tic_tac_toe = document.querySelector(".tic_tac_toe");
let x = 0;
let O = 0;
const player_X = document.querySelector(".count_x");
const player_O = document.querySelector(".count_0");

function let_start() {
  current_player = "X";
  grid_count = ["", "", "", "", "", "", "", "", ""];
  boxes.forEach((box, index) => {
    box.innerHTML = "";
    boxes[index].style.pointerEvents = "all";
    box.classList.remove("win");
  });
  button.classList.remove("active");
  tournament.classList.remove("active");
  winner.classList.remove("active");
  tic_tac_toe.classList.remove("disappear");

  // again.classList.add("active");

  game_info.innerText = `Current Player - ${current_player}`;
}

let_start();

function swapTurn() {
  if (current_player === "X") {
    current_player = "0";
  } else {
    current_player = "X";
    game_info.innerText = `Current Player - ${current_player}`;
  }
}

function checkGameOver() {
  let answer = "";
  winning_pos.forEach((position) => {
    if (
      (grid_count[position[0]] !== "" ||
        grid_count[position[1]] !== "" ||
        grid_count[position[2]] !== "") &&
      grid_count[position[0]] === grid_count[position[1]] &&
      grid_count[position[1]] === grid_count[position[2]]
    ) {
      if (grid_count[position[0]] === "X") {
        answer = "X";
        x++;
        player_X.innerText = `${x}`;
      } else {
        answer = "0";
        O++;
        player_O.innerText = `${O}`;
      }

      boxes.forEach((box) => {
        box.style.pointerEvents = "none";
      });

      boxes[position[0]].classList.add("win");
      boxes[position[1]].classList.add("win");
      boxes[position[2]].classList.add("win");
    }
  });

  if (answer !== "") {
    game_info.innerText = `Winner Player - ${answer}`;
    again.classList.remove("active");
    button.classList.add("active");
  }

  let fillCount = 0;
  grid_count.forEach((box) => {
    if (box != "") {
      fillCount++;
    }
  });

  if (fillCount === 9) {
    grid_count.innerText = "Game Tie!";
    // button.classList.add("active");
  }
  return;
}

function handleClick(index) {
  if (grid_count[index] == "") {
    boxes[index].innerHTML = current_player;
    grid_count[index] = current_player;
    boxes[index].style.pointerEvents = "none";
    again.classList.add("active");
    swapTurn();
    checkGameOver();
  }
}

boxes.forEach((box, index) => {
  box.addEventListener("click", () => {
    handleClick(index);
  });
});

const matchBtn = document.querySelector(".matchBtn");
const numberOfRounds = document.querySelector("#rounds");
const start_mtc_Btn = document.querySelector(".start_match");
const match_count = document.querySelector(".match_count");

matchBtn.addEventListener("click", () => {
  tic_tac_toe.classList.add("disappear");
  tournament.classList.add("active");
  wrapper.style.backgroundColor = "rgba(255, 255, 255, 0.45)";
});

var num = 0;
start_mtc_Btn.addEventListener("click", () => {
  tournament.classList.remove("active");
  tic_tac_toe.classList.remove("disappear");
  wrapper.style.backgroundColor = "rgba(2, 2, 14, 0.87)";

  if (numberOfRounds.value > 0 && numberOfRounds.value <= 12000) {
    num = numberOfRounds.value;
    match_count.classList.add("active");
    match_count.innerText = num;
    // let_start();
  } else {
    alert("Bakchodi matt kr lode");
  }
});

button.addEventListener("click", () => {
  let_start();
  if (num) {
    num--;
    match_count.innerText = num;
    console.log(x);
    console.log(O);
    if (num == 0) {
      console.log(x > O);
      if (x > O) {
        winner_x(x);
        return;
      }
      if (O > x) {
        winner_O(O);
      } else {
        tie();
      }
    }
  }
});

again.addEventListener("click", let_start);
const desc = document.querySelector(".desc");
function winner_x(x) {
  tic_tac_toe.classList.add("disappear");
  winner.classList.add("active");
  desc.innerText = `Winner is X with ${x}`;
  button.classList.add("active");
  x = 0;
  O = 0;
  player_X.innerText = "";
  player_O.innerText = "";
}

function winner_O(O) {
  tic_tac_toe.classList.add("disappear");
  winner.classList.add("active");
  desc.innerText = `Winner is O with ${O}`;
  button.classList.add("active");
  x = 0;
  O = 0;
  player_X.innerText = "";
  player_O.innerText = "";
}

function tie() {
  tic_tac_toe.classList.add("disappear");
  winner.classList.add("active");
  desc.innerText = `Tie Tie Tie!`;
  button.classList.add("active");
  x = 0;
  O = 0;
  player_X.innerText = "";
  player_O.innerText = "";
}
