const projService = require('./projService')

async function getProj(req, res) {
    const proj = await projService.getById(req.params.id)
    res.send(proj)
}

async function getProjs(req, res) {
    const projs = await projService.query(req.query)
    res.send(projs)
}

async function deleteProj(req, res) {
    await projService.remove(req.params.id)
    res.end()
}

async function updateProj(req, res) {
    const proj = req.body;
    await projService.update(proj)
    res.send(proj)
}


async function addProj(req, res) {
    const proj = req.body;
    await projService.add(proj)
    res.send(proj)
}

module.exports = {
    getProj,
    getProjs,
    deleteProj,
    updateProj,
    addProj
}