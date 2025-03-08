export const successResponse = (res, message, data) => {
    res.status(200).json({ message, data });
  };
  
  export const errorResponse = (res, message, error) => {
    res.status(500).json({ message, error });
  };
  