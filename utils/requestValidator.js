const Validator = require('validatorjs');

const throwValidationError = (validation, res) => {
  const validationErrors = validation.errors.all();
  return res
    .status(400)
    .json({ message: 'Request body validation failed', errors: validationErrors });
};

/**
 * Check request body against custom validation rules
 * @param {object} event
 * @param {object} rules
 */
const requestValidator = (event, rules, res) => {
  const validation = new Validator(event, rules);

  if (validation.fails()) {
    throwValidationError(validation, res);
  }
};

module.exports = requestValidator;
