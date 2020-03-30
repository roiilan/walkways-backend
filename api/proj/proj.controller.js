const projService = require('./projService')

async function getPoj(req, res) {
    const proj = await projService.getById(req.params.id)
    res.send(proj)
}

async function getPojs(req, res) {
    console.log(req.query,'controler9')
    const projs = await projService.query(req.query)
    console.log(projs,'controler11')
    res.send(projs)
}

async function deletePoj(req, res) {
    await projService.remove(req.params.id)
    res.end()
}

async function updatePoj(req, res) {
    const proj = req.body;
    await projService.update(proj)
    res.send(proj)
}


async function addPoj(req, res) {
    const proj = req.body;
    await projService.add(proj)
    res.send(proj)
}



// async function query(filterBy = {}) {

//     const criteria = _buildCriteria(filterBy)
//     const collection = await dbService.getCollection('projs')
//     try {
//         var sortObj = {}
//         if (filterBy.sort) {
//             if (filterBy.sort === 'name') {
//                 sortObj = { name: 1 }
//             } else {
//                 sortObj = { price: 1 }
//             }
//         }
//         const projs = await collection.find(criteria).collation({ locale: "en" }) /////////locale??????
//             .sort(sortObj).toArray();

//         return projs
//     } catch (err) {
//         console.log('ERROR: cannot find projs')
//         throw err;
//     }
// }

module.exports = {
    getPoj,
    getPojs,
    deletePoj,
    updatePoj,
    addPoj
}