import { Router } from 'express'
const router = Router()
import { create, getById, getAllMine, getAllAllowed, deleteById, updateById, stopOnGoingEvent} from '../app/api/controllers/userEvents'


router.post('/', create) // with userEvent: {...} in the body
router.post('/end/:userEventId', stopOnGoingEvent)


router.get('/', getAllMine)
router.get('/friends', getAllAllowed)
router.get('/:userEventId', getById)

router.delete('/:userEventId', deleteById)
router.put('/:userEventId', updateById) // with userEvent: {...} in the body


export default router