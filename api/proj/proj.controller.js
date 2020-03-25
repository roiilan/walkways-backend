const projService = require('./projService')

async function getPoj(req, res) {
    const proj = await projService.getById(req.params.id)
    res.send(proj)
}

async function getPojs(req, res) {
    const projs = await projService.query(req.query)
    // console.log('controller', projs)
    res.send(projs)
}

async function deletePoj(req, res) {
    await projService.remove(req.params.id)
    res.end()
}

async function updatePoj(req, res) {
    const proj = req.body;

    await projService.update(proj)
    ('controller ', proj);

    res.send(proj)
}


async function addPoj(req, res) {
    const proj = req.body;
    await projService.add(proj)
    res.send(proj)
}

module.exports = {
    getPoj,
    getPojs,
    deletePoj,
    updatePoj,
    addPoj
}