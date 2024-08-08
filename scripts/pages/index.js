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

async function run(
  recipes,
  ingredientsKeywordsSelected,
  ustensilesKeywordsSelected,
  appareilsKeywordsSelected
) {
  // Empty recipes section, keywords lists, recipes counter
  emptyAll();
  // Display dynamic elements
  await displayRecipes(recipes);
  recipeCounter();
  await displayDropdownIngredients(recipes, ingredientsKeywordsSelected);
  await displayDropdownUstensiles(recipes, ustensilesKeywordsSelected);
  await displayDropdownAppareils(recipes, appareilsKeywordsSelected);
  // Handle dropdowns' behaviour
  initDropdowns();
  // Call manageLabels now that triggering elements are initialized
  manageLabels(
    ingredientsKeywordsSelected,
    ustensilesKeywordsSelected,
    appareilsKeywordsSelected
  );
  // Display error message if recipes is empty
  displayEmptyResultMessage(recipes);
  // Call search function
  search(
    recipes,
    ingredientsKeywordsSelected,
    ustensilesKeywordsSelected,
    appareilsKeywordsSelected
  );
}

async function init() {
  // Fetch recipes' data
  const recipes = await getRecipes();
  // Initialize "selected" content parameters
  let ingredientsKeywordsSelected = [];
  let ustensilesKeywordsSelected = [];
  let appareilsKeywordsSelected = [];

  // Display global dynamic items
  displayCancelSearchMain();

  // Display dynamic content depending on the recipes
  run(
    recipes,
    ingredientsKeywordsSelected,
    ustensilesKeywordsSelected,
    appareilsKeywordsSelected
  );
}

init();
