function displayEmptyResultMessage(filteredRecipes) {
  const emptyResultMessage = document.querySelector(".empty-result-message");
  const messageVariable = document.querySelector(
    ".empty-result-message--user-input"
  );
  const mainSearchInput = document.querySelector(".search-input");
  const userInput = mainSearchInput.value.toLowerCase();
  messageVariable.textContent = userInput;

  if (filteredRecipes.length === 0) {
    emptyResultMessage.style.display = "block";
  } else {
    emptyResultMessage.style.display = "none";
  }
}
