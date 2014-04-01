define(function (require, exports, module) {
    var $ = require('jquery'),
        kb = require('knockback'),
		movieViewModel = require('viewmodels/movie'),
		actorViewModel = require('viewmodels/actor');


    return kb.ViewModel.extend({
	    constructor: function(model, options) {
	        var self = this;

            this.movies = kb.collectionObservable(projectJS.collections.movies, {
				view_model: movieViewModel
		    });

            this.actors = kb.collectionObservable(projectJS.collections.actors, {
				view_model: actorViewModel
		    });

	        return self;
		}
    });

})