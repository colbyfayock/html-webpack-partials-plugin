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
  /**
   *   Option: replaceElement
   *   Behavior: Replaces location element instead of becoming child of element
   */
  if(priority === "replace"){
    pattern = `<${location}(.*?)>(.*?)<\/${location}>`;
    regex = new RegExp(pattern, 'ig');
    return base_html.replace(regex, html);
  }

  tag = targetTag(priority, location);

  regex = createTagRegExp(tag);

  return base_html.replace(regex, replacementByPriority(priority, tag, html));

}

/**
 * createTagRegExp
 * @description Creates a new RegExp using a tag including escaping and patterns
 */

function createTagRegExp(tag) {
  let pattern = tag;

  // Escape the characters of the tag itself

  pattern = pattern.replace('/', '\/');
  pattern = pattern.replace('<', '\<');

  // Add matching for any attributes after the tag

  pattern = pattern.replace('>', '(?:\>| [^>]*\>)');

  return new RegExp(pattern, 'ig');
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