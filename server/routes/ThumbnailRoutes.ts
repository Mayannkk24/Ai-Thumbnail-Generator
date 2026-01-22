import express from 'express';
import { deleteThumbnail, generateThumbnail } from '../controllers/ThumbnailController.js';

const ThumbnailRoutes = express.Router();

ThumbnailRoutes.post('/generate',generateThumbnail )
ThumbnailRoutes.delete('/delete/:id',deleteThumbnail )

export default ThumbnailRoutes;