function dropdownKeywordTemplate(item) {
	function getKeywordDOM() {
		// create the structure
		const keywordContainer = document.createElement("button");
		keywordContainer.setAttribute("class", "dropdown-ingredients--keywords--container");
		keywordContainer.textContent = item;

		return keywordContainer;
	}

	return { getKeywordDOM };
}
