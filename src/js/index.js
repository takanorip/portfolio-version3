const search = instantsearch({
  indexName: 'blog',
  searchClient: algoliasearch('T3J60MBUA8', '8f49853dd7e9830263fdea7ff69497ee'),
});

search.addWidgets([
  instantsearch.widgets.searchBox({
    container: '#searchbox',
    placeholder: 'Search posts',
    autofocus: true,
  }),
  instantsearch.widgets.poweredBy({
    container: '#poweredby',
  }),
  instantsearch.widgets.hits({
    container: '#hits',
    templates: {
      item: `
        <a class="takanorip-hitLink" href="/blog/{ "attribute": "id" }">
          <div class="takanorip-hitName">
            {{#helpers.highlight}}{ "attribute": "title" }{{/helpers.highlight}}
          </div>
        </a>
      `,
    },
  }),
  instantsearch.widgets.pagination({
    container: '#pagination',
  })
]);

search.start();
