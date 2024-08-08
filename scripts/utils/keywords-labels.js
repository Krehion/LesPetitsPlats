function createLabel(activeItemDiv, xxxKeywordsSelected) {
  // Clear existing content
  activeItemDiv.innerHTML = "";
  // Generate label for each item in itemKeywordsSelected
  xxxKeywordsSelected.forEach((item) => {
    const capitalizedItem = capitalizeFirstLetter(item);
    const labelModel = activeFilterLabelTemplate(capitalizedItem);
    const labelDOM = labelModel.getActiveFilterLabelDOM();
    activeItemDiv.appendChild(labelDOM);
  });
}

function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

function manageLabels(
  ingredientsKeywordsSelected,
  ustensilesKeywordsSelected,
  appareilsKeywordsSelected
) {
  // find container element
  const activeIngredientsDiv = document.querySelector(".active-ingredients");
  const activeAppareilsDiv = document.querySelector(".active-appareils");
  const activeUstensilesDiv = document.querySelector(".active-ustensiles");

  createLabel(activeIngredientsDiv, ingredientsKeywordsSelected);
  createLabel(activeUstensilesDiv, ustensilesKeywordsSelected);
  createLabel(activeAppareilsDiv, appareilsKeywordsSelected);
}
