import Joi from "joi";
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from "../constant/pagination";

export const getCreateTaskSchema = Joi.object({
  title: Joi.string().required().messages({
    "any.required": "Title is required",
    "string.empty": "Title cannot be empty",
  }),
});

export const getTaskSchema = Joi.object({
  page: Joi.number().integer().min(1).default(DEFAULT_PAGE),

  size: Joi.number().integer().min(1).max(40).default(DEFAULT_PAGE_SIZE),

  search: Joi.string().default(""),

  completed: Joi.boolean().default(false),
});
