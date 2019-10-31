import { Router } from 'express'
const router = Router()
import { create, getById} from '../app/api/controllers/userEvents'


router.post('/', create) // with userEvent: {...} in the body
router.get('/:userEventId', getById)



export default router