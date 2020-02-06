const express = require('express')
const plotController = require('../controllers/plots')
const feedController = require('../controllers/feed')
const router = express.Router()
// const authCheck = require('../app')

// plotController.getPlots

// GET /api/plots
router.get('/posts', feedController.getPosts)
router.get('/test', feedController.socketTest)
// POST 

router.post('/post', feedController.createPost)
// dev get

router.get('/plots', plotController.getPlots)
router.get('/plots2', plotController.getGeoInd)
router.get('/plots3', plotController.testGeo)


module.exports = router