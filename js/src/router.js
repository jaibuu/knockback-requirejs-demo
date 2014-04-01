define(function (require) {
    "use strict";

    var $           = require('jquery'),
    Backbone    = require('backbone'),
    kb    = require('knockback'),
    ko    = require('knockout'),
    movieViewModel = require('viewmodels/movie'),
    actorViewModel = require('viewmodels/actor'),
    homeListsViewModel = require('viewmodels/lists'),
    MovieModel = require('models/movie'),
    ActorModel = require('models/actor');

    return Backbone.Router.extend({
        _domElement : null,

        routes : {
            '' : 'home',
            'movie(/)(:id)' : 'movie',
            'actor(/)(:id)' : 'actor'
        },

        home : function(){
             this.loadPage(  kb.renderTemplate('home', new homeListsViewModel() ) ) ;
        },

        movie : function(id){
            // var movieVM = new movieViewModel();
            // ko.applyBindings(movieVM);

            if(id){
                var model = projectJS.collections.movies.get(id);
                // var model = MovieModel.findOrCreate(id);
                // var model = new Backbone.ModelRef(projectJS.collections.movies, id);
                 this.loadPage( kb.renderTemplate('movie',  new movieViewModel( model ) ) ) ;
            } else {
                 this.loadPage( kb.renderTemplate('movie',  new movieViewModel( new MovieModel() ) ) ) ;
            }

        },

        actor : function(id){
            if(id){
                var model = projectJS.collections.actors.get(id);
                // var model = new Backbone.ModelRef(projectJS.collections.actors, id);
                this.loadPage( kb.renderTemplate('actor',  new actorViewModel( model ) ) ) ;
            } else {
                this.loadPage( kb.renderTemplate('actor',  new actorViewModel( new ActorModel() ) ) ) ;
            }
        },

        loadPage : function(el) {

            try{
                if (this._domElement) {ko.removeNode(this._domElement); }
            } catch(e){

            }
            $('body').find('.page.active').remove();
            $('body').append(this._domElement = el);
            $(el).addClass('active');
        }


    });
});