'use strict';

var $ = require("jquery");

/**
 * Handles all your DPA needs
 * @param options
 * @constructor
 */

class DPA {

    constructor(tenant_id) {
        this.tenant_id = tenant_id;
    }

    init(container, config) {

        var self = this;

        self.config = config;
        self.container = container;

        if (self.container) {

            $.getJSON( "http://localhost:8080/api/questions")
                .done(function(questions) {

                    self.questions = $.map(questions, function(q) { return q._id; });

                    var input_css = "";
                    if (self.config.input_css) input_css = " class=\"" + self.config.input_css + "\"";

                    var form_group = self.config.form_group ? self.config.form_group : "form-group";
                    var form_check = self.config.form_check ? self.config.form_check : "form-check";
                    var form_check_label = self.config.form_check_label ? self.config.form_check_label : "form-check-label";
                    var form_check_input = self.form_check_input ? self.form_check_input : "form-check-input";
                    
                    var container = `<div class=\"${form_group}\">\r\n` + 
                                    `\t<div class=\"${form_check}\">\r\n` + 
                                    `\t\t<label class=\"${form_check_label}\">\r\n` + 
                                    `\t\t\t<input id=\"{id}\" class=\"${form_check_input}\" type=\"checkbox\" value=\"{value}\">{text}</input>\r\n` +
                                    `\t\t</label>\r\n` + 
                                    `\t</div>\r\n` + 
                                    `</div>`;

                    $.each(questions, function( i, question ) {
            
                        var out = container.replace(/\{id\}/, question._id)
                                           .replace(/\{text\}/, question.text);

                        $(self.container).append(out);
                    });
                });
        }
    }

    save(submission, onSubmit) {

        var self = this;

        if (self.container) {

            var questionControls = $(self.questions.reduce(function(a, b) {
                return ((!/^\#/.test(a)) ? '#' + a : a) + ', #' + b;
            }));

            var payload = {
                tenant_id   : self.tenant_id,                  // Identifies the site
                
                site_domain : $(location).attr('host'),        // The hostname of the current page
                site_path   : $(location).attr('pathname'),    // The page url hosting the control, 

                contact_externId    : submission.customerId,   // The id of this customer at the clients site
                contact_firstName   : submission.firstName,    // The first name of the customer
                contact_lastName    : submission.lastName,     // The last name of the customer
                contact_email       : submission.email,        // The email address of the customer 
                contact_mobNumber   : submission.mobNumber,    // The mobile telephone number of the customer
                contact_postcode    : submission.postcode,     // The mobile telephone number of the customer

                answers : $.map(questionControls, function(ctrl) {
                    return {
                        question_id : ctrl.id, 
                        answer      : ctrl.checked
                    };
                })
            };

            $.post("http://localhost:8080/api/submissions", payload, function(response) {

                if (onSubmit) {
                    onSubmit(response.submission_id);
                }

            }, "json")          
        }
    }
}

module.exports = DPA;