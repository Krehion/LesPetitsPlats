function dropdownKeywordTemplate(item) {
	function getKeywordDOM() {
		// create the structure
		const keywordContainer = document.createElement("button");
		keywordContainer.setAttribute("class", "dropdown-ingredients--keywords--container");
		keywordContainer.innerHTML = item + `<i class="fa-solid fa-circle-xmark"></i>`;

		return keywordContainer;
	}

	return { getKeywordDOM };
}
