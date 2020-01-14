const express = require('express')

const feedController = require('../controllers/feed')
const router = express.Router()


// GET /api/plots
router.get('/posts', feedController.getPosts)

// POST 

router.post('/post', feedController.createPost)

module.exports = router