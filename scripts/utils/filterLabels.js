function createLabel() {
	const activeFiltersSection = document.querySelector(".active-labels");

	// Select all keywords
	const filterButtons = document.querySelectorAll(".dropdown-ingredients--keywords--container");

	// Add click event listener to each keyword
	filterButtons.forEach((button) => {
		button.addEventListener("click", function () {
			const keywordText = button.textContent;

			// Check if the keyword is already selected
			if (button.classList.contains("dropdown-ingredients--keywords--container__selected")) {
				// Remove the label if the keyword is already selected
				const activeFilterLabels = document.querySelectorAll(".active-labels--label");
				activeFilterLabels.forEach((label) => {
					if (label.textContent === keywordText) {
						label.remove();
					}
				});

				// Toggle the classes back to unselected state
				button.classList.remove("dropdown-ingredients--keywords--container__selected");
				button.classList.add("dropdown-ingredients--keywords--container");
			} else {
				// Create and add the label
				const activeFilterLabel = activeFilterLabelTemplate(keywordText);
				const activeFilterLabelDOM = activeFilterLabel.getActiveFilterLabelDOM();
				activeFiltersSection.appendChild(activeFilterLabelDOM);

				// Attach delete event to the newly created label
				activeFilterLabelDOM.addEventListener("click", function () {
					activeFilterLabelDOM.remove();
					// Toggle the button classes back to unselected state
					button.classList.remove("dropdown-ingredients--keywords--container__selected");
					button.classList.add("dropdown-ingredients--keywords--container");
				});

				// Change keyword class to "selected": prevents adding same label twice
				button.classList.add("dropdown-ingredients--keywords--container__selected");
				button.classList.remove("dropdown-ingredients--keywords--container");
			}
		});
	});
}

function deleteLabel() {
	const activeFilterButtons = document.querySelectorAll(".dropdown-ingredients--keywords--container__selected");

	// Delete when clicking on the active keyword in the dropdown
	activeFilterButtons.forEach((button) => {
		button.addEventListener("click", function () {
			const keywordText = button.textContent;

			// Remove the label
			const activeFilterLabels = document.querySelectorAll(".active-labels--label");
			activeFilterLabels.forEach((label) => {
				if (label.textContent === keywordText) {
					label.remove();
				}
			});

			// Toggle the button classes back to unselected state
			button.classList.remove("dropdown-ingredients--keywords--container__selected");
			button.classList.add("dropdown-ingredients--keywords--container");
		});
	});
}
