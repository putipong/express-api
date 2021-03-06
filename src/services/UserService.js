/**
 * Created by mattputipong on 10/20/17.
 */

"use strict";

const
	crypto = require( 'crypto' ),
	{ databaseService } = require( '../services/DatabaseService' );

class UserService {
	constructor() {
		this.secret = '1234567890';
		this.collection = 'users';
		this.db = databaseService;
	}

	encrypt( val ) {
		return crypto.createHmac( 'sha256', this.secret ).update( val ).digest( 'hex' );
	}

	newUser( params ) {
		params.password = this.encrypt( params.password );

		return this.db.insertDocument( this.collection, params );
	}

	getUser( params ) {
		params.password = this.encrypt( params.password );

		return this.db.getDocument( this.collection, params );
	}

	randomRequest( params ) {
		return this.db.getDocument( this.collection, params );
	}
}

exports.userSevice = new UserService();