// Express example (if you use Express)
import express from 'express';
import moviesRouter from './routes/movies';
const app = express();
app.use(express.json());
app.use('/api/movies', moviesRouter);
app.get('/health', (req,res)=>res.json({ok:true}));
app.get('/_routes', (req,res)=>res.json({routes: /* build list */ }));
app.listen(process.env.PORT || 3000);
