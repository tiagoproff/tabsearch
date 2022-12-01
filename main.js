import "./style.css";

import {
  resetContent,
  enableOperators,
  disableOperators,
  hasError,
  searchTabs,
} from "./src/functions.js";

import {
  fetchTabs,
  renderTabs,
  previousPage,
  nextPage,
} from "./src/utilities.js";

const contentType = document.getElementById("contenttype");
const searchBar = document.getElementById("searchbar");
const noResultsNextPage = document.getElementById("noresultsnextpage");
const previousPageButton = document.getElementById("previousbtn");
const nextPageButton = document.getElementById("nextbtn");

let PAGE_NUMBER = 1;

contentType.addEventListener("change", (e) => {
  resetContent(async () => {
    disableOperators();

    PAGE_NUMBER = 1; // Reset PAGE_NUMBER when change the category.

    const newPosts = await fetchTabs(e.target.value, PAGE_NUMBER);

    renderTabs(newPosts, () => {
      if (searchBar.value.length != 0) {
        searchTabs(searchBar.value, "slug");
      }

      enableOperators();
    });
  });
});

searchBar.addEventListener("input", (e) => {
  searchTabs(e.target.value, "slug");
});

noResultsNextPage.addEventListener("click", goToNextPage);

previousPageButton.addEventListener("click", goToPreviousPage);

nextPageButton.addEventListener("click", goToNextPage);

function goToPreviousPage() {
  if (PAGE_NUMBER > 1) {
    previousPage(PAGE_NUMBER, (newPage) => {
      PAGE_NUMBER = newPage;

      resetContent(async () => {
        disableOperators();

        const newPosts = await fetchTabs(contentType.value, PAGE_NUMBER);

        renderTabs(newPosts, () => {
          if (searchBar.value.length != 0) {
            searchTabs(searchBar.value, "slug");
          }

          enableOperators();
        });
      });
    });
  }
}

function goToNextPage() {
  nextPage(PAGE_NUMBER, (newPage) => {
    PAGE_NUMBER = newPage;

    resetContent(async () => {
      disableOperators();

      const newPosts = await fetchTabs(contentType.value, PAGE_NUMBER);

      renderTabs(newPosts, () => {
        if (searchBar.value.length != 0) {
          searchTabs(searchBar.value, "slug");
        }

        enableOperators();
      });
    });
  });
}

async function setup() {
  try {
    disableOperators();

    const posts = await fetchTabs(contentType.value, PAGE_NUMBER);

    renderTabs(posts, () => {
      enableOperators();
    });
  } catch (e) {
    hasError(e);
  }
}

document.addEventListener("DOMContentLoaded", setup);
