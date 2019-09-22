const Joi = require('@hapi/joi')
const helmet = require('helmet')
const morgan = require('morgan')
const config = require('config')
const express = require('express')
const logger = require('./logger')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(helmet())

if (app.get('env') === 'development') {
    app.use(morgan('tiny'))
    console.log('morgan enabled...');
}

console.log(app.get('env'));

console.log(config.get('name'));
console.log(config.get('mail.host'));
console.log(config.get('mail.password'));

app.use(express.static('public'))
app.use(logger)

let courses = [
    {
        id: 1,
        name: 'js'
    },
    {
        id: 2,
        name: 'html'
    },
    {
        id: 3,
        name: 'css'
    }
]


function validateData(data) {

    const schema = Joi.object({
        name: Joi.string().min(3).max(10).required()
    })
    const result = schema.validate(data)
    return result
}

app.get('/', (req, res) => {
    res.status(200).send(req.body)
})

app.get('/api/courses', (req, res) => {
    res.send(courses)
})

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if (course) {
        res.status(200)
        res.send(course)
    }
    else {
        res.status(404)
        res.send('not found')
    }
})

app.post('/api/courses', (req, res) => {

    const { error } = validateData(req.body)

    if (error) {
        res.status(400).send(error.details[0].message)
    }
    else {
        const course = {
            id: courses.length + 1,
            name: req.body.name
        }

        courses.push(course)

        res.status(200).send(courses)
    }

})

app.put('/api/courses/:id', (req, res) => {

    const course = courses.find(c => c.id === parseInt(req.params.id))
    if (!course) {
        res.status(404)
        res.send('not found')
        return
    }

    const { error } = validateData(req.body)
    if (error) {
        res.status(400).send(error.details[0].message)
    }
    else {

        course.name = req.body.name
        res.status(200).send({
            courses,
        })
    }

})

app.delete('/api/courses/:id', (req, res) => {

    const course = courses.find(c => c.id === parseInt(req.params.id))
    if (!course) {
        res.status(404)
        res.send('not found')
        return
    }

    const index = courses.indexOf(course)
    const str = courses.splice(index, 1)
    console.log(str)

    res.status(200)
    res.send(courses)
})




const port = process.env.PORT || 7000
app.listen(port, () => console.log(`running on port ${port}...`))