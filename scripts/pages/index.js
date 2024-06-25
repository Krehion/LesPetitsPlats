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

async function getIngredients() {
	const recipes = await getRecipes();
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

async function getAppareils() {}

async function getUstensiles() {}

async function displayDropdownKeywords(ingredientsKeywords) {
	const ingredientsKeywordsSection = document.querySelector(".dropdown-ingredients--keywords");

	ingredientsKeywords.forEach((ingredient) => {
		console.log(ingredient);
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

	const ingredientsKeywords = await getIngredients();

	displayDropdownKeywords(ingredientsKeywords);

	unfoldDropdown();
}

init();
