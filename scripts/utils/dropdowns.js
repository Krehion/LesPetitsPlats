function unfoldDropdown() {
  const dropdownIngredientsContainer = document.querySelector(
    ".dropdown-ingredients"
  );
  const dropdownAppareilsContainer = document.querySelector(
    ".dropdown-appareils"
  );
  const dropdownUstensilesContainer = document.querySelector(
    ".dropdown-ustensiles"
  );

  const dropdownIngredientsCheck = document.getElementById(
    "dropdown--ingredients--check"
  );
  const dropdownAppareilsCheck = document.getElementById(
    "dropdown--appareils--check"
  );
  const dropdownUstensilesCheck = document.getElementById(
    "dropdown--ustensiles--check"
  );

  dropdownIngredientsCheck.addEventListener("change", function () {
    if (this.checked) {
      dropdownIngredientsContainer.classList.remove("dropdown__closed");
      dropdownIngredientsContainer.classList.add("dropdown__open");
    } else {
      // refold on second click
      dropdownIngredientsContainer.classList.remove("dropdown__open");
      dropdownIngredientsContainer.classList.add("dropdown__closed");
    }
  });

  dropdownAppareilsCheck.addEventListener("change", function () {
    if (this.checked) {
      dropdownAppareilsContainer.classList.remove("dropdown__closed");
      dropdownAppareilsContainer.classList.add("dropdown__open");
    } else {
      // refold on second click
      dropdownAppareilsContainer.classList.remove("dropdown__open");
      dropdownAppareilsContainer.classList.add("dropdown__closed");
    }
  });

  dropdownUstensilesCheck.addEventListener("change", function () {
    if (this.checked) {
      dropdownUstensilesContainer.classList.remove("dropdown__closed");
      dropdownUstensilesContainer.classList.add("dropdown__open");
    } else {
      // refold on second click
      dropdownUstensilesContainer.classList.remove("dropdown__open");
      dropdownUstensilesContainer.classList.add("dropdown__closed");
    }
  });
}

function displayDropdownKeywords(itemKeywords, itemKeywordsSection) {
  itemKeywords.forEach((item) => {
    const keywordModel = dropdownKeywordTemplate(item);
    const keywordDOM = keywordModel.getKeywordDOM();
    itemKeywordsSection.appendChild(keywordDOM);
  });
}

async function displayDropdownIngredients(recipes) {
  // fetch keywords array
  const ingredientsKeywords = await getIngredients(recipes);
  // find container element
  const ingredientsKeywordsSection = document.querySelector(
    ".dropdown-ingredients--keywords"
  );

  displayDropdownKeywords(ingredientsKeywords, ingredientsKeywordsSection);
}

async function displayDropdownUstensiles(recipes) {
  const ustensilesKeywords = await getIngredients(recipes);
  const ustensilesKeywordsSection = document.querySelector(
    ".dropdown-ustensiles--keywords"
  );

  displayDropdownKeywords(ustensilesKeywords, ustensilesKeywordsSection);
}

async function displayDropdownAppareils(recipes) {
  const appareilsKeywords = await getAppareils(recipes);
  const appareilsKeywordsSection = document.querySelector(
    ".dropdown-appareils--keywords"
  );

  displayDropdownKeywords(appareilsKeywords, appareilsKeywordsSection);
}

function initDropdowns() {
  unfoldDropdown();
  keywordsInputFilter(); // defined in keywords-input-filter.js
  displayCancelSearchKeywords();
}
