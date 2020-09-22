var valueBox = document.querySelectorAll(".value_box");
var layout = document.querySelector(".layout");
var hint = document.querySelector(".one-time__hint");
var warning = document.querySelector(".one-time__warning");
var info = document.querySelector(".result");
var player1 = document.querySelector("#player1");
var player2 = document.querySelector("#player2");
var reset = document.querySelector(".clear");

var inputs;
var value = "X";
var win;

const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const boxes = Array.from(valueBox);

function init() {

    inputs = [
        "", "", "",
        "", "", "",
        "", "", ""
    ];

    // hint and warning for first time
    hint.textContent = "click the green button to play";
    warning.textContent = "don't click the button twice";

    render();
}

function render() {
    inputs.forEach(function (mark, index) {
        boxes[index].textContent = mark;
    });
    
    // display whose turn
    if(value === "X"){
       player1.textContent = displayInfo("player1");
       player2.textContent = "";
    } else {
       player2.textContent = displayInfo("player2");
       player1.textContent = "";
    }
   
}

function displayInfo(player){
    return win === "Tie" ? "That's a tie" :
        win ? win + " wins the game":
        "It's" + " " + player + "'s "+ "turn";
}
function handleTurn(event) {
    // clear the hint and warning
    hint.textContent = "";
    warning.textContent = "";
    var idx = boxes.findIndex(function (box) {
        return box === event.target;
    });

    inputs[idx] = value;

    win = getWinner();
    value = value === "X" ? "0" : "X";

    render();
}

function getWinner() {
    let winner = null;
    winningCombos.forEach(function (combo, index) {
        if (inputs[combo[0]] && inputs[combo[0]] === inputs[combo[1]] && inputs[combo[0]] === inputs[combo[2]]) {
            winner = inputs[combo[0]];
        }
    });
    
    return winner ? winner : inputs.includes('') ? null : "Tie";
}
// initialise the game
init();

// change content with event ocurred
layout.addEventListener("click", handleTurn);

// win logic
win = inputs[0] && inputs[0] === inputs[1] && inputs[0] === inputs[2] ? inputs[0] : null;

// reset the layout
reset.addEventListener("click", init);