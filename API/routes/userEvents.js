import { Router } from 'express'
const router = Router()
import { create, getById, getAll, deleteById, updateById} from '../app/api/controllers/userEvents'


router.post('/', create) // with userEvent: {...} in the body

router.get('/:userEventId', getById)
router.get('/', getAll)

router.delete('/:userEventId', deleteById)
router.put('/:userEventId', updateById) // with userEvent: {...} in the body


export default router