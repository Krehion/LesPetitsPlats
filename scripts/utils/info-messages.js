function displayEmptyResultMessage(filteredRecipes) {
  const emptyResultMessage = document.querySelector(".empty-result-message");

  if (filteredRecipes.length === 0) {
    emptyResultMessage.style.display = "block";
  } else {
    emptyResultMessage.style.display = "none";
  }
}
