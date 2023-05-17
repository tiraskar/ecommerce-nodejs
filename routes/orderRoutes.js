import express from 'express'

const router = express()

import {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} from '../middleware/verifyToken.js'
import {
  createOrder,
  updateOrder,
  deleteOrder,
  getOrder,
  getAllOrders,
  monthlyIncome,
} from '../controller/orderController.js'

router.route('/create').post(verifyToken, createOrder)
router.route('/:id').put(verifyTokenAndAdmin, updateOrder)
router.route('/:id').delete(verifyTokenAndAdmin, deleteOrder)
router.route('/find/:UserId').get(verifyTokenAndAuthorization, getOrder)
router.route('/').get(verifyTokenAndAdmin, getAllOrders)
router.route('/income').get(verifyTokenAndAdmin, monthlyIncome)

export default router
