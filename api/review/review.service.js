const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId

async function getReviewsCount() {
    const collection = await dbService.getCollection('review')
    try {
        return await collection.find().count()
    } catch (err) {
        console.log('ERROR: cannot find count reviews')
        throw err;
    }
}

async function query(filterBy = {}) {
    const criteria = _buildCriteria(filterBy)
    const collection = await dbService.getCollection('review')
    try {
        const reviews = await collection.find(criteria).toArray();
        return reviews
    } catch (err) {
        console.log('ERROR: cannot find reviews')
        throw err;
    }
}

async function remove(reviewId) {
    const collection = await dbService.getCollection('review')
    try {
        await collection.deleteOne({ "_id": ObjectId(reviewId) })
    } catch (err) {
        console.log(`ERROR: cannot remove review ${reviewId}`)
        throw err;
    }
}

async function add(review) {
    review.by._id = ObjectId(review.by._id);
    review.about._id = ObjectId(review.about._id);
    const collection = await dbService.getCollection('review')
    try {
        await collection.insertOne(review);
        return review;
    } catch (err) {
        throw err;
    }
}

async function update(review) {
    const collection = await dbService.getCollection('review')
    review._id = ObjectId(review._id);
    // review.by._id = ObjectId(review.by._id);
    // review.about._id = ObjectId(review.about._id);
    try {
        await collection.replaceOne({ "_id": review._id }, { $set: review })
        return review
    } catch (err) {
        console.log(`ERROR: cannot update review ${review._id}`)
        throw err;
    }
}

function _buildCriteria(filterBy) {
    const criteria = {}
    if (filterBy.id) {
        criteria['about._id'] =  ObjectId(filterBy.id)
    }
    if (filterBy.byId){
        criteria['by._id'] = ObjectId(filterBy.byId)
    }
    return criteria;
}

module.exports = {
    query,
    remove,
    add,
    update,
    getReviewsCount
}