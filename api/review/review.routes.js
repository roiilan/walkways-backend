const express = require('express')
const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware')
const { addReview, updateReview, getReviews, deleteReview } = require('./review.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/:id?', getReviews)
router.post('/', addReview)
router.put('/', updateReview)
    // router.put('/:id',  updateReview)
router.delete('/:id', deleteReview)
    // router.post('/',  requireAuth, addReview)
    // router.delete('/:id',  requireAuth, deleteReview)

module.exports = router