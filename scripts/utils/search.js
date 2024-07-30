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
      manageLabels();
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

function filterIngredients() {
  // Get selected labels
  const selectedIngredientsDOM = Array.from(
    document.querySelectorAll(
      ".dropdown-ingredients--keywords .dropdown--keywords--container__selected"
    )
  );
  let selectedIngredients = [];
  // Convert DOM elements to string arrays (makes them usable to filter the recipes later)
  selectedIngredients = selectedIngredientsDOM.map(
    (selectedIngredient) => selectedIngredient.innerText
  );
  return selectedIngredients;
}

function filterAppareils() {
  const selectedAppareilsDOM = Array.from(
    document.querySelectorAll(
      ".dropdown-appareils--keywords .dropdown--keywords--container__selected"
    )
  );
  let selectedAppareils = [];
  selectedAppareils = selectedAppareilsDOM.map(
    (selectedAppareil) => selectedAppareil.innerText
  );
  return selectedAppareils;
}

function filterUstensiles() {
  const selectedUstensilesDOM = Array.from(
    document.querySelectorAll(
      ".dropdown-ustensiles--keywords .dropdown--keywords--container__selected"
    )
  );
  let selectedUstensiles = [];
  selectedUstensiles = selectedUstensilesDOM.map(
    (selectedUstensile) => selectedUstensile.innerText
  );
  return selectedUstensiles;
}
