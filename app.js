'use strict';

var $ = require("jquery");
var request = require("request");

/**
 * Handles all your DPA needs
 * @param options
 * @constructor
 */

class DPA {

    constructor(container, options) {
        this.options = options;
        this.container = container;
    }

    init() {
        if (this.container) {



            $(this.container).append("<strong>this is where something is gonna happen</strong>");
        }
    }
}

module.exports = DPA;