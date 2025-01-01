import markdownIt from "markdown-it";
import markdownItFootnote from "markdown-it-footnote";
import embedEverything from "eleventy-plugin-embed-everything";
import filters from "./theme/filters.js";
import * as sass from "sass";
import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";

export default function (config) {
  // Enable data deep merge
  config.setDataDeepMerge(true);

  // Add SCSS files to watch target
  config.addWatchTarget("./theme/css/*.scss");

  // Syntax highlight
  config.addPlugin(syntaxHighlight);

  // Sass
  config.addTemplateFormats("scss");

  // Creates the extension for use
	config.addExtension("scss", {
		outputFileExtension: "css", // optional, default: "html"

		// `compile` is called once per .scss file in the input directory
		compile: async function (inputContent, inputPath) {
      // We only want to compile main.scss
      // If inputPath does not end with /main.scss, skip
      if (!inputPath.endsWith("/main.scss")) {
        return;
      }
			let result = sass.compileString(inputContent, {
        loadPaths: ["theme/css", "node_modules/@csstools/normalize.css"]
      });

			// This is the render function, `data` is the full data cascade
			return async (data) => {
				return result.css;
			};
		},
	});

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

  // Embed everything
  config.addPlugin(embedEverything);

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

  // // Register all transforms
  // for (const [k, v] of Object.entries(transforms)) {
  //   config.addTransform(k, v);
  // }

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
