const express = require('express');
const router = express.Router();
import {create, authenticate, getProfile, addFriend} from '../app/api/controllers/users'
import {validateUser} from '../auth'


router.post('/register', create)
router.post('/login', authenticate)

router.get('/profile', validateUser, getProfile)

router.post('/addFriend', validateUser, addFriend) // body : {friendId: blah blah blah}

module.exports = router