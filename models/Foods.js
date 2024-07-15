const mongoose = require('mongoose')
const Joi = require('joi')

// Mongoose schema
const foodSchema = new mongoose.Schema({
	img: {
		type: String,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	category: {
		type: String,
		required: true,
	},
	price: {
		type: String,
		required: true,
	},
})

const Food = mongoose.model('Food', foodSchema)

// Joi validation schema
const foodSchemaValidate = Joi.object({
	img: Joi.string().uri().required(),
	name: Joi.string().min(3).required(),
	category: Joi.string().required(),
	price: Joi.string().required(),
})

module.exports = { Food, foodSchemaValidate }
