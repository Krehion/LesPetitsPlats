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
  // access the recipes array
  displayRecipes(recipes);
  recipeCounter();

  // fetch keywords arrays
  const ingredientsKeywords = await getIngredients(recipes);
  const ingredientsKeywordsSection = document.querySelector(
    ".dropdown-ingredients--keywords"
  );
  const ustensilesKeywords = await getUstensiles(recipes);
  const ustensilesKeywordsSection = document.querySelector(
    ".dropdown-ustensiles--keywords"
  );
  const appareilsKeywords = await getAppareils(recipes);
  const appareilsKeywordsSection = document.querySelector(
    ".dropdown-appareils--keywords"
  );

  displayDropdownKeywords(ingredientsKeywords, ingredientsKeywordsSection);
  displayDropdownKeywords(ustensilesKeywords, ustensilesKeywordsSection);
  displayDropdownKeywords(appareilsKeywords, appareilsKeywordsSection);
  unfoldDropdown();
  keywordsInputFilter();
  displayCancelSearchKeywords();

  createLabel();
  deleteLabel();

  mainSearch(
    recipes,
    ingredientsKeywordsSection,
    appareilsKeywordsSection,
    ustensilesKeywordsSection
  );
}

init();
