const { error } = require('console');
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
function index(req, res) {
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
function show(req, res) {
    const result = req.postFound;

    //Return the found post as a JSON object
    res.json(result)
    // console.log(result)
}

//Store (Crud)
function store(req, res) {
    console.log(`You requested to create a new post`, req.body)

    //Check if all required fields are present in the request body
    if (!req.body.title || !req.body.content || !req.body.image || !req.body.tags) {
        //Define the list of mandatory fields
        const requiredFields = ['title', 'content', 'image', 'tags'];
        //Identify which fields are missing or empty
        const missingFields = requiredFields.filter(field => !req.body[field]);
        //Return a 400 error indicating exactly which fields are missing
        return res.status(400).json({ error: 'Bad Request', message: `Missing required fields: ${missingFields}` })
    }

    //Check if a post with the same title already exists (case-insensitive)
    const titleCheck = posts.some(post => post.title.toLowerCase() === req.body.title.toLowerCase());

    //If the title already exists, return error 409 (Conflict status)
    if (titleCheck) {
        return res.status(409).json({ error: 'Conflict', message: 'A post with the same title already exist' })
    }


    //Create a new post object with the required parameters
    const newPost = {
        // id: posts[posts.length - 1].id + 1,
        id: Math.max(...posts.map(post => post.id)) + 1,
        title: req.body.title,
        content: req.body.content,
        image: req.body.image,
        tags: req.body.tags,
    }

    //Add the new post to the local data array
    posts.push(newPost)

    //Respond with the HHTP status 201 (created) and the new object
    return res.status(201).json(newPost)
}

//Update (crUd)
function update(req, res) {
    console.log(`You requested to update the post with id ${req.params.id}`, req.body)

    //Check if all required fields are present in the request body
    if (!req.body.title || !req.body.content || !req.body.image || !req.body.tags) {
        //Define the list of mandatory fields
        const requiredFields = ['title', 'content', 'image', 'tags'];
        //Identify which fields are missing or empty
        const missingFields = requiredFields.filter(field => !req.body[field]);
        //Return a 400 error indicating exactly which fields are missing
        return res.status(400).json({ error: 'Bad Request', message: `Missing required fields: ${missingFields}` })
    }
    const result = req.postFound;
    //Update the post properties with the new data from the request body
    result.title = req.body.title;
    result.content = req.body.content;
    result.image = req.body.image;
    result.tags = req.body.tags;

    //Return the updated post
    return res.json(result)
}

//Modify (crUd)
function modify(req, res) {
    console.log(`You requested to modify the post with id ${req.params.id}`, req.body)
    const result = req.postFound;
    //Update only the properties provided in the request body
    //Check if title exists and is not just empty spaces using Optional Chaining (?.)
    if (req.body.title?.trim()) {
        result.title = req.body.title;
    }
    // Check if content is provided
    if (req.body.content) {
        result.content = req.body.content;
    }
    if (req.body.image) {
        result.image = req.body.image;
    }
    //Ensure tags exists and is an array with at least one element
    if (req.body.tags && req.body.tags.length > 0) {
        result.tags = req.body.tags;
    }

    //Return the updated post
    return res.json(result)
}

//Destroy (cruD)
function destroy(req, res) {
    const id = Number(req.params.id)
    const result = req.postFound;
    //Remove the post from the original array using its index
    posts.splice(posts.indexOf(result), 1);

    console.log(`Deleted post with ID ${id}`, posts)

    //Send status 204 (No Content) to confirm successful deletion
    return res.sendStatus(204)

}

module.exports = {
    index,
    show,
    store,
    update,
    modify,
    destroy
}