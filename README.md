Introduction
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