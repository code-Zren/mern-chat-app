const errorUrlNotFound = (req, res, next) => {
  setImmediate(() => {
    next(new Error("Endpoint not found"));
  });
};

const errorHandler = (error, req, res, next) => {
  console.error(error);
  let errorMessage = "An unknown error occurred!";
  let statusCode = 500;
  if (error instanceof Error) {
    errorMessage = error.message;
    statusCode = error.status;
  }
  res.status(statusCode).json({ error: errorMessage });
};

module.exports = { errorUrlNotFound, errorHandler };
