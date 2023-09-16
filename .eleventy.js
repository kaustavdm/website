const markdownIt = require("markdown-it");
const markdownItFootnote = require("markdown-it-footnote");
const filters = require("./theme/filters");
const transforms = require("./theme/transforms");

module.exports = function (config) {
  // Enable data deep merge
  config.setDataDeepMerge(true);

  // Add SCSS files to watch target
  config.addWatchTarget("./theme/css/*.scss");

  // Customize markdown parsing
  config.setLibrary(
    "md",
    markdownIt({
      html: true,
      breaks: true,
      linkify: true,
      typographer: true,
    }).use(markdownItFootnote)
  );

  // Set Liquid options
  config.setLiquidOptions({
    dynamicPartials: true,
    strictFilters: false,
  });

  // Passthrough copy assets
  config.addPassthroughCopy("assets/");

  // Register all filters
  for (const [k, v] of Object.entries(filters)) {
    config.addFilter(k, v);
  }

  // Set collection for tags
  config.addCollection("tagList", function (collection) {
    let tagSet = new Set();
    collection.getAll().forEach((item) => {
      (item.data.tags || []).forEach((tag) => tagSet.add(tag));
    });
    return filters.filterTags(Array.from(tagSet).sort());
  });

  // Register all transforms
  for (const [k, v] of Object.entries(transforms)) {
    config.addTransform(k, v);
  }

  return {
    dir: {
      input: ".",
      output: "_site",
      includes: "theme/includes",
      data: "theme/data",
    },
    markdownTemplateEngine: "liquid",
    htmlTemplateEngine: "liquid",
    templateFormats: ["html", "md", "liquid", "txt"],
  };
};
