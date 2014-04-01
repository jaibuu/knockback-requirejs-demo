define(function(require, exports, module) {
    var ko = require('knockout'),
        Backbone = require('backbone'),
        ActorModel = require('models/actor');


    return window.movieModel = Backbone.RelationalModel.extend({
        idAttribute: 'id',
        url: function() {
          return "movie/" + (this.get('id'));
        },
        relations: [
          {
            type: 'HasMany',
            key: 'actors',
            includeInJSON: 'id',
            relatedModel: ActorModel,
            reverseRelation: {
              key: 'movies',
              includeInJSON: 'id'
            }
          }
        ]
        // ,
        // constructor: function() {
        //     Backbone.RelationalModel.prototype.constructor.apply(this, arguments);
        // }
        // constructor: function() {
        //     var self = this;
        //     self.name = ko.observable('testName');
        //     self.releaseYear = ko.observable('testYear');
        //     self.directorName = ko.observable();
        //     self.grossIncome = ko.observable();
        //     self.genre = ko.observable();
        //     self.actors = ko.observableArray();

        //     self.load = function(data){
        //         self.name(data.first_name);
        //         self.releaseYear(data.release_year);
        //         self.directorName(data.director_name);
        //         self.grossIncome(data.gross_income);
        //         self.genre(data.genre);

        //         self.loadActors(data);
        //     };

        //     self.loadActors = function(data){
        //         ko.utils.arrayForEach(data.actors, function(a) {
        //           var actor = new ActorModel(a);
        //           self.actors.push(actor);
        //         });
        //     };


        //     self.onSubmit = function(){
        //         projectJS.collections.movies.add(self);
        //         console.log( projectJS.collections.movies.length );
        //         self.save();
        //     };

        //     self.onDelete = function(){
        //         self.set(self.start_attributes);
        //     };

        // }
    });
});