const logger = require('../../services/logger.service')
const reviewService = require('./review.service')
 
// TODO: needs error handling! try, catch

async function getReviews(req, res) {
    try {
        console.log('req.query line 8:', req.query);
        console.log('req.params line 9:', req.params.id);
        // const id = {id: ObjectId(req.params.id) }
        // console.log(id);
        
        const reviews = await reviewService.query({id: req.params.id})
        res.json(reviews)
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
    var review = req.body;
    
    // review.byUserId = req.session.user._id;
    review = await reviewService.add(review)
    // review.byUser = req.session.user;
    // TODO - need to find aboutUser
    // review.aboutUser = {} 
    res.send(review)
}

async function updateReview(req, res){
    var review = req.body;
    console.log('review in controller:', review);
    
    review = await reviewService.update(review)
    res.send(review)
}

module.exports = {
    getReviews,
    deleteReview,
    addReview,
    updateReview
}