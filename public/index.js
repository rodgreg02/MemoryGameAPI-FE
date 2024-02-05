
const cards = document.querySelectorAll(".card");

let currentCard;
let checkCard;
let firstCard;
let guessed;

for (let i = 0; i < cards.length; i++) {
  const card = cards[i];
  card.addEventListener("click", (event) => {
    const iconElement = event.currentTarget.querySelector("i");

    iconElement.classList.remove("fa-question");
    iconElement.classList.add("fa-check");
    console.log("Clicked on card ", i);

    if(!firstCard){
      currentCard = i;
    getCardFirst(i);
    firstCard = true;
    }else{
      checkCard = i
      getCardSecond(currentCard,checkCard)
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
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}


    
function getCardFirst(i){

  const apiUrl = "http://localhost:8080/game/";
  const data = {"indexOfCard":i};
  

  const axiosOptions = {
    method: "GET",
    url: apiUrl + i,
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
    console.error("Error:", error);
  });

}


function getCardSecond(i,j){
  const apiUrl = "http://localhost:8080/game/";
  const data = {"indexOfCard":j,"valueOfCurrCard":i};
  

  const axiosOptions = {
    method: "GET",
    url: apiUrl + j + "/" + i,
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify(data),
  };
  axios(axiosOptions)
  .then((response) => {
    console.log("Response:", response.data);
    if(response.data == true){guess = true}
    else{guess = false}
  })
  .catch((error) => {
    console.error("Error:", error);
  });
}
