import { Router } from 'express'
import { generateUsersMock, insertMockData } from '../utils/mockGenerator.js'

const router = Router()

router.get('/mockingusers', (req, res) => {
    const users = generateUsersMock(50)
    res.json(users)
})

router.post('/generateData', async (req, res) => {
    const { users = 0, pets = 0 } = req.query
    const result = await insertMockData(parseInt(users), parseInt(pets))
    res.json(result)
})

export default router