function mainSearch(recipes) {
  const mainSearchInput = document.querySelector(".search-input");
  const userInput = mainSearchInput.value.toLowerCase();
  const errorMessage = document.querySelector(".search--error");

  if (userInput.length >= 3) {
    errorMessage.style.display = "none";
    const filteredRecipes = filterRecipes(recipes, userInput);
    return filteredRecipes; // Return the filtered recipes
  } else {
    // display error message "Veuillez entrer au minimum 3 caractères"
    errorMessage.style.display = "block";
    return recipes; // Return the original recipes if the input is less than 3 characters
  }
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

function ingredientSearch(recipes, ingredientText) {
  const filteredRecipesSet = new Set();

  recipes.forEach((recipe) => {
    recipe.ingredients.forEach((item) => {
      const ingredient = item.ingredient.toLowerCase();
      if (ingredient.includes(ingredientText.toLowerCase())) {
        // Add recipe to filteredRecipesSet
        filteredRecipesSet.add(recipe);
      }
    });
  });

  const ingredientFilteredRecipes = Array.from(filteredRecipesSet);
  return ingredientFilteredRecipes;
}

function ustensilSearch(recipes, ustensilText) {
  const filteredRecipesSet = new Set();

  recipes.forEach((recipe) => {
    recipe.ustensils.forEach((item) => {
      const ustensil = item.toLowerCase();
      if (ustensil.includes(ustensilText.toLowerCase())) {
        // Add recipe to filteredRecipesSet
        filteredRecipesSet.add(recipe);
      }
    });
  });

  const ustensilFilteredRecipes = Array.from(filteredRecipesSet);
  return ustensilFilteredRecipes;
}

function search(recipes) {
  // Get search trigger elements
  const mainSearchButton = document.querySelector(".search--icon");
  const ingredientSearchButtons = document.querySelectorAll(
    ".dropdown-ingredients--keywords .dropdown--keywords--container"
  );
  const ustensilSearchButtons = document.querySelectorAll(
    ".dropdown-ustensiles--keywords .dropdown--keywords--container"
  );

  // Add event listeners
  mainSearchButton.addEventListener("click", (event) => {
    event.preventDefault();
    const newRecipes = mainSearch(recipes); // Get newRecipes from mainSearch
    run(newRecipes); // Pass newRecipes to run
  });

  ingredientSearchButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      const ingredientText = event.target.textContent.trim().toLowerCase();
      const newRecipes = ingredientSearch(recipes, ingredientText);
      run(newRecipes);
    });
  });

  ustensilSearchButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      const ustensilText = event.target.textContent.trim().toLowerCase();
      const newRecipes = ustensilSearch(recipes, ustensilText);
      run(newRecipes);
    });
  });
}
