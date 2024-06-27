function displayCancelSearchDropdown() {
	const searchInputs = document.querySelectorAll(".dropdown--search--input");

	searchInputs.forEach((searchInput) => {
		// Get the parent container for the current search input
		const parentContainer = searchInput.closest(".dropdown--search");

		// Find the cancel container and cancel input within the same parent container
		const cancelContainer = parentContainer.querySelector(".dropdown--search--cancel--container");
		const cancelInput = parentContainer.querySelector(".dropdown--search--cancel");

		searchInput.addEventListener("input", () => {
			if (searchInput.value.length > 0) {
				cancelContainer.style.display = "inline-block";
			} else {
				cancelContainer.style.display = "none";
			}
		});

		cancelInput.addEventListener("click", () => {
			cancelContainer.style.display = "none";
			searchInput.value = "";
		});
	});
}

displayCancelSearchDropdown();
