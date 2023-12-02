const game = {
  players: [
    {
      symbol: "x",
      turn: true,
      score: 0,
    },
    {
      symbol: "o",
      turn: false,
      score: 0,
    },
  ],

  init: function () {
    this.cacheDOM();
    this.clickField();
    this.render();
    this.restart();
  },

  render: function () {
    this.displayScorePlayerX.innerText = this.players[0].score;
    this.displayScorePlayerO.innerText = this.players[1].score;
  },
  cacheDOM: function () {
    this.displayScorePlayerX = document.querySelector(".scorePlayerX > span");
    this.displayScorePlayerO = document.querySelector(".scorePlayerO > span");
    this.endScreen = document.querySelector(".gameOver");
    this.endScreenButton = document.querySelector(".gameOver > button");
  },
  clickField: function () {
    gameboard.allFields.forEach((element) => {
      element.addEventListener("click", (e) => {
        // variables for symbol and postion

        if (element.innerText == "") {
          let playerTurn = this.players.filter((element) => {
            return element.turn;
          })[0];

          let playerNotTurn = this.players.filter((element) => {
            return !element.turn;
          })[0];

          let symbol = playerTurn.symbol;
          let p1;
          let p2;

          //turning elements into coordinates

          if (gameboard.allFields.indexOf(element) == 0) {
            p1 = [0];
            p2 = [0];
          }
          if (gameboard.allFields.indexOf(element) == 1) {
            p1 = [0];
            p2 = [1];
          }
          if (gameboard.allFields.indexOf(element) == 2) {
            p1 = [0];
            p2 = [2];
          }
          if (gameboard.allFields.indexOf(element) == 3) {
            p1 = [1];
            p2 = [0];
          }
          if (gameboard.allFields.indexOf(element) == 4) {
            p1 = [1];
            p2 = [1];
          }
          if (gameboard.allFields.indexOf(element) == 5) {
            p1 = [1];
            p2 = [2];
          }
          if (gameboard.allFields.indexOf(element) == 6) {
            p1 = [2];
            p2 = [0];
          }
          if (gameboard.allFields.indexOf(element) == 7) {
            p1 = [2];
            p2 = [1];
          }
          if (gameboard.allFields.indexOf(element) == 8) {
            p1 = [2];
            p2 = [2];
          }

          //sending data to gameboard module

          gameboard.paintField(p1, p2, symbol);

          playerNotTurn.turn = true;
          playerTurn.turn = false;
        }
      });
    });
  },

  score: function (symbol) {
    let playerO = this.players[1];
    let playerX = this.players[0];

    if (playerO.score < 3 || playerX.score < 3) {
      if (symbol === "o") {
        playerO.score++;
        gameboard.reset();
        this.render();
      }
      if (symbol === "x") {
        playerX.score++;
        gameboard.reset();
        this.render();
      }
    }
    if (playerO.score >= 3 || playerX.score >= 3) {
      game.gameOver();
    }
  },
  gameOver: function () {
    this.endScreen.style.display = "flex";
  },
  restart: function () {
    this.endScreenButton.addEventListener("click", () => {
      this.endScreen.style.display = "none";
      this.players.forEach((element) => {
        element.score = 0;
      });
      gameboard.reset();
      this.render();
    });
  },
};

