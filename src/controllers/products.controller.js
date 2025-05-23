import { ProductService } from '../services/products.service.js';
const productService = new ProductService();

export const getProducts = async (req, res) => {
    const products = await productService.getAll();
    res.json(products);
};

export const getProductById = async (req, res) => {
    const product = await productService.getById(req.params.pid);
    if (!product) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json(product);
};

export const createProduct = async (req, res) => {
    const product = await productService.create(req.body);
    res.status(201).json(product);
};

export const updateProduct = async (req, res) => {
    const product = await productService.update(req.params.pid, req.body);
    if (!product) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json(product);
};

export const deleteProduct = async (req, res) => {
    const product = await productService.delete(req.params.pid);
    if (!product) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json({ message: 'Producto eliminado' });
};