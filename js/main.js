requirejs.config({
	paths: {
		jquery: 'libs/jquery/jquery-2.1.3.min',
		backbone: 'libs/backbone/backbone-min',
		underscore: 'libs/underscore/underscore-min'
	},
	'shim': {
		'underscore': {
			'exports': '_'
		},
		'backbone': {
			'deps': ['jquery', 'underscore'],
			'exports': 'Backbone'
		}
	}
});

require([
	'app'
], function (App) {
	App.initialize();
});