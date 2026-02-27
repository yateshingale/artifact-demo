import mongoose from 'mongoose';

export function notFound(_req, _res, next) {
  const err = new Error('Resource not found');
  err.statusCode = 404;
  next(err);
}

export function errorHandler(err, req, res, _next) {
  if (err instanceof mongoose.Error.CastError) {
    err.statusCode = 400;
    err.message = 'Invalid identifier';
  }

  req.log?.error({ err }, 'request failed');
  res.status(err.statusCode || 500).json({ message: err.message || 'Internal server error' });
}
