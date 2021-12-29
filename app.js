// Create Dino Constructor

// Create Dino Objects

// Create Human Object
function getHumanData() {
  const getValue = function (id) {
    return document.getElementById(id).value;
  };

  return {
    name: getValue("name"),
    feet: getValue("feet"),
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

// Create Dino Compare Method 2
// NOTE: Weight in JSON file is in lbs, height in inches.

// Create Dino Compare Method 3
// NOTE: Weight in JSON file is in lbs, height in inches.

// Generate Tiles for each Dino in Array

// Add tiles to DOM

// Remove form from screen

// On button click, prepare and display infographic
function handleSubmit() {
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
}
