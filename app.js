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
			      $.each(questions, function( i, question ) {
			
					$(self.container).append("<input type=\"checkbox\" value=\"" + question._id + "\"><strong>" + question.text + "</strong><br/>");
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