function createLabel() {
	const activeFiltersSection = document.querySelector(".active-labels");

	// Select all keywords
	const filterButtons = document.querySelectorAll(".dropdown-ingredients--keywords--container");

	// Add click event listener to each keyword
	filterButtons.forEach((button) => {
		button.addEventListener("click", function () {
			const keywordText = button.textContent;
			const activeFilterLabel = activeFilterLabelTemplate(keywordText);
			const activeFilterLabelDOM = activeFilterLabel.getActiveFilterLabelDOM();
			activeFiltersSection.appendChild(activeFilterLabelDOM);

			// Attach delete event to the newly created label
			activeFilterLabelDOM.addEventListener("click", function () {
				activeFilterLabelDOM.remove();
			});

			// Change keyword class to "selected": prevents adding same label twice
			button.classList.add("dropdown-ingredients--keywords--container__selected");
			button.classList.remove("dropdown-ingredients--keywords--container");
		});
	});
}

function deleteLabel() {
	const allLabels = document.querySelectorAll(".active-filters--label");

	allLabels.forEach((button) => {
		button.addEventListener("click", function () {
			button.remove();
		});
	});
}
