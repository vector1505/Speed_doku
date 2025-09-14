// Common response handler
export function sendResponse(res, data, message = "Success", status = 200) {
  res.status(status).json({
    success: true,
    message,
    data
  });
}

// Common error handler middleware
export function errorHandler(err, req, res, next) {
  console.error(err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
    details: err.details || undefined
  });
}

