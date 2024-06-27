function recipeCounter() {
	const counterContainer = document.querySelector(".total-recipes--number");

	let recipeElements = document.getElementsByClassName("recipes--card");
	let sum = 0;
	for (let i = 0; i < recipeElements.length; i++) {
		sum += 1;
	}

	counterContainer.innerHTML = sum;

	console.log(sum);
	// return counterContainer;
}
