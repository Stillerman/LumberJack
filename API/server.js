import express from 'express'
import logger from 'morgan'
import movies from './routes/movies'
import users from './routes/users'
import userEvents from './routes/userEvents'
import nouns from './routes/nouns'
import eventTypes from './routes/eventTypes'

import {validateUser} from './auth'

import { urlencoded } from 'body-parser'
import { connection } from './config/database' //database configuration
import cors from 'cors'

const app = express()

app.set('secretKey', 'nodeRestApi'); // jwt secret token
app.use(cors())
// connection to mongodb
connection.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.use(logger('dev'))
app.use(urlencoded({extended: false}))

app.get('/', function(req, res){
res.send('Lumberjack API Server')
})


app.use('/users', users)

app.use('/movies', validateUser, movies)

app.use('/userEvents', validateUser, userEvents)
app.use('/nouns', validateUser, nouns)
app.use('/eventTypes', validateUser, eventTypes)


app.get('/favicon.ico', function(req, res) {
    res.sendStatus(204)
})


// express doesn't consider not found 404 as an error so we need to handle 404 it explicitly
// handle 404 error
app.use(function(req, res, next) {
	let err = new Error('Not Found')
    err.status = 404
    next(err)
})

// handle errors
app.use(function(err, req, res, next) {
	console.log(err)
	
  if(err.status === 404)
  	res.status(404).json({message: "Not found"})
  else	
    res.status(500).json({message: "Something looks wrong :( !!!", err})

})

app.listen(3000, function(){
	console.log('Node server listening on port 3000')
})
