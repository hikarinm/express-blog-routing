const posts = require('../data/posts');

// Index (cRud)
// function Index(req, res) {
//     //Initialize result with the full list of posts
//     let result = posts;

//     //If a 'tag' query parameter is provided, filter the posts array
//     if (req.query.tag) {
//         result = posts.filter(post => post.tags.includes(req.query.tag)) //Matches the exact string
//     }

//     console.log('Filtered posts', result)

//     //Send the resulting list as a JSON response
//     res.json(result)
// }

//Index (cRud) case-insensitive
function Index(req, res) {
    //Initialize result with the full list of posts
    let result = posts;

    //If a 'tag' query parameter is provided, filter the posts array (case-insensitive)
    if (req.query.tag) {
        //Normalize the query parameter to lowercase for case-insensitive matching
        const queryTag = req.query.tag.toLowerCase();
        //Filter posts where at least one tag matches the query string
        result = posts.filter(post =>
            //.some() checks if at least one tag in the array satisfies the condition
            post.tags.some(tag => tag.toLowerCase() === queryTag))
    }

    console.log('Filtered posts', result)

    //Send the resulting list as a JSON response
    res.json(result)
}

//Show (cRud)
function Show(req, res) {
    // res.send(`You requested to show the post with id ${req.params.id}`)

    //Convert the ID from string parameters to a Number
    const id = Number(req.params.id);

    //Validate that the ID is a valid number
    if (isNaN(id)) {
        return res.status(400).json({ error: 'Error', message: `${id} is not a valid ID` })

    }

    //Search for the specific post that matches the given ID 
    const result = posts.find(post => post.id === id);

    //Handle the case where no post matches the given ID
    if (!result) {
        return res.status(404).json({ error: 'Not found', message: `No post found with ID ${id} ` })
    }

    //Return the found post as a JSON object
    res.json(result)
    // console.log(result)
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
function Destroy(req, res) {
    // res.send(`You requested to delete the post with id ${req.params.id}`)

    //Convert the ID from string parameters to a Number
    const id = Number(req.params.id);

    //Validate that the ID is a valid number
    if (isNaN(id)) {
        return res.status(400).json({ error: 'Error', message: `${id} is not a valid ID` })

    }

    //Search for the specific post that matches the given ID 
    const result = posts.find(post => post.id === id);

    //Handle the case where no post matches the given ID
    if (!result) {
        return res.status(404).json({ error: 'Not found', message: `No post found with ID ${id} ` })
    }

    //Remove the post from the original array using its index
    posts.splice(posts.indexOf(result), 1);

    console.log(`Deleted post with ID ${id}`, posts)

    //Send status 204 (No Content) to confirm successful deletion
    return res.sendStatus(204)

}


const functions = {
    Index,
    Show,
    Store,
    Update,
    Modify,
    Destroy
}

module.exports = functions