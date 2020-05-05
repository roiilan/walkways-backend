const dbService = require('../../services/db.service')
const reviewService = require('../review/review.service')
const ObjectId = require('mongodb').ObjectId

module.exports = {
    query,
    getById,
    getByEmail,
    remove,
    update,
    add
}

async function query(filterBy = {}) {

    const criteria = _buildCriteria(filterBy)
    const collection = await dbService.getCollection('projs')
    try {
    console.log('criteria: ', criteria);

        // var sortObj = {}
        // if (filterBy.sort) {
        //     if (filterBy.sort === 'name') {
        //         sortObj = { name: 1 }
        //     } else {
        //         sortObj = { price: 1 }
        //     }
        // }
        const projs = await collection.find(criteria).toArray();

        // const projs = await collection.find(criteria).collation({ locale: "en" })
            // .sort(sortObj).toArray();

        //     await projs.forEach(async proj=> {
        //     var givenReviews = await reviewService.query({ id: ObjectId(proj._id) })
        //     proj.rate = givenReviews.reduce((a, b) => a + b.rate, 0) / givenReviews.length;
        //     console.log(proj.rate, 'proj.rate');
        //     console.log(givenReviews.length, 'givenReviews.length');

        // })
        // projs.forEach(async proj=> {
        //     var givenReviews = await reviewService.query({ id: ObjectId(proj._id) })
        //     proj.rate = givenReviews.reduce((a, b) => a + b.rate, 0) / givenReviews.length;
        //     console.log(proj.rate, 'proj.rate');
        //     console.log(givenReviews.length, 'givenReviews.length');

        // })
        // ('criteria', criteria);

        // ('BACKED PROJSERVICE', projs);

        return projs
    } catch (err) {
        ('ERROR: cannot find projs')
        throw err;
    }
}

async function getById(projId) {
    const collection = await dbService.getCollection('projs')
    try {
        const proj = await collection.findOne({ "_id": ObjectId(projId) })
        var givenReviews = await reviewService.query({ id: ObjectId(proj._id) })
        proj.rate = givenReviews.reduce((a, b) => a + b.rate, 0) / givenReviews.length;

        return proj
    } catch (err) {
        (`ERROR: while finding proj ${projId}`)
        throw err;
    }
}
async function getByEmail(email) {
    const collection = await dbService.getCollection('projs')
    try {
        const proj = await collection.findOne({ email })
        return proj
    } catch (err) {
        (`ERROR: while finding proj ${email}`)
        throw err;
    }
}

async function remove(projId) {
    const collection = await dbService.getCollection('projs')
    try {
        await collection.deleteOne({ "_id": ObjectId(projId) })
    } catch (err) {
        (`ERROR: cannot remove proj ${projId}`)
        throw err;
    }
}

async function update(proj) {
    const collection = await dbService.getCollection('projs')
    proj._id = ObjectId(proj._id);
    try {
        await collection.replaceOne({ "_id": proj._id }, { $set: proj })
        // ('backend proj', proj);

        return proj
    } catch (err) {
        (`ERROR: cannot update proj ${proj._id}`)
        throw err;
    }
}

async function add(proj) {
    const collection = await dbService.getCollection('projs')
    try {
        await collection.insertOne(proj);
        return proj;
    } catch (err) {
        (`ERROR: cannot insert proj`)
        throw err;
    }
}

function _buildCriteria(filterBy) {
    // ('filter in back service', filterBy);

    const criteria = {};
    if (filterBy.name) {
        criteria.$or = [{title: { $regex: filterBy.name, $options: "i" }}, {description: { $regex: filterBy.name, $options: "i" }}, {organization: { $regex: filterBy.name, $options: "i" }}]
        // if (filterBy.name) criteria.name = { $regex: filterBy.name }
    }
    if (filterBy.categories) {
        criteria.category = { $in: filterBy.categories.split(',') }
    }
    if (filterBy.tags) {
        criteria.tags = { $all: filterBy.tags.split(',') }
    }
    if (filterBy.startAt !== 'null' && filterBy.startAt !== undefined) {
        console.log(filterBy.startAt, '/////////////////////////////////filterBy.startAt');
        
        criteria.startAt = {  $ite: +filterBy.startAt }
    }
    if (filterBy.endsAt !== 'null' && filterBy.endsAt !== undefined) {
        criteria.endsAt = { $gte: +filterBy.endsAt }
    }

    // if (filterBy.category !== 'all') {
    //     criteria.type = filterBy.category

    // }
    // ('criteria in back service', criteria);
    return criteria;
}