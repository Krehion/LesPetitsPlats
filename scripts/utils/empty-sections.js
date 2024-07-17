function emptyCards() {
  const recipeCardsSection = document.querySelector(".recipes");
  recipeCardsSection.innerHTML = "";
}

function emptyCounter() {
  const counterContainer = document.querySelector(".total-recipes--number");
  counterContainer.innerHTML = "";
}

function emptyKeywordsLists() {
  const keywordsLists = document.querySelectorAll(".keywords-list");
  keywordsLists.forEach((keywordsList) => {
    keywordsList.innerHTML = "";
  });
}

function emptyAll() {
  emptyCards();
  emptyCounter();
  emptyKeywordsLists();
}