const gameboard = {
  gameboard: [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ],
  init: function () {
    this.cacheDOM();
    this.render();
  },

  cacheDOM: function () {
    let allFields = document.querySelectorAll(".gameField");
    allFields = Array.from(allFields);
    this.allFields = allFields;
  },

  render: function () {
    this.allFields[0].innerText = this.gameboard[0][0];
    this.allFields[1].innerText = this.gameboard[0][1];
    this.allFields[2].innerText = this.gameboard[0][2];

    this.allFields[3].innerText = this.gameboard[1][0];
    this.allFields[4].innerText = this.gameboard[1][1];
    this.allFields[5].innerText = this.gameboard[1][2];

    this.allFields[6].innerText = this.gameboard[2][0];
    this.allFields[7].innerText = this.gameboard[2][1];
    this.allFields[8].innerText = this.gameboard[2][2];

    this.gameEval(this.gameboard);
    this.checkForDraw(this.gameboard);
  },

  paintField: function (p1, p2, symbol) {
    this.gameboard[p1][p2] = symbol;

    this.render();
  },

  gameEval: function (field) {
    //vertcial win lines x

    if (field[0][0] === "x" && field[0][1] === "x" && field[0][2] === "x") {
      game.score("x");
    }
    if (field[1][0] === "x" && field[1][1] === "x" && field[1][2] === "x") {
      game.score("x");
    }
    if (field[2][0] === "x" && field[2][1] === "x" && field[2][2] === "x") {
      game.score("x");
    }

    //vertical win lines o

    if (field[0][0] === "o" && field[0][1] === "o" && field[0][2] === "o") {
      game.score("o");
    }
    if (field[1][0] === "o" && field[1][1] === "o" && field[1][2] === "o") {
      game.score("o");
    }
    if (field[2][0] === "o" && field[2][1] === "o" && field[2][2] === "o") {
      game.score("o");
    }

    // horizontal win lines x

    if (field[0][0] === "x" && field[1][0] === "x" && field[2][0] === "x") {
      game.score("x");
    }
    if (field[0][1] === "x" && field[1][1] === "x" && field[2][1] === "x") {
      game.score("x");
    }
    if (field[0][2] === "x" && field[1][2] === "x" && field[2][2] === "x") {
      game.score("x");
    }

    //horizontal win lines o

    if (field[0][0] === "o" && field[1][0] === "o" && field[2][0] === "o") {
      game.score("o");
    }
    if (field[0][1] === "o" && field[1][1] === "o" && field[2][1] === "o") {
      game.score("o");
    }
    if (field[0][2] === "o" && field[1][2] === "o" && field[2][2] === "o") {
      game.score("o");
    }

    //diagonally win lines x

    if (field[0][0] === "x" && field[1][1] === "x" && field[2][2] === "x") {
      game.score("x");
    }
    if (field[0][2] === "x" && field[1][1] === "x" && field[2][0] === "x") {
      game.score("x");
    }

    //diagonally win lines for o

    if (field[0][0] === "o" && field[1][1] === "o" && field[2][2] === "o") {
      game.score("o");
    }
    if (field[0][2] === "o" && field[1][1] === "o" && field[2][0] === "o") {
      game.score("o");
    }
  },
  checkForDraw: function (field) {
    let v1 = false;
    let v2 = false;
    let v3 = false;
    let h1 = false;
    let h2 = false;
    let h3 = false;
    let d1 = false;
    let d2 = false;

    let h1Array = [...field[0][0], field[1][0], field[2][0]];
    let h2Array = [...field[0][1], field[1][1], field[2][1]];
    let h3Array = [...field[0][2], field[1][2], field[2][2]];
    let d1Array = [...field[0][2], field[1][1], field[2][0]];
    let d2Array = [...field[0][0], field[1][1], field[2][2]];

    if (field[0].indexOf("x") >= 0 && field[0].indexOf("o") >= 0) {
      v1 = true;
    } else {
      v1 = false;
    }
    if (field[1].indexOf("x") >= 0 && field[1].indexOf("o") >= 0) {
      v2 = true;
    } else {
      v2 = false;
    }
    if (field[2].indexOf("x") >= 0 && field[2].indexOf("o") >= 0) {
      v3 = true;
    } else {
      v3 = false;
    }
    if (h1Array.indexOf("x") >= 0 && h1Array.indexOf("o") >= 0) {
      h1 = true;
    } else {
      h1 = false;
    }
    if (h2Array.indexOf("x") >= 0 && h2Array.indexOf("o") >= 0) {
      h2 = true;
    } else {
      h2 = false;
    }
    if (h3Array.indexOf("x") >= 0 && h3Array.indexOf("o") >= 0) {
      h3 = true;
    } else {
      h3 = false;
    }

    if (d1Array.indexOf("x") >= 0 && d1Array.indexOf("o") >= 0) {
      d1 = true;
    } else {
      d1 = false;
    }
    if (d2Array.indexOf("x") >= 0 && d2Array.indexOf("o") >= 0) {
      d2 = true;
    } else {
      d2 = false;
    }

    if (v1 && v2 && v3 && h1 && h2 && h3 && d1 && d2) {
      this.reset();
    }
  },
  reset: function () {
    this.gameboard = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ];

    this.render();
  },
};

gameboard.init();
game.init();
