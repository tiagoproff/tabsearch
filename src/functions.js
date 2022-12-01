export function disableOperators() {
  document.getElementById("searchbar").setAttribute("disabled", "true");
  document.getElementById("contenttype").setAttribute("disabled", "true");

  document.getElementById("previousbtn").classList.add("hidden");
  document.getElementById("nextbtn").classList.add("hidden");
}

export function enableOperators() {
  document.getElementById("searchbar").removeAttribute("disabled");
  document.getElementById("contenttype").removeAttribute("disabled");

  document.getElementById("previousbtn").classList.remove("hidden");
  document.getElementById("nextbtn").classList.remove("hidden");
}

export function resetContent(callback) {
  if (!document.getElementById("error").classList.contains("hidden")) {
    document.getElementById("error").classList.add("hidden");
  }

  if (!document.getElementById("noresults").classList.contains("hidden")) {
    document.getElementById("noresults").classList.add("hidden");
  }

  document.getElementById("tabcontents").innerHTML = "";
  document.getElementById("loading").classList.remove("hidden");
  document.getElementById("resultscount").innerText = "0";

  document.getElementById("page").innerText = "X";
  document.getElementById("category").innerText = "XXXXXXX";

  callback();
}

export function hasError(error) {
  document.getElementById("tabcontents").innerHTML = "";
  document.getElementById("loading").classList.add("hidden");
  document.getElementById("resultscount").innerText = "0";

  document.getElementById("error").classList.remove("hidden");
  document.getElementById("errormessage").innerText = error;
}

export function searchTabs(term, filterBy) {
  if (filterBy == "slug") {
    filterBySlug(term);
  }

  // "Filter by Author" goes here.
}

function filterBySlug(term) {
  const slugify = (str) => {
    return str
      .toLowerCase()
      .normalize("NFD")
      .replace(/\p{Mn}/gu, "")
      .replace(/\s/g, "-");
  };

  const sluggedTerm = slugify(term);

  const allRenderedTabs = Array.from(document.querySelectorAll("[data-slug]"));

  allRenderedTabs.forEach((tab) => {
    let tabSlug = tab.getAttribute("data-slug");

    if (tabSlug.indexOf(sluggedTerm) == -1) {
      tab.classList.add("hidden");
    } else {
      if (tab.classList.contains("hidden")) {
        tab.classList.remove("hidden");
      }
    }
  });

  const availableTabs = allRenderedTabs.filter((tab) => {
    return !tab.classList.contains("hidden");
  });

  if (availableTabs.length == 0) {
    document.getElementById("resultscount").innerText = "0";
    document.getElementById("noresults").classList.remove("hidden");
    document.getElementById("searchterm").innerText = term;
  } else {
    if (!document.getElementById("noresults").classList.contains("hidden")) {
      document.getElementById("noresults").classList.add("hidden");
    }

    document.getElementById("resultscount").innerText = availableTabs.length;
  }
}
