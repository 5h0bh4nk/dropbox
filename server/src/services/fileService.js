import s3 from '../config/s3.js';

export const uploadFileToS3 = async (file) => {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `${Date.now()}_${file.originalname}`,
    Body: file.buffer,
    ContentType: file.mimetype
  };

  const uploadResult = await s3.upload(params).promise();

  return {
    filename: file.originalname,
    url: uploadResult.Location,
    key: uploadResult.Key,
    size: file.size,
    fileType: file.mimetype
  };
};

export const downloadFileFromS3 = async (params) => {
    const downloadResult = await s3.getObject(params).promise();
    return downloadResult;
}