const Joi = require('@hapi/joi')
const express = require('express')
const router = express.Router()

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

router.get('/', (req, res) => {
    res.send(courses)
})

router.get('/:id', (req, res) => {
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

router.post('/', (req, res) => {

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

router.put('/:id', (req, res) => {

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

router.delete('/:id', (req, res) => {

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

module.exports = router