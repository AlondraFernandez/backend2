import ProductService from '../services/product.service.js';

export const getAllProducts = async (req, res) => {
  try {
    const products = await ProductService.getAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener productos' });
  }
};

export const createProduct = async (req, res) => {
  try {
    const product = await ProductService.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear producto' });
  }
};
