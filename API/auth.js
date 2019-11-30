import { verify } from 'jsonwebtoken'

export function validateUser(req, res, next) {
  verify(req.headers['x-access-token'], req.app.get('secretKey'), function(err, decoded) {
    if (err) {
      res.json({status:"error", message: err.message, data:null});
    }else{
      req.body.userId = decoded.id
      next()
    }
  })
}