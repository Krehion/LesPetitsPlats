async function getRecipes() {
	const response = await fetch("../../data/recipes.js");
	if (!response.ok) {
		console.log("Failed to fetch recipes data");
		return [];
	}
	const scriptText = await response.text(); // Get the script content as text
	const recipesFunction = new Function(scriptText + "; return recipes;"); // Create a function to evaluate the script
	const recipes = recipesFunction(); // Execute the function to get the recipes
	return recipes;
}

async function displayRecipes(recipes) {
	const recipeCardsSection = document.querySelector(".recipes");

	recipes.forEach((recipe) => {
		const recipeCardModel = recipeCardTemplate(recipe);
		const recipeCardDOM = recipeCardModel.getRecipeCardDOM();
		recipeCardsSection.appendChild(recipeCardDOM);
	});
}

async function getIngredients(recipes) {
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

async function getAppareils(recipes) {
	const applianceSet = new Set();

	recipes.forEach((recipe) => {
		applianceSet.add(recipe.appliance);
	});

	const appareilsKeywords = Array.from(applianceSet);
	return appareilsKeywords;
}

async function getUstensiles(recipes) {
	const ustensilesSet = new Set();

	recipes.forEach((recipe) => {
		recipe.ustensils.forEach((ustensil) => {
			ustensilesSet.add(ustensil);
		});
	});

	const ustensilesKeywords = Array.from(ustensilesSet);
	return ustensilesKeywords;
}

async function displayDropdownKeywords(ingredientsKeywords, ingredientsKeywordsSection) {
	ingredientsKeywords.forEach((ingredient) => {
		const keywordModel = dropdownKeywordTemplate(ingredient);
		const keywordDOM = keywordModel.getKeywordDOM();
		ingredientsKeywordsSection.appendChild(keywordDOM);
	});
}

async function init() {
	// fetch recipes' data
	const recipes = await getRecipes(); // Get the recipes array
	// access the recipes array
	displayRecipes(recipes);

	const ingredientsKeywords = await getIngredients(recipes);
	const ingredientsKeywordsSection = document.querySelector(".dropdown-ingredients--keywords");
	const ustensilesKeywords = await getUstensiles(recipes);
	const ustensilesKeywordsSection = document.querySelector(".dropdown-ustensiles--keywords");
	const appareilsKeywords = await getAppareils(recipes);
	const appareilsKeywordsSection = document.querySelector(".dropdown-appareils--keywords");

	displayDropdownKeywords(ingredientsKeywords, ingredientsKeywordsSection);
	displayDropdownKeywords(ustensilesKeywords, ustensilesKeywordsSection);
	displayDropdownKeywords(appareilsKeywords, appareilsKeywordsSection);

	unfoldDropdown();
	displayCancelSearch();
}

init();
