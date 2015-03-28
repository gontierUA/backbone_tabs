define([
	'jquery',
	'underscore',
	'backbone',
	'views/TabsView',
	'collections/TabsCollection'
], function ($, _, Backbone, TabsView, TabsCollection) {
	var AppRouter = Backbone.Router.extend();

	var tabs = new TabsCollection();

	tabs.comparator = function (singleTab) { // sort tabs by 'order'
		return singleTab.get('order');
	};

	var tabsView = new TabsView({model: tabs});

	tabs.fetch({
		success: function () {
			tabsView.render();

			if (Backbone.history.fragment) { // it's not the best place for this
				$('#tabList').find('#tab-' + Backbone.history.fragment).addClass('active');
			} else {
				$('#tabList').children('.m-tab__item').first().children().addClass('active');
			}
		}
	});

	var initialize = function () {
		var app_router = new AppRouter;

		app_router.route("", function () { // load first tab for if route is empty
			tabs.fetch({
				success: function () {
					var firstTabId = tabs.at(0).id;
					require(['views/tabs/' + firstTabId], function (loadedView) {
						new loadedView({el: $("#TabContent")}).render();
					});
				}
			});
		});

		app_router.route(":page", function (page) {
			var $tabList = $('#tabList');
			$tabList.find('.active').removeClass('active');
			$tabList.find('a').filter('[href$=' + page + ']').addClass('active');

			require(['js/views/tabs/' + page + '.js'], function (loadedView) {
				new loadedView({el: $("#TabContent")}).render();
			});
		});

		Backbone.history.start({pushState: true});

		$('body').on('click', 'a[href^="/"]', function (e) { // all app urls
			e.preventDefault();
			app_router.navigate($(this).attr('href'), {trigger: true})
		});
	};

	return {
		initialize: initialize
	}
});