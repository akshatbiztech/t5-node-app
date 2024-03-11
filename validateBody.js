import Joi from "joi";

const schema = Joi.object({
  email: Joi.string().email().required(),
  firstName: Joi.string().required(),
});

export function validateBody(body) {
  return schema.validate(body);
}
