import { userModel } from '../models/users'
const bcrypt = require('bcrypt-nodejs')
const jwt = require('jsonwebtoken')

export function create(req, res, next) {
  userModel.create({ name: req.body.name, email: req.body.email, password: req.body.password }, function (err, result) {
    if (err)
      next(err)
    else
      res.json({ status: "success", message: "User added successfully!!!", data: null })
  })
}

export function addFriend(req, res, next) {
  console.log(`Attempting to add friend ${req.body.friendId} to ${req.body.userId}`,)
  userModel.findById(req.body.userId).then(user => {
    console.log('Found user by id ' + JSON.stringify(user));
    user.friends.push(req.body.friendId);
    return user.save()
  }).then(result => {
    res.json({status:'success', data: result})
  }).catch(err => {
    next(err)
  })
}

export async function getProfile (req, res, next) {
  try {
    let user = await userModel.findById(req.body.userId).populate('friends')
    res.json(user)
  } catch (error) {
    next(error)
  }
}

export function authenticate(req, res, next) {
  userModel.findOne({ email: req.body.email }, function (err, userInfo) {
    console.log('Req.body', req.body)
    console.log('Logging in with', req.body.email, req.body.password)
    if (err) {
      next(err)
    } else {
      if (userInfo != null && bcrypt.compareSync(req.body.password, userInfo.password)) {
        const token = jwt.sign({ id: userInfo._id }, req.app.get('secretKey'), { expiresIn: '1h' })
        res.json({ status: "success", message: "user found!!!", data: { user: userInfo, token: token } })
      } else {
        res.json({ status: "error", message: "Invalid email/password!!!", data: null })
      }
    }
  })
}