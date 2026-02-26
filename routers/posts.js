const express = require('express');
const router = express.Router();

const posts = require('../data/posts');

// Index (cRud)
router.get('/', (req, res) => {
    // res.send(`You requested the homepage`)
    res.json(posts)
})

//Show (cRud)
router.get('/:id', (req, res) => {
    res.send(`You requested to show the post with id ${req.params.id}`)
})

//Store (Crud)
router.post('/', (req, res) => {
    res.send(`You requested to create a new post`)
})

//Update (crUd)
router.put('/:id', (req, res) => {
    res.send(`You requested to update the post with id ${req.params.id}`)
})

//Modify (crUd)
router.patch('/:id', (req, res) => {
    res.send(`You requested to modify the post with id ${req.params.id}`)
})

//Destroy (cruD)
router.delete('/:id', (req, res) => {
    res.send(`You requested to delete the post with id ${req.params.id}`)
})

module.exports = router;