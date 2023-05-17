import express from 'express'

const router = express()
import { verifyTokenAndAdmin } from '../middleware/verifyToken.js'
import {
  createProduct,
  getProduct,
  getAllProduct,
  updateProduct,
  deleteProduct,
} from '../controller/productController.js'

router.route('/create').post(verifyTokenAndAdmin, createProduct)
router.route('/find/:id').get(getProduct)
router.route('/').get(getAllProduct)
router.route('/:id').put(verifyTokenAndAdmin, updateProduct)
router.route('/:id').delete(verifyTokenAndAdmin, deleteProduct)
export default router
