const validate = (schema) => async (req, res, next) => {
  try {
    const parseBody = await schema.parseAsync(req.body);
    req.body = parseBody;
    next();
  } catch (err) {
    const status = 422;
    const message = "Fill the input properly";
    let extraDetails = "Validation failed";

    // Safely access error details
    if (err.errors && Array.isArray(err.errors) && err.errors.length > 0) {
      extraDetails = err.errors[0].message;
    } else if (err.message) {
      extraDetails = err.message;
    }
    const error = {
      status,
      message,
      extraDetails,
    };

    console.log(error);
    next(error);
  }
};

module.exports = validate;
