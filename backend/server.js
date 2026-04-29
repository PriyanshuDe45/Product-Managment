import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import session from 'express-session';
import path from 'path';
import { fileURLToPath } from 'url';

import authRoutes from './routes/auth.js';
import companyRoutes from './routes/company.js';
import productRoutes from './routes/product.js';
import publicRoutes from './routes/public.js';

const __dirname = path.dirname(fileURLToPath(import.meta.URL));
const app = express();

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI ;
const SESSION_SECRET = process.env.SESSION_SECRET;

app.use(cors(({
    origin:['http://localhost:3000', 'http://localhost:5173'],
    credentials: true
})));

app.use(express.json());
app.use(express.urlencoded({exteneded: true}));

app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { httpOnly: true, maxAge: 1000 * 60* 60*24}
}))


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/auth', authRoutes);
app.use('/api/companies', companyRoutes);
app.use('/api/products', productRoutes);
app.use('/', publicRoutes);


mongoose.connect(MONGO_URI)
.then(()=> {
    console.log("MONGODB CONNNECTED");
    app.listen(PORT, () => console.log('API Listening on Port : ${PORT}'));
})
.catch(err => {
    console.error("Mongo Connection Error : ", err.message);
    process.exit(1);
});

