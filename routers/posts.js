const express = require('express');
const router = express.Router();
const postController = require('../controllers/postsController')

// Index (cRud)
router.get('/', postController.index)

//Show (cRud)
router.get('/:id', postController.show)

//Store (Crud)
router.post('/', postController.store)

//Update (crUd)
router.put('/:id', postController.update)

//Modify (crUd)
router.patch('/:id', postController.modify)

//Destroy (cruD)
router.delete('/:id', postController.destroy)

module.exports = router;