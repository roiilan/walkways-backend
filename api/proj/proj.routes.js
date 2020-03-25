const express = require('express')
const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware')
const { getPoj, getPojs, deletePoj, updatePoj, addPoj } = require('./proj.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', getPojs)
router.post('/', addPoj)
router.get('/:id', getPoj)
router.put('/:id', updatePoj)
router.delete('/:id', requireAuth, requireAdmin, deletePoj)

module.exports = router