define(function (require, exports, module) {
    var $ = require('jquery'),
        ko = require('knockout'),
        kb = require('knockback'),
        localStorage = require('localstorage'),
        ActorModel = require('models/actor'),
    movieViewModel = require('viewmodels/movie');


    return kb.ViewModel.extend({
	    constructor: function(model, options) {
	        var self = this;


      var MoviesCollectionObservable = kb.CollectionObservable.extend({
        constructor: function(collection, options) {
          return kb.CollectionObservable.prototype.constructor.call(this, collection, {
            view_model: movieViewModel,
            options: options
          });
        }
      });


			kb.ViewModel.prototype.constructor.call(this, model, {
		        requires: ['id', 'firstName', 'lastName', 'gender', 'birthDate', 'movies'],
            factories: {
              'movies': MoviesCollectionObservable
            },
		        options: options
			});

      self.allMovies = kb.collectionObservable(projectJS.collections.movies, {
        // view_model: movieViewModel
      });

      console.log(self.movies());
      self.movies = kb.collectionObservable(this.model().get('movies'), {
        // view_model: movieViewModel
      });

			self.onSubmit = function(){
				if (model.isNew()) {
					projectJS.collections.actors.add(model);
					console.log('saving new');
					this.model(new ActorModel());
				}

        movies = model.get('movies');
        console.log(movies);

				model.save(null, {
					success: function() {
						console.log('success');
					}
				});
				console.log(model);
			};

			self.onDelete = function(){

			};

	        return self;
		}
    });

})