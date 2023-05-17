import Product from '../models/Product.js'

//create product
const createProduct = async (req, res) => {
  const newProduct = new Product(req.body)
  try {
    const saveProduct = await newProduct.save()
    res.status(200).json(saveProduct)
  } catch (error) {
    res.status(400).json(error)
  }
}
//update product
const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    )
    res.status(200).json(updatedProduct)
  } catch (error) {
    res.status(400).json(error)
  }
}
//delete product
const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id)
    res.status(200).json('Product deleted successfully.')
  } catch (error) {
    res.status(400).json(error)
  }
}

//get product

const getProduct = async (req, res) => {
  try {
    const product = await Product.find(req.params.id)
    res.status(200).json(product)
  } catch (error) {
    res.status(400).json(error)
  }
}

//get all product
const getAllProduct = async (req, res) => {
  const queryNew = req.query.new
  const queryCategory = req.query.category
  try {
    let products
    if (queryNew) {
      products = await Product.find().sort({ createdAt: -1 }).limit(1)
    } else if (queryCategory) {
      products = await Product.find({
        categories: {
          $in: [queryCategory],
        },
      })
    } else {
      products = await Product.find()
    }
    res.status(200).json(products)
  } catch (error) {
    res.status(400).json(error)
  }
}

export {
  createProduct,
  updateProduct,
  deleteProduct,
  getProduct,
  getAllProduct,
}
