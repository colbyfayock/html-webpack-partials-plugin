const { JSDOM } = require('jsdom');
/**
 * injectPartial
 * @description takes an html string and injects new html string based on the
 *     set priority and tag location
 */

module.exports.injectPartial = function (
  base_html,
  { options, html, priority, location }
) {
  // this will contain the DOM representation of the template
  const dom = new JSDOM(base_html);
  const targetElements = dom.window.document.querySelectorAll(location);
  targetElements.forEach((targetElement) => {
    targetElement.insertAdjacentHTML(
      priority === 'high' ? 'afterbegin' : 'beforeend',
      html
    );
  });

  return dom.serialize();
};
