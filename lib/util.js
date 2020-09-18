const { JSDOM } = require("jsdom");
const Entities = require("html-entities").AllHtmlEntities;
const entities = new Entities();

/**
 * injectPartial
 * @description takes an html string and injects new html string based on the
 *     set priority and tag location
 */

module.exports.injectPartial = function (
  base_html,
  { options, html, priority, location }
) {
  let tag;
  let regex;
  //   console.log("base html:", base_html);
  //   console.log("html:", html);

  // this will contain the DOM representation of the template
  const dom = new JSDOM(base_html);
  const targetElement = dom.window.document.querySelector(location);
  targetElement.insertAdjacentHTML(
    priority == "high" ? "afterbegin" : "beforeend",
    html
  );

  // dom.serialize() would give out the overall resultant HTML
  //entities.decode() should replace all &amp; type HTML entities with actual Unicode
  // but is isn't working exactly how we want 😕
  // console.log(entities.decode(dom.serialize()));
  return entities.decode(dom.serialize());
};

/**
 * createTagRegExp
 * @description Creates a new RegExp using a tag including escaping and patterns
 */

function createTagRegExp(tag) {
  let pattern = tag;
  // Escape the characters of the tag itself

  pattern = pattern.replace("/", "/");
  pattern = pattern.replace("<", "<");

  // Add matching for any attributes after the tag

  pattern = pattern.replace(">", "[^>]*>");

  return new RegExp(pattern, "ig");
}

/**
 * targetTag
 * @description Creates an opening or closing html tag string based on priority and location
 */

function targetTag(priority, location) {
  return `<${priority === "high" ? "" : "/"}${location}>`;
}

/**
 * replacementByPriority
 * @description Given the priority, creates a string with the tag and html in the correct order
 */

function replacementByPriority(priority, tag, html) {
  if (priority === "low") {
    return `${html}${tag}`;
  }
  return `${tag}${html}`;
}
