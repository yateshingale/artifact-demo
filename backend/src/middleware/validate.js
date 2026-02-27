export const validate = (schema) => (req, _res, next) => {
  const { error, value } = schema.validate(req.body, { abortEarly: false, stripUnknown: true });
  if (error) {
    error.statusCode = 400;
    error.message = error.details.map((d) => d.message).join(', ');
    return next(error);
  }
  req.body = value;
  return next();
};
