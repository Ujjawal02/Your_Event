const Joi = require("joi");

const eventSchema = Joi.object({
    event: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        price: Joi.number().required(),
        ticketsAvailable: Joi.number().required(),
        venue: Joi.string().required(),
        date: Joi.date().required(),
        image: Joi.object({
        filename: Joi.string().allow("", null),
        url: Joi.string().uri().allow("", null)
        }).optional()
    }).required()
});


const reviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().required().min(1).max(5),
        comment:Joi.string().required(),
    })
})
module.exports = {eventSchema, reviewSchema}