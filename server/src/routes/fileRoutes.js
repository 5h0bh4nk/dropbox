import express from 'express';
import multer from 'multer';
import { uploadFile, listFiles, downloadFile } from '../controllers/fileController.js';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/upload', upload.single('file'), uploadFile);
router.get('/list', listFiles);
router.get('/download/:fileKey', downloadFile)

export default router;
