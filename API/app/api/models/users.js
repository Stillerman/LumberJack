import mongoose, { Mongoose } from 'mongoose'
const arrayUniquePlugin = require('mongoose-unique-array');

const bcrypt = require('bcrypt-nodejs')
const saltRounds = 10


//Define a schema
const Schema = mongoose.Schema

const UserSchema = new Schema({
	name: {
		type: String,
		trim: true,		
		required: true,
	},
	email: {
		type: String,
		trim: true,
		required: true
	},
	password: {
		type: String,
		trim: true,
		required: true
	},
	events: [
		{
			type: Schema.Types.ObjectId,
			ref: 'UserEvent'
		}
	],
	friends: [
		{
			type: Schema.Types.ObjectId,
			unique: true,
			ref: 'User'
		}
	],
	permissions: {
		type: Map,
		of: [String]
	}
})

UserSchema.pre('save', function(next){
	if (this.isNew) this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(saltRounds))
	next()
})

UserSchema.plugin(arrayUniquePlugin)

export var userModel = mongoose.model('User', UserSchema)