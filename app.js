const dinoCompare = document.getElementById("dino-compare");
const tryAgain = document.getElementById("try-again");

// Create Dino Constructor
function DinoConstructor(dino) {
  const { species, weight, height, diet, where, when, fact } = dino;

  this.species = species;
  this.weight = weight;
  this.height = height;
  this.diet = diet;
  this.where = where;
  this.when = when;
  this.fact = fact;
  this.image = `./images/${species.toLowerCase()}.png`;
}

// Create Dino Objects
async function getDinoData() {
  const res = await fetch("./dino.json");
  const json = await res.json();
  return json.Dinos;
}

// Create Human Object
function getHumanData() {
  const getValue = function (id) {
    return document.getElementById(id).value;
  };

  return {
    name: getValue("name"),
    inches: getValue("inches"),
    weight: getValue("weight"),
    diet: getValue("diet"),
  };
}

// Use IIFE to get human data from form
(function () {
  document.getElementById("btn").addEventListener("click", handleSubmit);
  document.getElementById("try-again").addEventListener("click", tryAgainClick);
})();

// Create Dino Compare Method 1
// NOTE: Weight in JSON file is in lbs, height in inches.
DinoConstructor.prototype.compareWeight = function (human) {
  if (human.weight > this.weight) {
    return "You are heavier than " + this.species;
  } else if (human.weight < this.weight) {
    return "You are lighter than " + this.species;
  } else {
    return "You are the same weight as " + this.species;
  }
};

// Create Dino Compare Method 2
// NOTE: Weight in JSON file is in lbs, height in inches.
DinoConstructor.prototype.compareDiet = function (human) {
  if (this.diet === human.diet) {
    return "You are in the same diet as " + this.species;
  } else {
    return "You are not in the same diet as " + this.species;
  }
};

// Create Dino Compare Method 3
// NOTE: Weight in JSON file is in lbs, height in inches.
DinoConstructor.prototype.compareHeight = function (human) {
  if (human.inches > this.inches) {
    return "You are taller than " + this.species;
  } else if (human.inches < this.inches) {
    return "You are shorter than " + this.species;
  } else {
    return "You are the same height as " + this.species;
  }
};

// Generate Tiles for each Dino in Array
function generateTiles(dino, human) {
  if (!dino) {
    const humanTile = document.createElement("div");
    humanTile.classList.add("grid-item");
    humanTile.innerHTML = `
      <h3>${human.name}</h3>
      <img src="./images/human.png" alt="human">
      <p></p>
    `;
    return humanTile;
  }

  let fact;
  const randomFact = Math.floor(Math.random() * 3);

  if (dino.species === "Pigeon") fact = dino.fact;
  else if (randomFact === 0) fact = dino.compareWeight(human);
  else if (randomFact === 1) fact = dino.compareDiet(human);
  else if (randomFact === 2) fact = dino.compareHeight(human);
  else fact = dino.fact;

  const dinoTile = document.createElement("div");
  dinoTile.classList.add("grid-item");
  dinoTile.innerHTML = `
    <h3>${dino.species}</h3>
    <img src="${dino.image}" alt="${dino.species}">
    <p>${fact}</p>
  `;

  return dinoTile;
}

// Remove form from screen
function removeFormFromScreen() {
  dinoCompare.style.display = "none";
  tryAgain.style.display = "block";
}

// Get start again
function tryAgainClick() {
  const grid = document.getElementById("grid");
  grid.innerHTML = "";
  document.getElementById("dino-compare").style.display = "block";
  document.getElementById("try-gain").style.display = "none";
}

// On button click, prepare and display infographic
async function handleSubmit() {
  const human = getHumanData();

  const error = document.getElementById("error");
  if (
    human.name === "" ||
    human.feet === "" ||
    human.inches === "" ||
    human.weight === ""
  ) {
    error.innerHTML = "Please fill out all fields.";
    return;
  }

  removeFormFromScreen();

  let dinos = [];
  dinos = await getDinoData();
  dinos = dinos.map((dino) => new DinoConstructor(dino));

  const grid = document.getElementById("grid");
  dinos.forEach((dino, index) => {
    if (index === 4) grid.appendChild(generateTiles(null, human));
    grid.appendChild(generateTiles(dino, human));
  });
}
