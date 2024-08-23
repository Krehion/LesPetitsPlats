function mainSearch(recipes) {
  const mainSearchInput = document.querySelector(".search-input");
  const userInput = mainSearchInput.value.toLowerCase();
  const errorMessage = document.querySelector(".search--error");

  if (userInput.length >= 3) {
    errorMessage.style.display = "none";
    const filteredRecipes = filterRecipesMainSearch(recipes, userInput);
    return filteredRecipes; // Return the filtered recipes
  } else {
    // display error message "Veuillez entrer au minimum 3 caractères"
    errorMessage.style.display = "block";
    return recipes; // Return the original recipes if the input is less than 3 characters
  }
}

function filterRecipesMainSearch(recipes, userInput) {
  const filteredRecipesSet = new Set();

  for (let i = 0; i < recipes.length; i++) {
    const recipe = recipes[i];
    const recipeTitle = recipe.name.toLowerCase();
    const recipeDesc = recipe.description.toLowerCase();

    if (recipeTitle.includes(userInput) || recipeDesc.includes(userInput)) {
      // Add recipe to filteredRecipesSet
      filteredRecipesSet.add(recipe);
    }

    for (let j = 0; j < recipe.ingredients.length; j++) {
      const item = recipe.ingredients[j];
      const ingredient = item.ingredient.toLowerCase();
      if (ingredient.includes(userInput)) {
        // Add recipe to filteredRecipesSet
        filteredRecipesSet.add(recipe);
      }
    }
  }

  return Array.from(filteredRecipesSet);
}

function ingredientSearch(recipes, ingredientText) {
  const filteredRecipesSet = new Set();

  for (let i = 0; i < recipes.length; i++) {
    const recipe = recipes[i];

    for (let j = 0; j < recipe.ingredients.length; j++) {
      const item = recipe.ingredients[j];
      const ingredient = item.ingredient.toLowerCase();
      if (ingredient.includes(ingredientText.toLowerCase())) {
        // Add recipe to filteredRecipesSet
        filteredRecipesSet.add(recipe);
      }
    }
  }

  return Array.from(filteredRecipesSet);
}

function ustensilSearch(recipes, ustensilText) {
  const filteredRecipesSet = new Set();

  for (let i = 0; i < recipes.length; i++) {
    const recipe = recipes[i];

    for (let j = 0; j < recipe.ustensils.length; j++) {
      const item = recipe.ustensils[j];
      const ustensil = item.toLowerCase();
      if (ustensil.includes(ustensilText.toLowerCase())) {
        // Add recipe to filteredRecipesSet
        filteredRecipesSet.add(recipe);
      }
    }
  }

  return Array.from(filteredRecipesSet);
}

function applianceSearch(recipes, applianceText) {
  const filteredRecipesSet = new Set();

  for (let i = 0; i < recipes.length; i++) {
    const recipe = recipes[i];
    const appliance = recipe.appliance.toLowerCase();
    if (appliance.includes(applianceText.toLowerCase())) {
      // Add recipe to filteredRecipesSet
      filteredRecipesSet.add(recipe);
    }
  }

  return Array.from(filteredRecipesSet);
}

function filterByAllCriteria(
  recipes,
  ingredientsKeywordsSelected,
  appareilsKeywordsSelected,
  ustensilesKeywordsSelected
) {
  const filteredRecipes = [];

  for (let i = 0; i < recipes.length; i++) {
    const recipe = recipes[i];
    let hasAllIngredients = true;
    let hasAllAppliances = true;
    let hasAllUstensils = true;

    // Check if the recipe matches all selected ingredients
    for (let j = 0; j < ingredientsKeywordsSelected.length; j++) {
      const ingredientText = ingredientsKeywordsSelected[j];
      let found = false;

      for (let k = 0; k < recipe.ingredients.length; k++) {
        const item = recipe.ingredients[k];
        if (item.ingredient.toLowerCase().includes(ingredientText)) {
          found = true;
          break;
        }
      }

      if (!found) {
        hasAllIngredients = false;
        break;
      }
    }

    // Check if the recipe matches all selected appliances
    for (let j = 0; j < appareilsKeywordsSelected.length; j++) {
      const applianceText = appareilsKeywordsSelected[j];
      if (!recipe.appliance.toLowerCase().includes(applianceText)) {
        hasAllAppliances = false;
        break;
      }
    }

    // Check if the recipe matches all selected utensils
    for (let j = 0; j < ustensilesKeywordsSelected.length; j++) {
      const ustensilText = ustensilesKeywordsSelected[j];
      let found = false;

      for (let k = 0; k < recipe.ustensils.length; k++) {
        const item = recipe.ustensils[k];
        if (item.toLowerCase().includes(ustensilText)) {
          found = true;
          break;
        }
      }

      if (!found) {
        hasAllUstensils = false;
        break;
      }
    }

    // Add to filteredRecipes only if the recipe matches all selected criteria
    if (hasAllIngredients && hasAllAppliances && hasAllUstensils) {
      filteredRecipes.push(recipe);
    }
  }

  return filteredRecipes;
}

