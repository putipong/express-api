/**
 * Created by mattputipong on 10/19/17.
 */

'use strict';

const
	mongo = require( 'mongodb' ),
	conf  = require( '../../config.json' );

class DatabaseService {
	constructor( collection ) {
		this.config = conf.mongo;

		this.client = mongo.MongoClient;
		this.db     = null;
	}

	// set collection( col ) {
	// 	this.collection = col;
	// }

	connect( callback ) {
		this.client.connect( this.config.url, ( err, db ) => {
			this.db = db;
			return callback( err );
		} );
	}

	close( callback ) {
		this.db.close();
		return callback();
	}

	insertDocument( col, params ) {
		const collection = this.db.collection( col );

		return collection.insert( params );
	}

	getDocument( col, params ) {
		const collection = this.db.collection( col );

		return collection.findOne( params );
	}
}

exports.databaseService = new DatabaseService();