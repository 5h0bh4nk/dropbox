import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import fileRoutes from './routes/fileRoutes.js';
import errorHandler from './middleware/errorHandler.js';

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());


// Define API routes
app.use('/api/files', fileRoutes);
app.use('/', (req, res) => {
    res.status(200).send('Server is up and running !');
})

// Error handling middleware
app.use(errorHandler);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

export default app; 
