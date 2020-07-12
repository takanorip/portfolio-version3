module.exports = function (eleventyConfig) {
  const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
  const pluginRss = require("@11ty/eleventy-plugin-rss");
  const markdownIt = require("markdown-it");
  const markdownItAnchor = require("markdown-it-anchor");
  const markdownItTableOfContents = require("@takanorip/markdown-it-table-of-contents");
  const iterator = require("markdown-it-for-inline");
  const format = require("date-fns/format");
  const removeMd = require("remove-markdown");

  eleventyConfig.addLayoutAlias("works", "layouts/works.njk");
  eleventyConfig.addLayoutAlias("blog", "layouts/blog.njk");
  eleventyConfig.addPassthroughCopy("_redirects");
  eleventyConfig.addPassthroughCopy("src/img");
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/js");
  eleventyConfig.addPassthroughCopy("src/**/*.jpg");
  eleventyConfig.addPassthroughCopy("src/**/*.png");
  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addPlugin(pluginRss);

  const options = {
    html: true,
    breaks: true,
    linkify: true,
  };
  const markdownLib = markdownIt(options)
    .use(markdownItAnchor)
    .use(markdownItTableOfContents, {
      includeLevel: [1, 2, 3],
      containerHeaderHtml:
        '<summary class="toc-container-header">TOC</summary>',
    })
    .use(iterator, "url_new_win", "link_open", (tokens, idx) => {
      tokens[idx].attrPush(["target", "_blank"]);
      tokens[idx].attrPush(["rel", "noopener noreferrer"]);
    })
    .use(iterator, "lazy_loading", "image", (tokens, idx) => {
      tokens[idx].attrSet("loading", "lazy");
    });
  eleventyConfig.setLibrary("md", markdownLib);

  eleventyConfig.setFrontMatterParsingOptions({
    excerpt: true,
  });

  const bodyText = (md) => {
    const text = removeMd(md);
    return text.replace(/\[\[toc\]\]/g, "").replace(/\r?\n/g, "");
  };

  eleventyConfig.addCollection("algolia", (collection) => {
    return collection.getFilteredByTags("blog").map((item) => {
      const body = bodyText(item.template.frontMatter.content);
      const object = {
        id: item.fileSlug,
        objectID: item.fileSlug,
        body: body,
        excerpt: body.substr(0, 79) + '...',
        title: item.data.title,
        createdAt: format(item.date, "yyyy-MM-dd"),
      };
      return object;
    });
  });

  eleventyConfig.addNunjucksFilter("dateFormat", (value) => {
    return value instanceof Date ? format(value, "yyyy-MM-dd") : "";
  });

  return {
    templateFormats: ["md", "njk", "html", "liquid"],

    // If your site lives in a different subdirectory, change this.
    // Leading or trailing slashes are all normalized away, so don’t worry about those.

    // If you don’t have a subdirectory, use "" or "/" (they do the same thing)
    // This is only used for link URLs (it does not affect your file structure)
    // You can also pass this in on the command line using `--pathprefix`

    // pathPrefix: "/",

    markdownTemplateEngine: "liquid",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",

    // These are all optional, defaults are shown:
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site",
    },
  };
};
