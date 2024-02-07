const cards = document.querySelectorAll(".card");

let firstCurrentCard;
let secondCurrentCard;
let firstCardClicked = false;

let firstCardValue;
let secondCardValue;

for (let i = 0; i < cards.length; i++) {
  const card = cards[i];
  card.addEventListener("click", (event) => {
    const iconElement = event.currentTarget.querySelector("i");

    if (!firstCardClicked) {
      firstCurrentCard = i;
      getCardFirst(firstCurrentCard, card, iconElement);
      firstCardClicked = true;
    } else {
      secondCurrentCard = i;
      getCardSecond(firstCurrentCard, secondCurrentCard, card, iconElement);
      firstCardClicked = false;
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
      console.log("start");
      removeBlockClass();

      return getAllCards();
    })
    .then((cardValuesArray) => {
      const cardsArrayOnlyValue = cardValuesArray;
      console.log("Array de valores das cartas:", cardsArrayOnlyValue);
    })
    .catch((error) => {
      if (error.response && error.response.status === 403) {
        console.log("Already discovered that card!");
      } else {
        console.error("Error:", error.message);
      }
    });
}

document.getElementById("restartGame").addEventListener("click", restartGame);

function restartGame() {
  const apiUrl = "http://localhost:8080/game/restart";
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
      console.log("restart");
      removeBlockClass();
      return getAllCards();
    })
    .then((cardValuesArray) => {
      const cardsArrayOnlyValue = cardValuesArray;
      console.log("Array de valores das cartas:", cardsArrayOnlyValue);
    })
    .catch((error) => {
      if (error.response && error.response.status === 403) {
        console.log("Already discovered that card!");
      } else {
        console.error("Error:", error.message);
      }
    });
}

function getAllCards() {
  const apiUrl = "http://localhost:8080/game";
  const data = {};

  const axiosOptions = {
    method: "GET",
    url: apiUrl,
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify(data),
  };
  return axios(axiosOptions)
    .then((response) => {
      const cardsArray = response.data;
      const cardValuesArray = [];

      for (let i = 0; i < cardsArray.length; i++) {
        const card = cardsArray[i];
        const cardValue = card.value;
        cardValuesArray.push(cardValue);
        console.log("Card Value:", cardValue);
      }
      location.reload();
      return cardValuesArray;
    })
    .catch((error) => {
      console.error("Error:", error.message);
    });
}

function removeBlockClass() {
  for (let i = 0; i < cards.length; i++) {
    const card = cards[i];
    setTimeout(() => card.classList.remove("block"), 0);
  }
}

function getCardFirst(firstCardReveal, card, iconElement) {
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
      console.log("Response:", response.data.value);
      firstCardValue = response.data.value;
      flipCard(card, firstCardValue, iconElement);
    })
    .catch((error) => {
      if (error.response && error.response.status === 403) {
        console.log("Already discovered that card!");
      } else {
        console.error("Error:", error.message);
      }
    });
}

function getCardSecond(firstCardReveal, secondCardReveal, card, iconElement) {
  const apiUrl = "http://localhost:8080/game/";
  const data = { indexOfCard: secondCardReveal };

  const axiosOptions = {
    method: "GET",
    url: apiUrl + secondCardReveal,
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify(data),
  };
  axios(axiosOptions)
    .then((response) => {
      console.log("Response:", response.data.value);
      secondCardValue = response.data.value;
      flipCard(card, secondCardValue, iconElement);
      checkIfCardsAreEqualOrNot(
        firstCardReveal,
        secondCardReveal,
        firstCardValue,
        secondCardValue,
        iconElement
      );
    })
    .catch((error) => {
      if (error.response && error.response.status === 403) {
        console.log("Already discovered that card!");
      } else {
        console.error("Error:", error.message);
      }
    });
}

function checkIfCardsAreEqualOrNot(
  firstCardRevealed,
  secondCardRevealed,
  firstCardValue,
  secondCardValue,
  iconElement
) {
  console.log("checking..");
  console.log(firstCardValue);
  console.log(secondCardValue);
  if (firstCardValue == secondCardValue) {
    firstCardValue = null;
    secondCardValue = null;
    firstCurrentCard = null;
    secondCurrentCard = null;
    guessed = true;
    console.log("nice");
    blockCard(cards[secondCardRevealed]);
    blockCard(cards[firstCardRevealed]);
  } else {
    firstCardValue = null;
    secondCardValue = null;
    firstCurrentCard = null;
    secondCurrentCard = null;
    guessed = false;
    console.log("nop, lol..");
    firstCard = false;
    setTimeout(() => {
      reverseFlipCard(cards[firstCardRevealed], iconElement);
      reverseFlipCard(cards[secondCardRevealed], iconElement);
    }, 1000);
  }
}

function flipCard(card, cardValue, iconElement) {
  card.classList.add("flip");
  card.innerHTML = "";
  const contentElement = document.createElement("div");
  contentElement.classList.add("card-content");
  contentElement.innerHTML = cardValue;
  card.appendChild(contentElement);
}

function reverseFlipCard(card, iconElement) {
  card.classList.remove("flip");

  iconElement.classList.add("fa", "fa-question");

  card.innerHTML = iconElement.outerHTML;
}

function blockCard(card) {
  card.classList.add("block");
}
