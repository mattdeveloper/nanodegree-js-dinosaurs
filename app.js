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

// Add tiles to DOM

// Remove form from screen
function removeFormFromScreen() {
  document.getElementById("dino-compare").style.display = "none";
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

  let dinos = [];
  dinos = await getDinoData();
  console.log(dinos);

  // removeFormFromScreen();
}
