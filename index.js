const express = require('express')
const userRouter = require('./users')
const app = express()

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

var myLogger = function (request, response, next) {
  request.time = new Date()
  next()
}

app.use(myLogger)
app.use(express.static('public'))

app.set('view engine', 'ejs')

app.get('/', function(request, response){
	const kelas = {
		id:1,
		nama: 'Javascript',
		date: request.time.toString()
	}

	// console.log('Hello Word!')
	response.render('pages/index', {kelas: kelas})
})

app.get('/about', function(request, response){
	response.render('pages/about')
})

app.use(userRouter)

app.listen(3000, function(){
	console.log('server is okay')
})