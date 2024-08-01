async function getRecipes() {
  const response = await fetch("../../data/recipes.js");
  if (!response.ok) {
    return [];
  }
  const scriptText = await response.text(); // Get the script content as text
  const recipesFunction = new Function(scriptText + "; return recipes;"); // Create a function to evaluate the script
  const recipes = recipesFunction(); // Execute the function to get the recipes
  return recipes;
}

async function displayRecipes(recipes) {
  const recipeCardsSection = document.querySelector(".recipes");

  recipes.forEach((recipe) => {
    const recipeCardModel = recipeCardTemplate(recipe);
    const recipeCardDOM = recipeCardModel.getRecipeCardDOM();
    recipeCardsSection.appendChild(recipeCardDOM);
  });
}

async function run(recipes) {
  // Empty recipes section, keywords lists, recipes counter
  emptyAll();
  // Display dynamic elements
  await displayRecipes(recipes);
  recipeCounter();
  await displayDropdownIngredients(recipes);
  await displayDropdownUstensiles(recipes);
  await displayDropdownAppareils(recipes);
  // Handle dropdowns' behaviour
  initDropdowns();
  // Call manageLabels now that triggering elements are initialized
  manageLabels();
  // Display error message if recipes is empty
  displayEmptyResultMessage(recipes);
  // Call search function
  search(recipes);
}

async function init() {
  // Fetch recipes' data
  const recipes = await getRecipes();

  // Display global dynamic items
  displayCancelSearchMain();

  // Display dynamic content depending on the recipes
  run(recipes);
}

init();
