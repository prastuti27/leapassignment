import Joi from "joi";

const getUserSchema = Joi.object({
  page: Joi.number().integer().min(1).default(1).messages({
    "number.base": "Page should be an integer",
  }),

  size: Joi.number().integer().min(1).max(40).default(10).messages({
    "number.base": "Page should be an integer",
  }),

  email: Joi.string().email().messages({
    "string.email": "Email must be a valid format",
  }),
});

const createUserSchema =Joi.object({
Fullname:Joi.string().min(3).regex(/\s/).required().messages({
  "string.Fullname": "name should be valid",
}),
Email:Joi.string().email().min(10).required().messages({
  "string.Email": "email should be valid",
}),
Phone:Joi.string().length(10).required().messages({
  "string.Phone": "phoneno should be valid",
}),
Gender:Joi.string().valid('male','female','others').required().messages({
  "string.Gender": "enter your gender",
}),


})
export { getUserSchema ,createUserSchema};