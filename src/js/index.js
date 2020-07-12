const search = instantsearch({
  indexName: 'blog',
  searchClient: algoliasearch('T3J60MBUA8', '8f49853dd7e9830263fdea7ff69497ee'),
});

search.addWidgets([
  instantsearch.widgets.searchBox({
    container: '#searchbox',
  }),
  instantsearch.widgets.hits({
    container: '#hits',
    templates: {
      item: `
        <div>
          <div class="hit-name">
            {{#helpers.highlight}}{ "attribute": "title" }{{/helpers.highlight}}
          </div>
          <div class="hit-description">
            {{#helpers.highlight}}{ "attribute": "body" }{{/helpers.highlight}}
          </div>
        </div>
      `,
    },
  }),
  instantsearch.widgets.pagination({
    container: '#pagination',
  }),
]);

search.start();