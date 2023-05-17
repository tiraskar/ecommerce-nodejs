import Order from '../models/Order.js'

//create order
const createOrder = async (req, res) => {
  const newOrder = new Order(req.body)
  try {
    const saveOrder = await newOrder.save()
    res.status(200).json(saveOrder)
  } catch (error) {
    res.status(400).json(error)
  }
}

//update order
const updateOrder = async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    )
    res.status(200).json(updatedOrder)
  } catch (error) {
    res.status(400).json(error)
  }
}

//delete order
const deleteOrder = async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id)
    res.status(200).json('Order deleted successfully.')
  } catch (error) {
    res.status(400).json(error)
  }
}

//get user order

const getOrder = async (req, res) => {
  try {
    const order = await Order.findOne(req.params.userId)
    res.status(200).json(order)
  } catch (error) {
    res.status(400).json(error)
  }
}

//get all

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
    res.status(200).json(orders)
  } catch (error) {
    res.status(400).json(error)
  }
}

//get monthly income
const monthlyIncome = async (req, res) => {
  const date = new Date()
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1))
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1))
  try {
    const income = await Order.aggregate([
      { $match: { createdAt: { $gte: previousMonth } } },
      {
        $project: {
          month: { $month: '$createdAt' },
          sales: '$amount',
        },
      },
      {
        $group: {
          _id: '$month',
          total: { $sum: '$sales' },
        },
      },
    ])
    res.status(200).json(income)
  } catch (error) {
    res.status(400).json(error)
  }
}

export {
  createOrder,
  updateOrder,
  deleteOrder,
  getOrder,
  getAllOrders,
  monthlyIncome,
}
