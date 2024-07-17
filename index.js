require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors') // Import cors
const app = express()
const port = 3000

// enabling CORS for some specific origins only.
let corsOptions = {
	origin: [
		'http://localhost:5173',
		'https://bahor-foods-menu-site.vercel.app',
		'https://bahor-foods-menu-admin.vercel.app',
	],
}

// Routerni import
const foodRoutes = require('./routes/foods')

// Middleware
app.use(express.json())
app.use(cors(corsOptions))

// MongoDB-ga ulanish
mongoose
	.connect(process.env.MONGODB_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log('MongoDB ga muvaffaqiyatli ulandik')
	})
	.catch(err => {
		console.error("MongoDB ga ulanib bo'lmadi", err)
	})

// Foods routerni qo'shish
app.use('/foods', foodRoutes)

// Error handling middleware
app.use((err, req, res, next) => {
	console.error(err.stack)
	res.status(500).send('Something broke!')
})

// Serverni ishga tushirish
app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`)
})
