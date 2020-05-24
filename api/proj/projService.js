const dbService = require('../../services/db.service')
const reviewService = require('../review/review.service')
const ObjectId = require('mongodb').ObjectId

module.exports = {
    query,
    getById,
    getByEmail,
    remove,
    update,
    add,
}


async function query(filterBy = {}) {
    const collection = await dbService.getCollection('projs')
    try {
        if(filterBy.count === 'true'){
            return await collection.find().count()
        }
        if (filterBy.limit && Object.keys(filterBy).length === 1) {
                return await collection.aggregate([{ $sample: { size: +filterBy.limit } }]).toArray();
            } else {
            const criteria = await _buildCriteria(filterBy)
            return filterBy.limit
            ? await collection.find(criteria).skip( +filterBy.skip > 0 ? ( ( +filterBy.skip) * +filterBy.limit ) : 0 ).limit(+filterBy.limit).toArray()
            : await collection.find(criteria).toArray();
        }
    } catch (err) {
        console.log('ERROR: cannot find projs', err)
        throw err;
    }
}
async function getById(projId) {
    console.log(projId, 'projId');
    
    const collection = await dbService.getCollection('projs')
    try {
        const proj = await collection.findOne({ "_id": ObjectId(projId) })
        // var givenReviews = await reviewService.query({ id: ObjectId(proj._id) })
        // proj.rate = givenReviews.reduce((a, b) => a + b.rate, 0) / givenReviews.length;

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


    var criteria = {};
    if (filterBy.name) {
        criteria.$or = [{ title: { $regex: filterBy.name, $options: "i" } }, { description: { $regex: filterBy.name, $options: "i" } }, { organization: { $regex: filterBy.name, $options: "i" } }]
    }
    if (filterBy.categories) {
        criteria.category = { $in: filterBy.categories.split(',') }
    }
    if (filterBy.creators) {
        criteria['createdBy.fullName'] = { $in: filterBy.creators.split(',') }
    }
    if (filterBy.tags) {
        criteria.tags = { $all: filterBy.tags.split(',') }
    }
    if (filterBy.startAt !== 'null' && filterBy.startAt !== undefined) {
        criteria.startAt = { $gte: +filterBy.startAt }
    }
    if (filterBy.endsAt !== 'null' && filterBy.endsAt !== undefined) {
        criteria.endsAt = { $lte: +filterBy.endsAt }
    }
    if (filterBy.id) {
        criteria['createdBy._id'] = { $in: [filterBy.id, ObjectId(filterBy.id)] } 
        // criteria['createdBy._id'] = filterBy.id; 
    }
    return criteria;
}