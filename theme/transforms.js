const sass = require("sass");

function minifyCSS(content, outputPath) {
  outputPath = this.outputPath || outputPath;
  if (outputPath.endsWith(".css")) {
    const rendered = sass.renderSync({
      data: content,
      includePaths: ["theme/css", "node_modules/@csstools/normalize.css"],
      outputStyle: "compressed"
    });
    return rendered.css.toString("utf-8");
  }
  return content;
}

module.exports = {
  minifyCSS
}
