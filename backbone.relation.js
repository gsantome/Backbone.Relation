/**
 * Backbone.Relation.js 0.1.1
 * (c) 2014 Gonzalo Santomé (https://github.com/gsantome/Backbone.Relation)
 *
 * Backbone.Relation may be freely distributed under the MIT license; see the accompanying LICENSE.txt.
 * For details and documentation: https://github.com/gsantome/Backbone.Relation.
 * Depends on Backbone (and thus on Underscore as well): https://github.com/documentcloud/backbone.
 *
 * Example:
 *
	TaskContainerModel = Backbone.Relation.extend({
		relation: {
			model: Backbone.Model,
			key: 'task'
		}
	});

	or

	TaskContainerModel = Backbone.Relation.extend({
		relation: {
			model: Backbone.Collection,
			key: 'tasks'
		}
	});

	or 

	TaskContainerModel = Backbone.Relation.extend({
		relation: [{
			model: Backbone.Collection,
			key: 'tasks'
		}, {
			model: Backbone.Model,
			key: 'user'
		}]
	});
	
	or  if you are using RequireJS and you need circular dependency you could use PATH

	TaskContainerModel = Backbone.Relation.extend({
		relation: {
			model: MyModel,
			key: 'tasks'
			path: 'path/models/mymodel'
		}
	});

	// When user fetch a model or initialize a model TaskContainerModel everyting inside
	// the response or the values with the name 'task' will go to a new Model, or to a Collection
 */
( function( root, factory ) {
	// Set up Backbone.Relation for the environment. Start with AMD.
	if( typeof define === 'function' && define.amd ) {
		define([ 'require', 'exports', 'backbone', 'underscore' ], factory);
	}
	// Next for Node.js or CommonJS.
	else if( typeof exports !== 'undefined' ) {
		factory(require, exports, require('backbone'), require('underscore') );
	}
	// Finally, as a browser global. Use `root` here as it references `window`.
	else {
		factory( root.require, root, root.Backbone, root._ );
	}
}( this, function( require, exports, Backbone, _ ) {
	"use strict";

	Backbone.Relation = Backbone.Model.extend({
		
		relation: null,

		initialize: function( attrs, options ) {
			
			var relation = this.relation;

			if( relation && attrs ) {

				if( _.isArray( relation ) ) {

					_(relation).forEach(function( theReleation ) {
						
						this.initializeStructure( attrs, theReleation );

					}, this);

				}
				else {

					this.initializeStructure( attrs, relation );

				}

			}

		},

		parse: function( response ) {
			
			var relation = this.relation;

			if( _.isArray( relation ) ) {

				_(relation).forEach(function( theReleation ) {
					
					this.initializeStructure( response, theReleation );

				}, this);

			}
			else {

				this.initializeStructure( response, relation );

			}

			return response;
		},

		initializeStructure: function( response, relation ) {

			if( response[relation.key] ) {
				var Clazz = relation.model || relation.collection;
				
				/*
				* Sometime circular dependency get the object = undefined. So we are loading here.
				*/
				if( !Clazz ) { 
					Clazz = require(relation.path);
				}

				if( !(response[relation.key] instanceof Backbone.Collection) && !(response[relation.key] instanceof Backbone.Model) ) {
						
					var objectz;
					
					if( response[relation.key] instanceof Backbone.Collection ) {
						objectz = new Clazz();
						objectz.reactReset(response[relation.key]);
					}
					else {
						objectz = new Clazz(response[relation.key]);
					}

					this.set(relation.key, objectz);

					response[relation.key] = objectz;
				
				}
				
			}

		}

	});

}));