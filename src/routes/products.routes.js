import { Router } from 'express'
import passport from 'passport'
import {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
} from '../controllers/products.controller.js'
import { authRole } from '../middlewares/authMiddleware.js'

const router = Router()

router.get('/', getProducts)
router.get('/:pid', getProductById)

router.post(
    '/',
    passport.authenticate('jwt', { session: false }),
    authRole('admin'),
    createProduct
)

router.put(
    '/:pid',
    passport.authenticate('jwt', { session: false }),
    authRole('admin'),
    updateProduct
)

router.delete(
    '/:pid',
    passport.authenticate('jwt', { session: false }),
    authRole('admin'),
    deleteProduct
)

export default router