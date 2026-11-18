exports.notFound = (req, res) => {
  res.status(404).json({ message: `Route ${req.method} ${req.originalUrl} not found` });
};

exports.errorHandler = (err, req, res, next) => {
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ message: 'Malformed JSON body' });
  }

  const status = err.status || 500;
  if (status === 500) console.error(err);

  res.status(status).json({
    message: status === 500 ? 'Something went wrong' : err.message,
  });
};
