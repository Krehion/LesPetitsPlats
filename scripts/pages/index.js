async function getRecipes() {
  const response = await fetch("../../data/recipes.js");
  if (!response.ok) {
    console.log("Failed to fetch recipes data");
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

async function init() {
  // fetch recipes' data
  const recipes = await getRecipes(); // Get the recipes array
  // display dynamic elements
  displayCancelSearchMain();
  displayRecipes(recipes);
  recipeCounter();
  await displayDropdownIngredients(recipes);
  await displayDropdownUstensiles(recipes);
  await displayDropdownAppareils(recipes);

  // handle dropdowns' behaviour
  initDropdowns();
  manageLabels(); // Call manageLabels after triggering elements are initialized
  mainSearch(recipes);
}

init();
