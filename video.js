const Joi = require('joi'); //capital because Joi is a class
const express = require('express');
const video = express();

video.use(express.json());

const genres = [
    {id: 1, genre : 'horror'},
    {id: 2, genre : 'comedy'},
    {id: 3, genre : 'romance'},
    {id: 4, genre : 'fiction'}
];

video.get('/api/genres/', (req, res) => {
    res.send(genres);
}); 

video.get('/api/genres/:id', (req, res) => {
    const gen = genres.find((c => c.id === parseInt(req.params.id)));
    if(!gen) return res.status(404).send('The genre with given ID is not found');
    res.send(gen);
});

video.post('/api/genres/', (req, res) => {
    const gen = genres.find((c => c.id === parseInt(req.params.id)));
    if(!gen) return res.status(404).send('The genre with given ID is not found');
    
    
});

video.listen('/vidly.com', () => console.log('Listening on vidly.com'));