function activeFilterLabelTemplate(item) {
	function getActiveFilterLabelDOM() {
		// create the structure
		const activeFilterContainer = document.createElement("button");
		activeFilterContainer.setAttribute("class", "active-labels--label");
		activeFilterContainer.innerHTML = item + `<i class="fa-solid fa-xmark"></i>`;

		return activeFilterContainer;
	}

	return { getActiveFilterLabelDOM };
}
