const markdownIt = require("markdown-it");
const markdownItFootnote = require("markdown-it-footnote");

module.exports = function (config) {
  // Customize markdown parsing
  config.setLibrary("md", markdownIt({
    html: true,
    breaks: true,
    linkify: true,
    typographer: true
  }).use(markdownItFootnote));

  // Passthrough copy assets
  config.addPassthroughCopy("assets");

  // Set collection for blog posts
  config.addCollection("blog", function (collection) {
    return collection.getFilteredByGlob("blog/*.md");
  });

  // Set collection for blog drafts
  config.addCollection("drafts", function (collection) {
    return collection.getFilteredByGlob("drafts/*.md");
  });

  function filterTagList(tags) {
    return (tags || []).filter(
      (tag) => ["all", "nav", "blog", "drafts"].indexOf(tag) === -1
    );
  }

  // Add filterTagList as a filter
  config.addFilter("filterTagList", filterTagList);

  // Set collection for tags
  config.addCollection("tagList", function (collection) {
    let tagSet = new Set();
    collection.getAll().forEach((item) => {
      (item.data.tags || []).forEach((tag) => tagSet.add(tag));
    });
    return filterTagList(Array.from(tagSet).sort());
  });

  return {
    markdownTemplateEngine: "liquid",
    htmlTemplateEngine: "liquid",
    templateFormats: ["html", "md", "liquid"],
  };
};
