define(function(require, exports, module) {
    var ko = require('knockout'),
        Backbone = require('backbone'),
        MovieModel = require('models/movie');


    return window.actorModel = Backbone.RelationalModel.extend({
        idAttribute: 'id',
        // defaults: {
        //   movies:[]
        // },
        url: function() {
          return "actor/" + (this.get('id'));
        },
        relations: [
          {
            type: 'HasMany',
            key: 'movies',
            includeInJSON: 'id',
            relatedModel: MovieModel,
            reverseRelation: {
              key: 'actors',
              includeInJSON: 'id'
            }
          }
        ]
    });
});