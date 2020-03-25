console.log('Hello Node, Hi Mongo');
const MongoClient = require('mongodb').MongoClient;

const customerService = require('./services/customer.service');

(async () => {
    // var customers = await customerService.query()
    // console.log('Got Customers: ', customers)


    // var customer = await customerService.getById('5dda4f894ed2226b7002b57f')
    // console.log('Got Customer: ', customer)

    // customer.balance += 100;
    // var updatedCustomer = await customerService.update(customer)
    // console.log('Updated Customer: ', updatedCustomer)

    // const newCustomer = {fullName : 'CaJanush2020'};
    // var addedCustomer = await customerService.add(newCustomer)
    // console.log('Added Customer: ', addedCustomer)

    // const res = await customerService.remove('5dda57887be5cc3cb0b51bd0')
    // console.log('Customer Removed?', res)
})();


// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'car_db';

// tryMongo();

function tryMongo() {
    // Use connect method to connect to the server
    MongoClient.connect(url, (err, client) => {
        if (err) return console.log('Cannot connect to DB');
        console.log("Connected successfully to server");
        const db = client.db(dbName);
        const collection = db.collection('customer');
        // Find some documents
        collection.find({ balance: { $gte: 10 } }).toArray(function (err, docs) {
            if (err) return console.log('Cannot find customers');
            console.log("Found the following records");
            console.log(docs)
        });
        client.close();
    });
}