// Main searchbar

function displayCancelSearchMain() {
  const searchInput = document.querySelector(".search-input");
  const cancelContainer = document.querySelector(".search--cancel--container");
  const cancelInput = document.querySelector(".search--cancel");

  searchInput.addEventListener("input", () => {
    if (searchInput.value.length > 0) {
      cancelContainer.style.display = "inline-block";
    } else {
      cancelContainer.style.display = "none";
    }
  });

  cancelInput.addEventListener("click", () => {
    if (cancelContainer.style.display === "inline-block") {
      cancelContainer.style.display = "none";
      searchInput.value = "";
    }
  });
}

// Keywords searchbars (in dropdowns)

function displayCancelSearchKeywords() {
  const searchInputs = document.querySelectorAll(".dropdown--search--input");

  searchInputs.forEach((searchInput) => {
    // Get the parent container for the current search input
    const parentContainer = searchInput.closest(".dropdown--search");

    // Find the cancel container and cancel input within the same parent container
    const cancelContainer = parentContainer.querySelector(
      ".dropdown--search--cancel--container"
    );
    const cancelInput = parentContainer.querySelector(
      ".dropdown--search--cancel"
    );

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

      // trigger the input event to reset the keyword visibility
      const event = new Event("input", { bubbles: true });
      searchInput.dispatchEvent(event);
    });
  });
}

function keywordsInputFilter() {
  // Get all search input elements
  const searchInputs = document.getElementsByClassName(
    "dropdown--search--input"
  );
  // Loop through each search input element
  Array.from(searchInputs).forEach(function (searchInput) {
    // Find the closest keyword list related to the current search input
    const keywordList = searchInput
      .closest(".dropdown")
      .querySelector(".keywords-list");
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
