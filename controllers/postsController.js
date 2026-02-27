const posts = require('../data/posts');

// Index (cRud)
function Index(req, res) {
    res.json(posts)
}

//Show (cRud)
function Show(req, res) {
    res.send(`You requested to show the post with id ${req.params.id}`)
}

//Store (Crud)
function Store(req, res) {
    res.send(`You requested to create a new post`)
}

//Update (crUd)
function Update(req, res) {
    res.send(`You requested to update the post with id ${req.params.id}`)
}

//Modify (crUd)
function Modify(req, res) {
    res.send(`You requested to modify the post with id ${req.params.id}`)
}

//Destroy (cruD)
function Delete(req, res) {
    res.send(`You requested to delete the post with id ${req.params.id}`)
}


const functions = {
    Index,
    Show,
    Store,
    Update,
    Modify,
    Delete
}

module.exports = functions