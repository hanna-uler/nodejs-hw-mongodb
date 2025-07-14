import Joi from "joi";

export const createContactSchema = Joi.object({
    name: Joi.string().min(3).max(20).required().messages({
        'string.base': 'Name should be a string',
        'string.min': 'Name should have at least 3 characters',
        'string.max': 'Name should have at most 20 characters',
        'any.required': 'Name is required',
      }),
    phoneNumber: Joi.string().pattern(/^\+?[1-9]\d{1,14}$/).required().messages({
        'string.pattern.base': 'Phone number must follow the international format',
        'any.required': 'Phone number is required',
      }),
    email: Joi.string().email({minDomainSegments: 2}).required().messages({
        'string.email': 'Email must be a valid email address',
        'any.required': 'Email is required',
      }),
    isFavourite: Joi.boolean(),
    contactType: Joi.string().valid("work", "home", "personal").required().messages({
        'any.only': 'Contact type must be one of the following: "work", "home", "personal"',
        'any.required': 'Contact type is required',
    }),
});

export const updateContactSchema = Joi.object({
    name: Joi.string().min(3).max(20).messages({
        'string.base': 'Name should be a string',
        'string.min': 'Name should have at least 3 characters',
        'string.max': 'Name should have at most 20 characters',
      }),
    phoneNumber: Joi.string().pattern(/^\+?[1-9]\d{1,14}$/).messages({
        'string.pattern.base': 'Phone number must follow the international format',
      }),
    email: Joi.string().email({minDomainSegments: 2}).messages({
        'string.email': 'Email must be a valid email address',
      }),
    isFavourite: Joi.boolean(),
    contactType: Joi.string().valid("work", "home", "personal").messages({
        'any.only': 'Contact type must be one of the following: "work", "home", "personal"',
    }),
});
