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

function filterByAllCriteria(
  recipes,
  ingredientsKeywordsSelected,
  appareilsKeywordsSelected,
  ustensilesKeywordsSelected
) {
  return recipes.filter((recipe) => {
    // Check if the recipe matches all selected ingredients
    const hasAllIngredients = ingredientsKeywordsSelected.every(
      (ingredientText) =>
        recipe.ingredients.some((item) =>
          item.ingredient.toLowerCase().includes(ingredientText)
        )
    );
    // Check if the recipe matches all selected appliances
    const hasAllAppliances = appareilsKeywordsSelected.every((applianceText) =>
      recipe.appliance.toLowerCase().includes(applianceText)
    );
    // Check if the recipe matches all selected utensils
    const hasAllUstensils = ustensilesKeywordsSelected.every((ustensilText) =>
      recipe.ustensils.some((item) => item.toLowerCase().includes(ustensilText))
    );
    // Return true only if the recipe matches all selected criteria
    return hasAllIngredients && hasAllAppliances && hasAllUstensils;
  });
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
  const ingredientRemoveButtons = document.querySelectorAll(
    ".dropdown-ingredients--keywords .dropdown--keywords--container__selected, .active-ingredients .active-labels--label"
  );
  const applianceRemoveButtons = document.querySelectorAll(
    ".dropdown-appareils--keywords .dropdown--keywords--container__selected, .active-appareils .active-labels--label"
  );
  const ustensilRemoveButtons = document.querySelectorAll(
    ".dropdown-ustensiles--keywords .dropdown--keywords--container__selected, .active-ustensiles .active-labels--label"
  );

  // Add event listeners
  mainSearchButton.addEventListener("click", (event) => {
    event.preventDefault();
    const newRecipes = mainSearch(recipes); // Get newRecipes from mainSearch
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
      const newRecipes = ingredientSearch(recipes, ingredientText);
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
      const ustensilText = event.target.textContent.trim().toLowerCase();
      if (!ustensilesKeywordsSelected.includes(ustensilText)) {
        ustensilesKeywordsSelected.push(ustensilText);
      }
      const newRecipes = ustensilSearch(recipes, ustensilText);
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
      const applianceText = event.target.textContent.trim().toLowerCase();
      if (!appareilsKeywordsSelected.includes(applianceText)) {
        appareilsKeywordsSelected.push(applianceText);
      }
      const newRecipes = applianceSearch(recipes, applianceText);
      run(
        newRecipes,
        ingredientsKeywordsSelected,
        ustensilesKeywordsSelected,
        appareilsKeywordsSelected
      );
    });
  });

  ingredientRemoveButtons.forEach((button) => {
    button.addEventListener("click", async (event) => {
      event.preventDefault();

      // Get the text content from the button
      const buttonElement = event.target.closest("button");
      const buttonText = buttonElement?.textContent.trim().toLowerCase();

      if (buttonText && buttonText !== "") {
        ingredientsKeywordsSelected = ingredientsKeywordsSelected.filter(
          (item) => item !== buttonText
        );

        const originalRecipes = await getRecipes();
        console.log("Original Recipes:", originalRecipes);
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
        console.warn("Ingredient text not found or empty.");
      }
    });
  });

  applianceRemoveButtons.forEach((button) => {
    button.addEventListener("click", async (event) => {
      event.preventDefault();

      // Get the text content from the button
      const buttonElement = event.target.closest("button");
      const buttonText = buttonElement?.textContent.trim().toLowerCase();

      if (buttonText && buttonText !== "") {
        appareilsKeywordsSelected = appareilsKeywordsSelected.filter(
          (item) => item !== buttonText
        );

        const originalRecipes = await getRecipes();
        console.log("Original Recipes:", originalRecipes);
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
        console.warn("Ingredient text not found or empty.");
      }
    });
  });

  ustensilRemoveButtons.forEach((button) => {
    button.addEventListener("click", async (event) => {
      event.preventDefault();

      // Get the text content from the button
      const buttonElement = event.target.closest("button");
      const buttonText = buttonElement?.textContent.trim().toLowerCase();

      if (buttonText && buttonText !== "") {
        ustensilesKeywordsSelected = ustensilesKeywordsSelected.filter(
          (item) => item !== buttonText
        );

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
        console.warn("Ingredient text not found or empty.");
      }
    });
  });
}
