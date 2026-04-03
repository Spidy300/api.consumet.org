// src/routes/movies/index.js
import { Router } from 'express';
const router = Router();
router.get('/', (req,res)=> res.json({ message: 'movies root' }));
export default router;
