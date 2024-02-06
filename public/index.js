const cards = document.querySelectorAll(".card");

let currentCard;
let checkCard;
let firstCard;
let guessed;

for (let i = 0; i < cards.length; i++) {
  const card = cards[i];
  card.innerHTML = i;
  card.addEventListener("click", (event) => {
    if (!firstCard) {
      currentCard = i;
      getCardFirst(i);
      firstCard = true;
    } else {
      checkCard = i;
      if (getCardSecond(currentCard, checkCard, card)) {
      }

      firstCard = false;
    }
    card.classList.add("clicked");
    setTimeout(() => card.classList.remove("clicked"), 300);
  });
}

document.getElementById("startGame").addEventListener("click", startGame);

function startGame() {
  const apiUrl = "http://localhost:8080/game";
  const data = {};

  const axiosOptions = {
    method: "POST",
    url: apiUrl,
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify(data),
  };

  axios(axiosOptions)
    .then((response) => {
      console.log("Response:", response.data);
      removeBlockClass();
    })
    .catch((error) => {
      if (error.response && error.response.status === 403) {
        console.log("Já descobriste essa carta");
      } else {
        console.error("Erro na requisição:", error.message);
      }
    });
}

function removeBlockClass() {
  for (let i = 0; i < cards.length; i++) {
    const card = cards[i];
    setTimeout(() => card.classList.remove("block"), 0);
  }
}

function getCardFirst(firstCardReveal) {
  const apiUrl = "http://localhost:8080/game/";
  const data = { indexOfCard: firstCardReveal };

  const axiosOptions = {
    method: "GET",
    url: apiUrl + firstCardReveal,
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify(data),
  };
  axios(axiosOptions)
    .then((response) => {
      console.log("Response:", response.data);
    })
    .catch((error) => {
      if (error.response && error.response.status === 403) {
        console.log("Já descobriste essa carta");
      } else {
        console.error("Erro na requisição:", error.message);
      }
    });
}

function getCardSecond(secondCardRevealed, firstCardRevealed, card) {
  const apiUrl = "http://localhost:8080/game/";
  const data = {
    indexOfCard: firstCardRevealed,
    valueOfCurrCard: secondCardRevealed,
  };

  const axiosOptions = {
    method: "GET",
    url: apiUrl + firstCardRevealed + "/" + secondCardRevealed,
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify(data),
  };
  axios(axiosOptions)
    .then((response) => {
      console.log("Response:", response.data);
      if (response.data == true) {
        guessed = true;
        console.log("nice");
        blockCard(cards[secondCardRevealed]);
        blockCard(cards[firstCardRevealed]);
      } else {
        guessed = false;
        console.log("nop, lol..");
      }
    })
    .catch((error) => {
      if (error.response && error.response.status === 403) {
        console.log("Já descobriste essa carta");
      } else {
        console.error("Erro na requisição:", error.message);
      }
    });
}

function blockCard(card) {
  card.classList.add("block");
}
