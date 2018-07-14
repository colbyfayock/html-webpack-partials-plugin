const fs = require('fs');
const path = require('path');
const _template = require('lodash/template');

/**
 * Partial
 * @description Instance of a partial file
 */

class Partial {

  constructor(settings = {}) {
    this.path = settings.path;
    this.location = settings.location || 'body';
    this.priority = settings.priority || 'low';
    this.should_inject = typeof settings.inject === 'undefined' ? true : !!(settings.inject);
    this.template_filename = settings.template_filename || 'index.html';
    this.options = Object.assign({}, settings.options);
  }

  /**
   * createTemplate
   * @description Reads the file path and transforms it into a loash template
   */

  createTemplate() {
    const file = fs.readFileSync(path.resolve(this.path), 'utf8');
    this.template = _template(file);
    return this.template;
  }

}

module.exports = Partial;