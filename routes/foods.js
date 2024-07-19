const express = require('express')
const router = express.Router()
const { Food, foodSchemaValidate } = require('../models/Foods')

// Yangi food qo'shish
router.post('/', async (req, res) => {
	const { error } = foodSchemaValidate.validate(req.body)
	if (error) {
		return res.status(400).send(error.details[0].message)
	}

	const food = new Food({
		img: req.body.img,
		name: req.body.name,
		category: req.body.category,
		subcategory: req.body.subcategory,
		price: req.body.price,
	})

	try {
		await food.save()
		res.status(201).send(food)
	} catch (error) {
		console.error('Food saqlashda xatolik:', error.message)
		res.status(500).send('Ichki server xatosi')
	}
})

// Foods ro'yxatini olish
router.get('/', async (req, res) => {
	try {
		const foods = await Food.find({})
		res.send(foods)
	} catch (error) {
		res.status(500).send(error)
	}
})

// Foodni yangilash
router.patch('/:id', async (req, res) => {
	const { error } = foodSchemaValidate.validate(req.body)
	if (error) {
		return res.status(400).send(error.details[0].message)
	}
	try {
		const food = await Food.findOneAndUpdate({ _id: req.params.id }, req.body, {
			new: true,
			runValidators: true,
		})
		if (!food) {
			return res.status(404).send()
		}
		res.send(food)
	} catch (error) {
		res.status(400).send(error)
	}
})

// Foodni o'chirish
router.delete('/:id', async (req, res) => {
	try {
		const food = await Food.findOneAndDelete({ _id: req.params.id })
		if (!food) {
			return res.status(404).send()
		}
		res.send(food)
	} catch (error) {
		res.status(500).send(error)
	}
})

module.exports = router
