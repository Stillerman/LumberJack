import { userEventsModel } from '../models/userEvents'
import moment from 'moment'


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

export function getAll(req, res, next) {
  userEventsModel.find({createdBy: req.body.userId}, function (err, userEvents) {
    if (err) {
      next(err)
    } else {
      res.json({ status: "success", message: "User events found!!!", data: userEvents })
    }
  })
}

export function updateById(req, res, next) {
  userEventsModel.findByIdAndUpdate(req.params.userEventId, req.body.userEvent, function (err, result) {
    if (err)
      next(err)
    else {
      res.json({ status: "success", message: "UserEvent updated successfully!!!", data: result })
    }
  })
}

export function stopOnGoingEvent(req, res, next) {
  userEventsModel.findByIdAndUpdate(req.params.userEventId, {ongoing: false, 'fields.endTime': moment().format()}, (err, result) => {
    if (err) next(err)
    else res.json({status: 'success', message: 'UserEventEnded', data:result})
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