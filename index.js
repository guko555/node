const helmet = require('helmet')
const morgan = require('morgan')
const config = require('config')
const debug = require('debug')('app:startup')
const courses = require('./routes/courses')
const home = require('./routes/home')
const express = require('express')
const logger = require('./middleware/logger')
const app = express()

app.set('view engine', 'pug')
// app.set('views', './views')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(helmet())
if (app.get('env') === 'development') {
    app.use(morgan('tiny'))
    console.log('morgan enabled...');
}
app.use(express.static('public'))
app.use(logger)
app.use('/', home)
app.use('/api/courses', courses)


const port = 7000 
app.listen(port, () => console.log(`running on port ${port}...`))

// console.log(app.get('env'));
// console.log(config.get('name'));
// console.log(config.get('mail.host'));
// console.log(config.get('mail.password'));
// debug('starting app...')