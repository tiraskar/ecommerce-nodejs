import Cart from '../models/Cart.js'

//create cart
const createCart = async (req, res) => {
  const newCart = new Cart(req.body)
  try {
    const saveCart = await newCart.save()
    res.status(200).json(saveCart)
  } catch (error) {
    res.status(400).json(error)
  }
}
//
//update cart
const updateCart = async (req, res) => {
  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    )
    res.status(200).json(updatedCart)
  } catch (error) {
    res.status(400).json(error)
  }
}

//delete Cart
const deleteCart = async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id)
    res.status(200).json('Cart deleted successfully.')
  } catch (error) {
    res.status(400).json(error)
  }
}

//get user cart

const getUserCart = async (req, res) => {
  try {
    const cart = await Cart.findOne(req.params.id)
    res.status(200).json(cart)
  } catch (error) {
    res.status(400).json(error)
  }
}

//get all

const getAllCarts = async (req, res) => {
  try {
    const carts = await Cart.find()
    res.status(200).json(carts)
  } catch (error) {
    res.status(400).json(error)
  }
}

export { createCart, updateCart, deleteCart, getUserCart, getAllCarts }
