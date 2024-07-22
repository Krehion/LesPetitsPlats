function mainSearch(
  recipes,
  ingredientsKeywordsSection,
  appareilsKeywordsSection,
  ustensilesKeywordsSection
) {
  // Get search trigger element
  const mainSearchButton = document.querySelector(".search--icon");

  // Add event listener
  mainSearchButton.addEventListener("click", (event) => {
    event.preventDefault();

    const mainSearchInput = document.querySelector(".search-input");
    const userInput = mainSearchInput.value.toLowerCase();
    const errorMessage = document.querySelector(".search--error");

    if (userInput.length >= 3) {
      errorMessage.style.display = "none";
      const filteredRecipes = filterRecipes(recipes, userInput);

      // Empty recipes section, keywords lists, recipes counter
      emptyAll();
      // Display filtered list of recipes, new amount of recipes, filtered lists of keywords
      displayRecipes(filteredRecipes);
      recipeCounter();

      const ingredientsFilteredKeywords =
        getFilteredIngredients(filteredRecipes);
      const appareilsFilteredKeywords = getFilteredAppareils(filteredRecipes);
      const ustensilesFilteredKeywords = getFilteredUstensiles(filteredRecipes);

      // Display error message if filteredRecipes is empty
      displayEmptyResultMessage(filteredRecipes);

      // Call displayDropdownKeywords with new data
      displayDropdownKeywords(
        ingredientsFilteredKeywords,
        ingredientsKeywordsSection
      );
      displayDropdownKeywords(
        appareilsFilteredKeywords,
        appareilsKeywordsSection
      );
      displayDropdownKeywords(
        ustensilesFilteredKeywords,
        ustensilesKeywordsSection
      );

      // Re-call keywords and label functions to make them work with the new data
      keywordsInputFilter();
      createLabel();
      deleteLabel();
    } else {
      // display error message "Veuillez entrer au minimum 3 caractères"
      errorMessage.style.display = "block";
    }
  });
}

function filterRecipes(recipes, userInput) {
  const filteredRecipesSet = new Set();

  recipes.forEach((recipe) => {
    const recipeTitle = recipe.name.toLowerCase();
    const recipeDesc = recipe.description.toLowerCase();

    if (recipeTitle.includes(userInput) || recipeDesc.includes(userInput)) {
      // Add recipe to filteredRecipesSet
      filteredRecipesSet.add(recipe);
    }

    recipe.ingredients.forEach((item) => {
      const ingredient = item.ingredient.toLowerCase();
      if (ingredient.includes(userInput)) {
        // Add recipe to filteredRecipesSet
        filteredRecipesSet.add(recipe);
      }
    });
  });

  return Array.from(filteredRecipesSet);
}
