const search = instantsearch({
  indexName: "blog",
  searchClient: algoliasearch("T3J60MBUA8", "8f49853dd7e9830263fdea7ff69497ee"),
});

search.addWidgets([
  instantsearch.widgets.configure({
    attributesToSnippet: ["body:40"],
    snippetEllipsisText: "[…]",
  }),
  instantsearch.widgets.searchBox({
    container: "#searchbox",
    placeholder: "Search posts",
    autofocus: true,
  }),
  instantsearch.widgets.poweredBy({
    container: "#poweredby",
  }),
  instantsearch.widgets.hits({
    container: "#hits",
    templates: {
      item(hit) {
        return `
        <a class="takanorip-hitLink" href="/blog/${hit.id}">
          <p class="takanorip-hitName">${hit._highlightResult.title.value}</p>
          <p class="takanorip-hitExcerpt">${hit._snippetResult.body.value}</p>
        </a>
        `;
      },
    },
  }),
  instantsearch.widgets.pagination({
    container: "#pagination",
  }),
]);

search.start();
