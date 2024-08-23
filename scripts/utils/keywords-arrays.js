function getIngredients(recipes) {
  const ingredientsSet = new Set(); // Set allows only one iteration of every value

  for (let i = 0; i < recipes.length; i++) {
    const recipe = recipes[i];

    for (let j = 0; j < recipe.ingredients.length; j++) {
      const item = recipe.ingredients[j];
      ingredientsSet.add(item.ingredient);
    }
  }

  // Convert the set to an array
  const ingredientsKeywords = Array.from(ingredientsSet);
  return ingredientsKeywords;
}

function getAppareils(recipes) {
  const applianceSet = new Set();

  for (let i = 0; i < recipes.length; i++) {
    const recipe = recipes[i];
    applianceSet.add(recipe.appliance);
  }

  const appareilsKeywords = Array.from(applianceSet);
  return appareilsKeywords;
}

function getUstensiles(recipes) {
  const ustensilesSet = new Set();

  for (let i = 0; i < recipes.length; i++) {
    const recipe = recipes[i];

    for (let j = 0; j < recipe.ustensils.length; j++) {
      const ustensil = recipe.ustensils[j]; // Directly get the ustensil string
      ustensilesSet.add(ustensil);
    }
  }

  const ustensilesKeywords = Array.from(ustensilesSet);
  return ustensilesKeywords;
}

function getFilteredIngredients(filteredRecipes) {
  const ingredientsFilteredSet = new Set();

  for (let i = 0; i < filteredRecipes.length; i++) {
    const recipe = filteredRecipes[i];

    for (let j = 0; j < recipe.ingredients.length; j++) {
      const item = recipe.ingredients[j];
      ingredientsFilteredSet.add(item.ingredient);
    }
  }

  const ingredientsFilteredKeywords = Array.from(ingredientsFilteredSet);
  return ingredientsFilteredKeywords;
}

function getFilteredAppareils(filteredRecipes) {
  const applianceFilteredSet = new Set();

  for (let i = 0; i < filteredRecipes.length; i++) {
    const recipe = filteredRecipes[i];
    applianceFilteredSet.add(recipe.appliance);
  }

  const appareilsFilteredKeywords = Array.from(applianceFilteredSet);
  return appareilsFilteredKeywords;
}

function getFilteredUstensiles(filteredRecipes) {
  const ustensilesFilteredSet = new Set();

  for (let i = 0; i < filteredRecipes.length; i++) {
    const recipe = filteredRecipes[i];

    for (let j = 0; j < recipe.ustensils.length; j++) {
      const ustensil = recipe.ustensils[j];
      ustensilesFilteredSet.add(ustensil);
    }
  }

  const ustensilesFilteredKeywords = Array.from(ustensilesFilteredSet);
  return ustensilesFilteredKeywords;
}
