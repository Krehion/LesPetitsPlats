function emptyCards() {
  const recipeCardsSection = document.querySelector(".recipes");
  recipeCardsSection.innerHTML = "";
}

function emptyCounter() {
  const counterContainer = document.querySelector(".total-recipes--number");
  counterContainer.innerHTML = "";
}
