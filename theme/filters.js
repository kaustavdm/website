/**
 * Filter reserved tags from list of tags
 *
 * @param {array} tags - An array of Eleventy tags
 * @returns {array} - List of tags with system tags removed
 */
function filterTags(tags=[]) {
  return tags.filter((tag) => ["all", "nav", "blog", "drafts", "discussions-with-deb"].indexOf(tag) === -1);
}

module.exports = {
  filterTags,
};
