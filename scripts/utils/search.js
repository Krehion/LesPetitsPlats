function mainSearch(
  recipes,
  ingredientsKeywordsSection,
  appareilsKeywordsSection,
  ustensilesKeywordsSection
) {
  // Get search input element
  const mainSearchInput = document.querySelector(".search-input");
  const mainSearchButton = document.querySelector(".search--icon");

  // Add event listener
  mainSearchButton.addEventListener("click", (event) => {
    event.preventDefault();

    const userInput = mainSearchInput.value.toLowerCase();
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

    const filteredRecipes = Array.from(filteredRecipesSet);

    // empty recipes section, keywords lists, recipes counter
    emptyCards();
    emptyKeywordsLists();
    emptyCounter();
    // Display filtered list of recipes, new amount of recipes, filtered lists of keywords
    displayRecipes(filteredRecipes);
    recipeCounter();

    const ingredientsFilteredKeywords = getFilteredIngredients(filteredRecipes);
    const appareilsFilteredKeywords = getFilteredAppareils(filteredRecipes);
    const ustensilesFilteredKeywords = getFilteredUstensiles(filteredRecipes);

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
    displayCancelSearchKeywords(); // ???
    createLabel();
    deleteLabel();
  });
}

// Refinement:
// add error message to be displayed if filteredRecipes = 0
// add a min character length of 3 to input

// sortir consignes de l'event listener, laisser dans la fonction
// 4 fonctions : 1 par dropdown + 1 mainsearch
