function getIngredients(recipes) {
	const ingredientsSet = new Set(); // Set allows only one iteration of every value

	recipes.forEach((recipe) => {
		recipe.ingredients.forEach((item) => {
			ingredientsSet.add(item.ingredient);
		});
	});

	// Convert the set to an array
	const ingredientsKeywords = Array.from(ingredientsSet);
	return ingredientsKeywords;
}

function getAppareils(recipes) {
	const applianceSet = new Set();

	recipes.forEach((recipe) => {
		applianceSet.add(recipe.appliance);
	});

	const appareilsKeywords = Array.from(applianceSet);
	return appareilsKeywords;
}

function getUstensiles(recipes) {
	const ustensilesSet = new Set();

	recipes.forEach((recipe) => {
		recipe.ustensils.forEach((ustensil) => {
			ustensilesSet.add(ustensil);
		});
	});

	const ustensilesKeywords = Array.from(ustensilesSet);
	return ustensilesKeywords;
}
