import express from 'express'

const router = express()

import {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} from '../middleware/verifyToken.js'
import {
  createCart,
  updateCart,
  deleteCart,
  getUserCart,
  getAllCarts,
} from '../controller/cartController.js'

router.route('/create').post(verifyToken, createCart)
router.route('/:id').put(verifyTokenAndAuthorization, updateCart)
router.route('/:id').delete(verifyTokenAndAuthorization, deleteCart)
router.route('/find/:id').get(verifyTokenAndAuthorization, getUserCart)
router.route('/').get(verifyTokenAndAdmin, getAllCarts)

export default router
