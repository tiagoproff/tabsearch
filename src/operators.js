export async function fetchTabs(category, page) {
  const tabs = await fetch(
    `https://www.tabnews.com.br/api/v1/contents?strategy=${category}&page=${page}`
  );

  const posts = await tabs.json();

  document.getElementById("page").innerText = page;

  switch (category) {
    case "relevant":
      document.getElementById("category").innerText = "Relevantes";
      break;
    case "new":
      document.getElementById("category").innerText = "Recentes";
      break;
    case "old":
      document.getElementById("category").innerText = "Mais Antigo";
      break;
  }

  return posts;
}

export function renderTabs(contents, callback) {
  document.getElementById("resultscount").innerText = contents.length;
  document.getElementById("loading").classList.add("hidden");

  contents.forEach((content) => {
    document.getElementById("tabcontents").innerHTML += `
    <div class="Box-row" data-slug="${content.slug}">
      <a
        class="no-underline"
        noopener
        noreferrer
        href="https://www.tabnews.com.br/${content.owner_username}/${content.slug}/"
        target="_blank"
      >
        <h3 class="Box-title f3 color-fg-accent">${content.title}</h3>
      </a>
      <p class="f6 mt-2 color-fg-subtle">
        <strong>
          <a
            class="no-underline color-fg-subtle"
            noopener
            noreferrer
            href="https://www.tabnews.com.br/${content.owner_username}/"
          >
            ${content.owner_username}
          </a>
        </strong>
        • ${content.tabcoins} tabcoins
      </p>
    </div>
    `;
  });

  if (callback) {
    callback();
  }
}

export function previousPage(currentPage, callback) {
  currentPage--;

  callback(currentPage);
}

export function nextPage(currentPage, callback) {
  currentPage++;

  callback(currentPage);
}
