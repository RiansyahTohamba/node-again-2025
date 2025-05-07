import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';

import router from './routes/index.js';

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// DB Connect
mongoose.connect('mongodb://mongo:27017/ujian_db');

// Setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use('/', router);

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
