'use strict';

var $ = require("jquery");

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

    	var self = this;

        if (self.container) {

			$.getJSON( "http://localhost:8080/api/questions")
			    .done(function(questions) {

		    		var html = "<input type=\"checkbox\" value=\"{id}\"> <strong>{text}</strong> <br />";

			      	$.each(questions, function( i, question ) {
			
						var out = html.replace(/\{id\}/, question.id)
									  .replace(/\{text\}/, question.text);

						$(self.container).append(out);
			      	});
			    });
        }
    }

    post() {
    	var self = this;

    	if (self.container) {

    	}
    }
}

module.exports = DPA;