/**
 * injectPartial
 * @description takes an html string and injects new html string based on the
 *     set priority and tag location
 */

export function injectPartial(base_html, { options, html, priority, location }) {

  let tag;
  let regex;
  let replacement;

  if ( location === 'head' && priority === 'high' ) {
    tag = '<meta charset="utf-8">';
    regex = new RegExp(tag, 'i');
  } else {
    tag = targetTag(priority, location);
    regex = new RegExp(tag.replace('/', '\/'), 'i');
  }

  if ( priority === 'low' ) {
    replacement = `${html}${tag}`;
  } else {
    replacement = `${tag}${html}`;
  }

  return base_html.replace(regex, replacement);

}


/**
 * targetTag
 * @description Creates an opening or closing html tag string based on priority and location
 */

function targetTag(priority, location) {
  return `<${priority === 'high' ? '' : '/'}${location}>`;
}