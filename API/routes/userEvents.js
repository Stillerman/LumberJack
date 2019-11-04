import { Router } from 'express'
const router = Router()
import { create, getById, getAll} from '../app/api/controllers/userEvents'


router.post('/', create) // with userEvent: {...} in the body
router.get('/:userEventId', getById)
router.get('/', getAll)


export default router