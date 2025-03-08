import File from '../models/File.js';
import * as fileService from '../services/fileService.js';

export const uploadFile = async (req, res, next) => {
    try {
      if (!req.file) {
        return next({ status: 400, message: 'No file uploaded.' });
      }

      const file = req.file;
      const allowedMimeTypes = ['image/jpeg', 'image/png', 'application/pdf', 'text/plain'];
      const allowedExtensions = ['jpg', 'jpeg', 'png', 'pdf', 'txt'];
      const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
  
      // Validate file type
      if (!allowedMimeTypes.includes(file.mimetype)) {
        return next({ status: 400, message: 'Invalid file type. Allowed: JPG, PNG, PDF, TXT.' });
      }
  
      // Validate file extension
      const fileExtension = file.originalname.split('.').pop().toLowerCase();
      if (!allowedExtensions.includes(fileExtension)) {
        return next({ status: 400, message: 'Invalid file extension.' });
      }
  
      // Validate file size
      if (file.size > MAX_FILE_SIZE) {
        return next({ status: 400, message: 'File size exceeds 5MB limit.' });
      }
  
      // Upload to S3 and save metadata in DB
      const uploadedFile = await fileService.uploadFileToS3(file);
      const newFile = new File(uploadedFile);
      await newFile.save();
  
      res.status(201).json({ message: 'File uploaded successfully', file: newFile, ok: true });
  
    } catch (error) {
      next(error); 
    }
  };
  

export const listFiles = async (req, res, next) => {
  try {
    const files = await File.find();
    res.status(200).json(files);
  } catch (error) {
    next({ status: 500, message: 'Error retrieving files', error });
  }
};

export const downloadFile = async (req, res, next) => {
    console.log(req.params)
    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: req.params.fileKey
    };
    
    try {
        const file = (await fileService.downloadFileFromS3(params));
        const fileDetails = await File.findOne({ key: req.params.fileKey });

        console.log('file = ', file)
    
        res.setHeader("Content-Type", file.ContentType);
        res.setHeader("Content-Disposition", `attachment; filename=${fileDetails.filename}`);
        res.status(200).send(file.Body)
    } catch (error) {
        next({status: 404, message: "File not found" });
    }
}
