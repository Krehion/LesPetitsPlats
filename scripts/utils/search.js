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

function ingredientRemove(recipes, ingredientsKeywordsSelected) {
  const filteredRecipesSet = new Set();

  recipes.forEach((recipe) => {
    // Assume the recipe is valid unless proven otherwise
    let isValid = true;

    // Check if the recipe includes all remaining selected ingredients
    ingredientsKeywordsSelected.forEach((ingredientText) => {
      const recipeHasIngredient = recipe.ingredients.some((item) =>
        item.ingredient.toLowerCase().includes(ingredientText.toLowerCase())
      );

      // If the recipe doesn't have one of the ingredients, mark it as invalid
      if (!recipeHasIngredient) {
        isValid = false;
      }
    });

    // If valid, add the recipe to the filteredRecipesSet
    if (isValid) {
      filteredRecipesSet.add(recipe);
    }
  });

  const finalFilteredRecipes = Array.from(filteredRecipesSet);
  return finalFilteredRecipes;
}

function applianceRemove(recipes, appareilsKeywordsSelected) {
  const filteredRecipesSet = new Set();

  recipes.forEach((recipe) => {
    let isValid = true;

    appareilsKeywordsSelected.forEach((applianceText) => {
      const recipeHasAppliance = recipe.appliance.some((item) =>
        item.appliance.toLowerCase().includes(applianceText.toLowerCase())
      );

      if (!recipeHasAppliance) {
        isValid = false;
      }
    });

    if (isValid) {
      filteredRecipesSet.add(recipe);
    }
  });

  const finalFilteredRecipes = Array.from(filteredRecipesSet);
  return finalFilteredRecipes;
}

function ustensilRemove(recipes, ustensilesKeywordsSelected) {
  const filteredRecipesSet = new Set();

  recipes.forEach((recipe) => {
    let isValid = true;

    ustensilesKeywordsSelected.forEach((ustensilText) => {
      const recipeHasUstensil = recipe.ustensils.some((item) =>
        item.ustensil.toLowerCase().includes(ustensilText.toLowerCase())
      );

      if (!recipeHasUstensil) {
        isValid = false;
      }
    });

    if (isValid) {
      filteredRecipesSet.add(recipe);
    }
  });

  const finalFilteredRecipes = Array.from(filteredRecipesSet);
  return finalFilteredRecipes;
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
        // Remove the selected ingredient from the list
        ingredientsKeywordsSelected = ingredientsKeywordsSelected.filter(
          (item) => item !== buttonText
        );
        // Refresh the displayed recipes list based on the remaining selected ingredients
        const originalRecipes = await getRecipes(); // To be changed
        const newRecipes = ingredientRemove(
          originalRecipes,
          ingredientsKeywordsSelected
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

      const buttonElement = event.target.closest("button");
      const buttonText = buttonElement?.textContent.trim().toLowerCase();

      if (buttonText && buttonText !== "") {
        appareilsKeywordsSelected = appareilsKeywordsSelected.filter(
          (item) => item !== buttonText
        );
        const originalRecipes = await getRecipes(); // To be changed
        const newRecipes = applianceRemove(
          originalRecipes,
          appareilsKeywordsSelected
        );
        run(
          newRecipes,
          ingredientsKeywordsSelected,
          ustensilesKeywordsSelected,
          appareilsKeywordsSelected
        );
      } else {
        console.warn("Appliance text not found or empty.");
      }
    });
  });

  ustensilRemoveButtons.forEach((button) => {
    button.addEventListener("click", async (event) => {
      event.preventDefault();

      const buttonElement = event.target.closest("button");
      const buttonText = buttonElement?.textContent.trim().toLowerCase();

      if (buttonText && buttonText !== "") {
        ustensilesKeywordsSelected = ustensilesKeywordsSelected.filter(
          (item) => item !== buttonText
        );
        const originalRecipes = await getRecipes(); // To be changed
        const newRecipes = ustensilRemove(
          originalRecipes,
          ustensilesKeywordsSelected
        );
        run(
          newRecipes,
          ingredientsKeywordsSelected,
          ustensilesKeywordsSelected,
          appareilsKeywordsSelected
        );
      } else {
        console.warn("Ustensil text not found or empty.");
      }
    });
  });
}
