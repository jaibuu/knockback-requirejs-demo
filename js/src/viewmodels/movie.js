define(function (require, exports, module) {
    var $ = require('jquery'),
        ko = require('knockout'),
        kb = require('knockback'),
        localStorage = require('localstorage'),
        MovieModel = require('models/movie'),
		actorViewModel = require('viewmodels/actor');


    return kb.ViewModel.extend({
	    constructor: function(model, options) {
	        var self = this;


			var ActorsCollectionObservable = kb.CollectionObservable.extend({
				constructor: function(collection, options) {
					return kb.CollectionObservable.prototype.constructor.call(this, collection, {
						view_model: actorViewModel,
						options: options
					});
				}
			});


			kb.ViewModel.prototype.constructor.call(this, model, {
		        requires: ['id', 'name', 'releaseYear', 'directorName', 'grossIncome', 'genre', 'actors'],
    				factories: {
    				  'actors': ActorsCollectionObservable
    				},
		        options: options
			});

      self.allActors = kb.collectionObservable(projectJS.collections.actors, {
        // view_model: actorViewModel
      });
      // console.log(self.actors());
			self.actors = kb.collectionObservable(this.model().get('actors'), {
				// view_model: actorViewModel
			});

			self.onSubmit = function(){
				if (model.isNew()) {
					projectJS.collections.movies.add(model);
					// console.log('saving new');
					this.model(new MovieModel());
				}

				actors = model.get('actors');
				// console.log(actors);

				model.save(null, {
					success: function() {
						// console.log('success');
					}
				});
				// console.log(model);
			};

			self.onDelete = function(){
        window.model = self.model();
        console.log(self.allActors());
				console.log(self.actors());



			};
	        return self;
		}
    });

})