import mongoose from 'mongoose'
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
	}
});

UserSchema.pre('save', function(next){
	this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(saltRounds))
	next()
})

export var userModel = mongoose.model('User', UserSchema)