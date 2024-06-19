function recipeCardTemplate(data) {
	const { image, name, ingredients, time, description } = data;

	function getRecipeCardDOM() {
		// create all needed elements
		const article = document.createElement("article");
		const imgContainer = document.createElement("div");
		imgContainer.setAttribute("class", "img-container");
		const img = document.createElement("img");
		img.setAttribute("src", image);
		img.setAttribute("alt", name);
		const txtContainer = document.createElement("div");
		txtContainer.setAttribute("class", "txt-container");
		const cardTitle = document.createElement("h2");
		cardTitle.textContent = name;
		const recipeDescriptionTitle = document.createElement("h3");
		recipeDescriptionTitle.textContent = "Recette";
		const recipeDescription = document.createElement("p");
		recipeDescription.textContent = description;
		const ingredientsTitle = document.createElement("h3");
		ingredientsTitle.textContent = "Ingrédients";
		const ingredientsGrid = document.createElement("div");
		ingredientsGrid.setAttribute("class", "ingredients-grid");
		ingredients.forEach((item) => {
			const ingredientContainer = document.createElement("div");
			ingredientContainer.setAttribute("class", "ingredient-container");
			const ingredientName = document.createElement("p");
			ingredientName.textContent = item.ingredient;
			const ingredientDetail = document.createElement("p");
			ingredientDetail.textContent = `${item.quantity || ""} ${item.unit || ""}`.trim();
			// append elements here : need to be in the forEach
			ingredientContainer.appendChild(ingredientName);
			ingredientContainer.appendChild(ingredientDetail);
			ingredientsGrid.appendChild(ingredientContainer);
		});
		const timeContainer = document.createElement("div");
		timeContainer.setAttribute("class", "time-container");
		const timeContent = document.createElement("p");
		timeContent.textContent = time + " min";

		// articulate elements in order

		article.appendChild(imgContainer);
		imgContainer.appendChild(img);
		article.appendChild(txtContainer);
		txtContainer.appendChild(cardTitle);
		txtContainer.appendChild(recipeDescriptionTitle);
		txtContainer.appendChild(recipeDescription);
		txtContainer.appendChild(ingredientsTitle);
		txtContainer.appendChild(ingredientsGrid);
		article.appendChild(timeContainer);
		timeContainer.appendChild(timeContent);

		return article;
	}

	return { getRecipeCardDOM };
}
