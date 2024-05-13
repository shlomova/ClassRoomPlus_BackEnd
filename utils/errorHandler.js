const errorHandler = (err, req, res, next) => {
    let statusCode = err.statusCode || 500;
    let message = err.message || 'Internal Server Error';
    if (err.name === 'MongoError' && err.code === 11000) {
      // MongoDB duplicate key error (unique constraint violation)
      statusCode = 400;
      message = 'Duplicate key error. This resource already exists.';
    }
    
    res.status(statusCode).json({
      success: false,
      error: message,
    });
  };
  
  module.exports = errorHandler;
  