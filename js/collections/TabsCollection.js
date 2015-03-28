define([
	'jquery',
	'underscore',
	'backbone',
	'models/TabsModel'
], function ($, _, Backbone, Model) {
	return Backbone.Collection.extend({
		model: Model,
		url: 'tabs.json'
	});
});