function displayCancelSearch() {
	const searchInput = document.querySelector(".search-input");
	const cancelContainer = document.querySelector(".search--cancel--container");

	searchInput.addEventListener("input", () => {
		if (searchInput.value.length > 0) {
			cancelContainer.style.display = "inline-block";
		} else {
			cancelContainer.style.display = "none";
		}
	});
}
