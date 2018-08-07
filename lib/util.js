/**
 * injectPartial
 * @description takes an html string and injects new html string based on the
 *     set priority and tag location
 */

module.exports.injectPartial = function(base_html, { options, html, priority, location }) {

  let tag;
  let regex;

  if ( location === 'head' && priority === 'high' ) {

    tag = '<meta charset="utf-8">';
    regex = new RegExp(tag, 'i');

    // If we can actually find the tag in the source, replace early and return

    if ( regex.test(base_html) ) {
      return base_html.replace(regex, replacementByPriority(priority, tag, html));
    }

  }

  tag = targetTag(priority, location);
  regex = new RegExp(tag.replace('/', '\/'), 'i');

  return base_html.replace(regex, replacementByPriority(priority, tag, html));

}


/**
 * targetTag
 * @description Creates an opening or closing html tag string based on priority and location
 */

function targetTag(priority, location) {
  return `<${priority === 'high' ? '' : '/'}${location}>`;
}


/**
 * replacementByPriority
 * @description Given the priority, creates a string with the tag and html in the correct order
 */

function replacementByPriority(priority, tag, html) {
  if ( priority === 'low' ) {
    return `${html}${tag}`;
  }
  return `${tag}${html}`;
}