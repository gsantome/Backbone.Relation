Backbone.Relation
====================

Always we are getting some data into our models and if the json have a sub object we need to convert to backbone model by us. This plugin will help us to make it easy and simple.

How to use
==========

Using the plugin
--
     TaskContainerModel = Backbone.Relation.extend({
       relation: {
         model: Backbone.Model,
         key: 'task'
       }
    }

or

     TaskContainerModel = Backbone.Relation.extend({
       relation: {
         model: Backbone.Collection,
         key: 'task'
       }
    }

or

     TaskContainerModel = Backbone.Relation.extend({
       relation: [{
         model: Backbone.Model,
         key: 'task'
       },
       {
         model: Backbone.Collection,
         key: 'users'
       }]
    }

or if you are using RequireJS and you need circular dependency you could use PATH

     TaskContainerModel = Backbone.Relation.extend({
       relation: {
         model: MyModel,
         key: 'task',
         path: 'path/models/mymodel'
       }
    }

