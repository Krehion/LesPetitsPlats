function keywordsInputFilter() {
	// Get all search input elements
	const searchInputs = document.getElementsByClassName("dropdown--search--input");
	// Loop through each search input element
	Array.from(searchInputs).forEach(function (searchInput) {
		// Find the closest keyword list related to the current search input
		const keywordList = searchInput.closest(".dropdown").querySelector(".keywords-list");
		if (!keywordList) return; // Skip if no keyword list is found

		const keywords = Array.from(keywordList.getElementsByTagName("button"));

		// Add input event listener to the current search input
		searchInput.addEventListener("input", function () {
			const filter = searchInput.value.toLowerCase();
			keywords.forEach(function (keyword) {
				const text = keyword.textContent.toLowerCase();
				if (text.includes(filter)) {
					keyword.style.display = "";
				} else {
					keyword.style.display = "none";
				}
			});
		});
	});
}

// Call the function when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
	keywordsInputFilter();
});
