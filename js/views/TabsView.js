// Filename: router.js
define([
	'jquery',
	'underscore',
	'backbone'
], function ($, _, Backbone) {
	return Backbone.View.extend({
		el: "#tabList",
		template: _.template($('#tabsTemplate').html()), // define template
		events: {
			"click .icon.doc": "select"
		},
		render: function () {
			_.each(this.model.models, function (tab) { // each tab to template
				var tabsTemplate = this.template(tab.toJSON());
				$(this.el).append(tabsTemplate);
			}, this);

			return this;
		}
	});
});
