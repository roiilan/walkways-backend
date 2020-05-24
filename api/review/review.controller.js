const logger = require('../../services/logger.service')
const reviewService = require('./review.service')

// TODO: needs error handling! try, catch

async function getReviews(req, res) {
    try {
        if (req.params.id === 'count') {
            const reviewsCount = await reviewService.getReviewsCount()
            res.json(reviewsCount)
        } else {

            const reviews = await reviewService.query(req.params)
            res.json(reviews)
        }
    } catch (err) {
        logger.error('Cannot get reviews', err);
        res.status(500).send({ error: 'cannot get reviews' })

    }
}

async function deleteReview(req, res) {
    await reviewService.remove(req.params.id)
    res.end()
}

async function addReview(req, res) {
    var review = await reviewService.add(req.body)
    res.send(review)
}

async function updateReview(req, res) {
    var review = await reviewService.update(req.body)
    res.send(review)
}

module.exports = {
    getReviews,
    deleteReview,
    addReview,
    updateReview
}