function search(
  recipes,
  ingredientsKeywordsSelected,
  ustensilesKeywordsSelected,
  appareilsKeywordsSelected
) {
  // Helper function to handle the common event logic for adding search filters
  function handleSearch(event, selectedKeywords, searchFunction) {
    event.preventDefault();
    const searchText = event.target.textContent.trim().toLowerCase();
    if (!selectedKeywords.includes(searchText)) {
      selectedKeywords.push(searchText);
    }
    const newRecipes = searchFunction(recipes, searchText);
    run(
      newRecipes,
      ingredientsKeywordsSelected,
      ustensilesKeywordsSelected,
      appareilsKeywordsSelected
    );
  }

  // Helper function to handle the common event logic for removing filters
  async function handleRemoveFilter(event, selectedKeywords) {
    event.preventDefault();

    const buttonElement = event.target.closest("button");
    const buttonText = buttonElement?.textContent.trim().toLowerCase();

    if (buttonText && buttonText !== "") {
      // Correctly update the selectedKeywords array by removing the filter
      const index = selectedKeywords.indexOf(buttonText);
      if (index > -1) {
        // Use splice to modify the array in place
        selectedKeywords.splice(index, 1);
      }

      const originalRecipes = await getRecipes();
      const newRecipes = filterByAllCriteria(
        originalRecipes,
        ingredientsKeywordsSelected,
        appareilsKeywordsSelected,
        ustensilesKeywordsSelected
      );

      run(
        newRecipes,
        ingredientsKeywordsSelected,
        ustensilesKeywordsSelected,
        appareilsKeywordsSelected
      );
    } else {
      console.warn("Keyword text not found or empty.");
    }
  }

  // Get search trigger elements
  const mainSearchButton = document.querySelector(".search--icon");
  const filterButtonsConfig = [
    {
      buttons: document.querySelectorAll(
        ".dropdown-ingredients--keywords .dropdown--keywords--container"
      ),
      selectedKeywords: ingredientsKeywordsSelected,
      searchFunction: ingredientSearch,
    },
    {
      buttons: document.querySelectorAll(
        ".dropdown-ustensiles--keywords .dropdown--keywords--container"
      ),
      selectedKeywords: ustensilesKeywordsSelected,
      searchFunction: ustensilSearch,
    },
    {
      buttons: document.querySelectorAll(
        ".dropdown-appareils--keywords .dropdown--keywords--container"
      ),
      selectedKeywords: appareilsKeywordsSelected,
      searchFunction: applianceSearch,
    },
  ];
  const removeButtonsConfig = [
    {
      buttons: document.querySelectorAll(
        ".dropdown-ingredients--keywords .dropdown--keywords--container__selected, .active-ingredients .active-labels--label"
      ),
      selectedKeywords: ingredientsKeywordsSelected,
    },
    {
      buttons: document.querySelectorAll(
        ".dropdown-appareils--keywords .dropdown--keywords--container__selected, .active-appareils .active-labels--label"
      ),
      selectedKeywords: appareilsKeywordsSelected,
    },
    {
      buttons: document.querySelectorAll(
        ".dropdown-ustensiles--keywords .dropdown--keywords--container__selected, .active-ustensiles .active-labels--label"
      ),
      selectedKeywords: ustensilesKeywordsSelected,
    },
  ];

  // Add event listener for main search button
  mainSearchButton.addEventListener("click", (event) => {
    event.preventDefault();
    // Get newRecipes from mainSearch
    const newRecipes = mainSearch(recipes);
    // Pass newRecipes to run
    run(
      newRecipes,
      ingredientsKeywordsSelected,
      ustensilesKeywordsSelected,
      appareilsKeywordsSelected
    );
  });

  // Add event listeners for each type of filter button
  for (let i = 0; i < filterButtonsConfig.length; i++) {
    const { buttons, selectedKeywords, searchFunction } =
      filterButtonsConfig[i];
    for (let j = 0; j < buttons.length; j++) {
      const button = buttons[j];
      button.addEventListener("click", (event) =>
        handleSearch(event, selectedKeywords, searchFunction)
      );
    }
  }

  // Add event listeners for remove buttons
  for (let i = 0; i < removeButtonsConfig.length; i++) {
    const { buttons, selectedKeywords } = removeButtonsConfig[i];
    for (let j = 0; j < buttons.length; j++) {
      const button = buttons[j];
      button.addEventListener("click", (event) =>
        handleRemoveFilter(event, selectedKeywords)
      );
    }
  }
}
