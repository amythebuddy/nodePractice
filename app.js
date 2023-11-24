const Joi = require('joi'); //capital because Joi is a class
const express = require('express');
const app = express();


//GET: GET a customer
//PUT: UPDATE a customer
//DELETE: DELETE a customer
//POST: CREATE a customer

app.use(express.json()); // for POST

const courses = [
    {id: 1, name: 'js'},
    {id: 2, name: 'java'},
    {id: 3, name: 'py'}
];
app.get('/', (req, res) => {
    res.send('Hello World!!!');
});

app.get('/api/courses', (req, res) => {
    res.send(courses);
});

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find((c => c.id === parseInt(req.params.id)));
    if(!course) res.status(404).send('The courses with the given ID was not found');
    res.send(course);
});

//updating the courses
app.post('/api/courses', (req, res) => {
    //object destructing
    const { error } = validateCourse(req.body); // result.error

    //Validate the course
    //If invalid, return 400
    if(error) return res.status(400).send(error.details[0].message);

    const course = {
        id: courses.length + 1,
        name: req.body.name
    }
    courses.push(course);
    res.send(course);
});

app.put('/api/courses/:id', (req, res) => {
    // Look up the course with the given id
    // If not existing, return 404
    const course = courses.find((c => c.id === parseInt(req.params.id)));
    if(!course) return res.status(404).send('The courses with the given ID was not found');

    const { error } = validateCourse(req.body); // result.error

    //Validate the course
    //If invalid, return 400
    if(error) return res.status(400).send(error.details[0].message);
    
    //Update course
    course.name = req.body.name;
    //Return the updated course
    res.send(course);
});

app.delete('/api/courses/:id', (req, res) => {
    /// Look up the course with the given id
    // If not existing, return 404
    const course = courses.find((c => c.id === parseInt(req.params.id)));
    if(!course) return res.status(404).send('The courses with the given ID was not found');

    //delete the course
    const index = courses.indexOf(course);
    courses.splice(index, 1);

    res.send(courses);
});

const port = process.env.PORT || 3000; // creating environmental variable for the website to run on other machines
app.listen(port, () => console.log(`Listening on port ${port}...`));

function validateCourse(course){
    const schema = {
        name: Joi.string().min(3).required()
    };

    return Joi.validate(course, schema);
}