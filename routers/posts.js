const express = require('express');
const router = express.Router();
const postController = require('../controllers/postsController')

// Index (cRud)
router.get('/', postController.Index)

//Show (cRud)
router.get('/:id', postController.Show)

//Store (Crud)
router.post('/', postController.Store)

//Update (crUd)
router.put('/:id', postController.Update)

//Modify (crUd)
router.patch('/:id', postController.Modify)

//Destroy (cruD)
router.delete('/:id', postController.Delete)

module.exports = router;