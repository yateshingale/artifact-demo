import Joi from 'joi';

export const createItemSchema = Joi.object({
  name: Joi.string().min(2).required(),
  description: Joi.string().allow('').default('')
});

export const updateItemSchema = Joi.object({
  name: Joi.string().min(2),
  description: Joi.string().allow('')
}).min(1);
