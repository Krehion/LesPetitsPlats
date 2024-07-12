function mainSearch(recipes) {
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

    // Check filteredRecipes content
    console.log(filteredRecipes);

    // empty recipes section, keywords lists, recipes counter
    emptyCards();
    emptyCounter();
    // display filtered list of recipes, filtered lists of keywords, new amount of recipes
    displayRecipes(filteredRecipes);
    // call functions getFilteredIngredients(filteredRecipes) + appareils + ustensiles (functions to be created)
    // call displayDropdownKeywords with new data
    recipeCounter();
  });
}

// On search button click:
// empty recipes section
// call displayRecipes(filteredRecipes)
// empty keywords and sections
// call functions getFilteredIngredients(filteredRecipes) + appareils + ustensiles (functions to be created)
// call displayDropdownKeywords with new data

// Refinement:
// add error message to be displayed if filteredRecipes = 0
// add a min character length of 3 to input
// add a timer to allow a small intervall between characters typed before launching the function -> change input to submit to not trigger research on every input

// sortir consignes de l'event listener, laisser dans la fonction
// 4 fonctions : 1 par dropdown + 1 mainsearch
