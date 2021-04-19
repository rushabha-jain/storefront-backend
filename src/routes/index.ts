import express from 'express';
import productRoutes from './products';

const routes = express.Router();

routes.use('/products', productRoutes);

export default routes;