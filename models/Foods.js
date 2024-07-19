const mongoose = require('mongoose')
const Joi = require('joi')

// Food modelini aniqlash
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
	subcategory: {
		type: String,
		default: '', // Optional qilib qo'yish va bo'sh qiymatni o'rnatish
	},
	price: {
		type: String,
		required: true,
	},
})

const Food = mongoose.model('Food', foodSchema)

// Validatsiya uchun schema
const foodSchemaValidate = Joi.object({
	img: Joi.string().required(),
	name: Joi.string().required(),
	category: Joi.string().required(),
	subcategory: Joi.string().allow(''), // Allow empty string for subcategory
	price: Joi.string().required(),
})

module.exports = {
	Food,
	foodSchemaValidate,
}
