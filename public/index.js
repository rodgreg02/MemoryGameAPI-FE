
const cards = document.querySelectorAll(".card");

let currentCard;
let checkCard;
let firstCard;
let guessed;

for (let i = 0; i < cards.length; i++) {
  const card = cards[i];
  card.innerHTML = i
  card.addEventListener("click", (event) => {
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
      getAll()
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function getAll(){
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

  axios(axiosOptions)
    .then((response) => {
      console.log("Response:", response.data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}


    
function getCardFirst(l){

  const apiUrl = "http://localhost:8080/game/";
  const data = {"indexOfCard":l};
  

  const axiosOptions = {
    method: "GET",
    url: apiUrl + l,
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


function getCardSecond(k,j){
  const apiUrl = "http://localhost:8080/game/";
  const data = {"indexOfCard":j,"valueOfCurrCard":k};
  

  const axiosOptions = {
    method: "GET",
    url: apiUrl + j + "/" + k,
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify(data),
  };
  axios(axiosOptions)
  .then((response) => {
    console.log("Response:", response.data);
    if(response.data == true){guessed = true}
    else{guessed = false}
  })
  .catch((error) => {
    console.error("Error:", error);
  });
}
