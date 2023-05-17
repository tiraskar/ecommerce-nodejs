import express from 'express'
const router = express()

import {
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} from '../middleware/verifyToken.js'
import {
  deleteUser,
  updateUser,
  getUser,
  getAllUser,
  getUserStats,
} from '../controller/userController.js'

router.route('/:id').put(verifyTokenAndAuthorization, updateUser)
router.route('/:id').delete(verifyTokenAndAdmin, deleteUser)
router.route('/find/:id').get(verifyTokenAndAdmin, getUser)
router.route('/').get(verifyTokenAndAdmin, getAllUser)
router.route('/stats').get(verifyTokenAndAdmin, getUserStats)

export default router
