function labelsSearch(recipesToFilter, recipesToDisplay) {
  const advancedSearchTriggers = document.querySelectorAll(
    ".dropdown--keywords--container"
  );
  advancedSearchTriggers.forEach((trigger) => {
    trigger.addEventListener("click", (event) => {
      event.preventDefault();
      labelsFiltering(recipesToFilter);

      // Empty recipes section, keywords lists, recipes counter
      emptyAll();
      // Display filtered list of recipes, new amount of recipes, filtered lists of keywords
      displayRecipes(recipesToDisplay); // ça bloque ici...
    });
  });
}



function labelsFiltering(recipesToFilter) {
  // when clicking on an ingredient, ustensil or appliance, search for it in each recipe currently displayed.

  let recipesToDisplay = [];

  // Define recipesToDisplay
  recipesToDisplay = recipesToFilter.filter((recipe) => {
    let recipeIsMatching = false;
    let ingredientIsMatching = false;
    let applianceIsMatching = false;
    let ustensilIsMatching = false;

    let ingredientsMatching = 0;
    let appliancesMatching = 0;
    let ustensilsMatching = 0;

    let ingredientsInTheRecipe = [];
    let appliancesInTheRecipe = [];
    let ustensilsInTheRecipe = [];

    ingredientsInTheRecipe = recipe.ingredients.map(
      ({ ingredient }) => ingredient
    );
    appliancesInTheRecipe.push(recipe.appliance); // Each recipe has only one appliance : recipe.appliance is a single value, not an array, so we simply add it to the array with push
    ustensilsInTheRecipe = recipe.ustensils.map((ustensil) => ustensil);

    if (selectedIngredients.length > 0) {
      selectedIngredients.forEach((selectedIngredient) => {
        if (ingredientsInTheRecipe.includes(selectedIngredient)) {
          ingredientsMatching += 1;
        }
      });
    }

    if (selectedAppliances.length > 0) {
      selectedAppliances.forEach((selectedAppliance) => {
        if (appliancesInTheRecipe.includes(selectedAppliance)) {
          appliancesMatching += 1;
        }
      });
    }

    if (selectedUstensils.length > 0) {
      selectedUstensils.forEach((selectedUstensil) => {
        if (ustensilsInTheRecipe.includes(selectedUstensil)) {
          ustensilsMatching += 1;
        }
      });
    }

    if (ingredientsMatching === selectedIngredients.length) {
      ingredientIsMatching = true;
    }

    if (selectedAppliances.length > 0) {
      if (appliancesMatching > 0) {
        applianceIsMatching = true;
      }
    } else applianceIsMatching = true;

    if (ustensilsMatching === selectedUstensils.length) {
      ustensilIsMatching = true;
    }

    if (
      ingredientIsMatching === true &&
      applianceIsMatching === true &&
      ustensilIsMatching === true
    ) {
      recipeIsMatching = true;
    }

    return recipeIsMatching;
  });
  console.log(recipesToDisplay);
  return recipesToDisplay;
}
