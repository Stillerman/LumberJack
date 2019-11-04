import { Router } from 'express'
const router = Router()
import { create, getById, getAll, getByType} from '../app/api/controllers/nouns'


router.post('/', create) // with userEvent: {...} in the body
router.get('/:nounId', getById)
router.get('/type/:nounType', getByType)
router.get('/', getAll)


export default router