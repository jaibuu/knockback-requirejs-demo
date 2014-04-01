requirejs.config({
    baseUrl: 'js/src',
    paths: {
        lib: '../lib',
        'knockback' : '../lib/knockback',
        'backbone' : '../lib/backbone',
        'backbone-relational' : '../lib/backbone-relational',
        'underscore' : '../lib/underscore',
        'jquery' : '../lib/jquery-2.1.0',
        'knockout' : '../lib/knockout-3.1.0',
        'localstorage': "../lib/backbone.localStorage",
        'backbone-modelref' : "../lib/backbone-modelref"
    },

    shim: {
        'lib/backbone-localStorage': ['backbone'],
        underscore: {
          exports: '_'
        },
        backbone: {
          exports: 'Backbone',
          deps: ['jquery', 'underscore']
        },
        knockout: {
          exports: 'ko'
        },
        knockback: {
          exports: 'kb',
          deps: ['backbone', 'underscore', 'knockout']
        },
        'backbone-relational' : {
            deps: ['backbone']
        }
    }
});


require(['backbone','router', 'models/movie', 'models/actor', 'knockback', 'backbone-relational', 'backbone-modelref'], function (Backbone, Router, movie, actor) {
    

    var projectJsApp = function(){
      this.router = new Router();
      this.collections = {};

      this.collections.movies = Backbone.Collection.extend({
        localStorage: new Store('movies-projectjs'),
        model:movie
      });
      this.collections.movies = new this.collections.movies();


      this.collections.actors = Backbone.Collection.extend({
        localStorage: new Store('actors-projectjs'),
        model:actor
      });
      this.collections.actors = new this.collections.actors();


    }
    projectJsApp.prototype.init = function(){
      this.collections.movies.fetch();
      this.collections.actors.fetch();
      Backbone.history.start();
    };


    window.projectJS = new projectJsApp();
    projectJS.init();




    
});