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

function applianceSearch(recipes, applianceText) {
  const filteredRecipesSet = new Set();

  recipes.forEach((recipe) => {
    const appliance = recipe.appliance.toLowerCase();
    if (appliance.includes(applianceText.toLowerCase())) {
      // Add recipe to filteredRecipesSet
      filteredRecipesSet.add(recipe);
    }
  });

  const applianceFilteredRecipes = Array.from(filteredRecipesSet);
  return applianceFilteredRecipes;
}

function search(
  recipes,
  ingredientsKeywordsSelected,
  ustensilesKeywordsSelected,
  appareilsKeywordsSelected
) {
  // Get search trigger elements
  const mainSearchButton = document.querySelector(".search--icon");
  const ingredientSearchButtons = document.querySelectorAll(
    ".dropdown-ingredients--keywords .dropdown--keywords--container"
  );
  const ustensilSearchButtons = document.querySelectorAll(
    ".dropdown-ustensiles--keywords .dropdown--keywords--container"
  );
  const applianceSearchButtons = document.querySelectorAll(
    ".dropdown-appareils--keywords .dropdown--keywords--container"
  );

  // Add event listeners
  mainSearchButton.addEventListener("click", (event) => {
    event.preventDefault();
    const newRecipes = mainSearch(recipes); // Get newRecipes from mainSearch
    console.log("Main search triggered:", newRecipes);
    run(
      newRecipes,
      ingredientsKeywordsSelected,
      ustensilesKeywordsSelected,
      appareilsKeywordsSelected
    ); // Pass newRecipes to run
  });

  ingredientSearchButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      const ingredientText = event.target.textContent.trim().toLowerCase(); // Normalize to lowercase
      // add ingredientText to ingredientsKeywordsSelected array
      if (!ingredientsKeywordsSelected.includes(ingredientText)) {
        ingredientsKeywordsSelected.push(ingredientText);
      }
      console.log("Ingredient selected:", ingredientText);
      console.log(
        "Updated ingredientsKeywordsSelected:",
        ingredientsKeywordsSelected
      );
      const newRecipes = ingredientSearch(recipes, ingredientText);
      console.log("New recipes after ingredient search:", newRecipes);
      run(
        newRecipes,
        ingredientsKeywordsSelected,
        ustensilesKeywordsSelected,
        appareilsKeywordsSelected
      );
    });
  });

  ustensilSearchButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      const ustensilText = event.target.textContent.trim().toLowerCase(); // Normalize to lowercase
      const newRecipes = ustensilSearch(recipes, ustensilText);
      console.log("Ustensil selected:", ustensilText);
      console.log(
        "Updated ustensilesKeywordsSelected:",
        ustensilesKeywordsSelected
      );
      run(
        newRecipes,
        ingredientsKeywordsSelected,
        ustensilesKeywordsSelected,
        appareilsKeywordsSelected
      );
    });
  });

  applianceSearchButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      const applianceText = event.target.textContent.trim().toLowerCase(); // Normalize to lowercase
      const newRecipes = applianceSearch(recipes, applianceText);
      console.log("Appliance selected:", applianceText);
      console.log(
        "Updated appareilsKeywordsSelected:",
        appareilsKeywordsSelected
      );
      run(
        newRecipes,
        ingredientsKeywordsSelected,
        ustensilesKeywordsSelected,
        appareilsKeywordsSelected
      );
    });
  });
}
