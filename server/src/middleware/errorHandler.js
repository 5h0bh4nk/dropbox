const errorHandler = (err, req, res, next) => {
    console.error('Handled error', err)
    res.status(err.status || 500).json({ message: err.message || 'Server Error', ok: false });
};
  
export default errorHandler;
  