
const dbService = require('./db.service')
const ObjectId = require('mongodb').ObjectId

module.exports = {
    query,
    getById,
    remove,
    update,
    add
}

async function query(filterBy = {}) {
    const criteria = {};
    if (filterBy.txt) {
        criteria.name = filterBy.txt
    }
    if (filterBy.minBalance) {
        criteria.balance = {$gte : filterBy.minBalance}
    }
    const collection = await dbService.getCollection('customer')
    try {
        const customers = await collection.find(criteria).toArray();
        return customers
    } catch (err) {
        console.log('ERROR: cannot find customers')
        throw err;
    }
}

async function getById(customerId) {
    const collection = await dbService.getCollection('customer')
    try {
        const customer = await collection.findOne({"_id":ObjectId(customerId)})
        return customer
    } catch (err) {
        console.log(`ERROR: cannot find customer ${customerId}`)
        throw err;
    }
}

async function remove(customerId) {
    const collection = await dbService.getCollection('customer')
    try {
        return await collection.deleteOne({"_id":ObjectId(customerId)})
    } catch (err) {
        console.log(`ERROR: cannot remove customer ${customerId}`)
        throw err;
    }
}

async function update(customer) {
    const collection = await dbService.getCollection('customer')
    try {
        await collection.updateOne({"_id":ObjectId(customer._id)}, {$set : customer})
        return customer
    } catch (err) {
        console.log(`ERROR: cannot update customer ${customer._id}`)
        throw err;
    }
}

async function add(customer) {
    const collection = await dbService.getCollection('customer')
    try {
        await collection.insertOne(customer);
        return customer;
    } catch (err) {
        console.log(`ERROR: cannot insert customer`)
        throw err;
    }
}


