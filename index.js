import express from 'express'
const app = express()
import dotenv from 'dotenv'
dotenv.config()

//database
import connectDB from './database/dbConnection.js'

//API
// import userRoutes from './routes/userRoutes.js'
import authRoutes from './routes/authRoutes.js'
import userRoutes from './routes/userRoutes.js'
import productRoutes from './routes/productRoutes.js'
import cartRoutes from './routes/cartRoutes.js'
import orderRoutes from './routes/orderRoutes.js'

app.use(express.json())

app.get('/api/test', () => {
  console.log('Test Success')
})

// app.use('/api/user', userRoutes)
app.use('/api', authRoutes)
app.use('/api/user', userRoutes)
app.use('/api/product', productRoutes)
app.use('/api/cart', cartRoutes)
app.use('/api/order', orderRoutes)

const port = process.env.PORT || 5000

const server = async () => {
  try {
    await connectDB(process.env.MONGO_URL)
    app.listen(port, () => {
      console.log(`Server stared on port: ${port}!!!`)
    })
  } catch (error) {
    console.log(error)
  }
}

server()
