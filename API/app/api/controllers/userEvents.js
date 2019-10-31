import { userEventsModel } from '../models/userEvents'



export function getById(req, res, next) {
  console.log(req.body)
  userEventsModel.findById(req.params.userEventId, function (err, userEventInfo) {
    if (err) {
      next(err)
    } else {
      res.json({ status: "success", message: "User Event Found", data: { userEvent: userEventInfo } })
    }
  })
}

// export function getAll(req, res, next) {
//   let UserEventList = []

//   movieModel.find({}, function (err, movies) {
//     if (err) {
//       next(err)
//     } else {
//       for (let movie of movies) {
//         moviesList.push({ id: movie._id, name: movie.name, released_on: movie.released_on })
//       }
//       res.json({ status: "success", message: "Movies list found!!!", data: { movies: moviesList } })

//     }

//   })
// },

export function updateById(req, res, next) {
  userEventsModel.findByIdAndUpdate(req.params.userEventId, req.body.userEvent, function (err, result) {
    if (err)
      next(err)
    else {
      res.json({ status: "success", message: "UserEvent updated successfully!!!", data: result })
    }
  })
}

export function deleteById (req, res, next) {
  userEventsModel.findByIdAndRemove(req.params.userEventId, function (err) {
    if (err)
      next(err)
    else {
      res.json({ status: "success", message: "UserEvent deleted successfully!!!", data: null })
    }
  })
}

export function create (req, res, next) {

  let newUserEvent = req.body
  newUserEvent.createdBy = req.body.userId
  newUserEvent.fields = JSON.parse(newUserEvent.fields) || {}
  userEventsModel.create(newUserEvent, function (err, result) {
    if (err)
      next(err)
    else
      res.json({ status: "success", message: "UserEvent added successfully!!!", data: result })
  })
}