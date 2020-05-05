const express = require('express')
const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware')
const { getProj, getProjs, deleteProj, updateProj, addProj } = require('./proj.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', getProjs)
router.post('/', addProj)
router.get('/:id', getProj)
router.put('/:id', updateProj)
router.delete('/:id', requireAuth, requireAdmin, deleteProj)

module.exports = router