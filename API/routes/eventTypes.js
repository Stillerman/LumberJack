import { Router } from 'express'
const router = Router()
import { create, getById, getAll, deleteById, updateById} from '../app/api/controllers/eventTypes'


router.post('/', create) // with userEvent: {...} in the body

router.get('/:eventTypeId', getById)
router.get('/', getAll)

router.delete('/:eventTypeId', deleteById)
router.put('/:eventTypeId', updateById) // with userEvent: {...} in the body

export default router