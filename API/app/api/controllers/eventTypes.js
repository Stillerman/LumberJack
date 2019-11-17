import { eventTypeModel } from '../models/eventType'
import moment from 'moment'


export function getById(req, res, next) {
  console.log(req.body)
  eventTypeModel.findById(req.params.eventType, function (err, eventTypeInfo) {
    if (err) {
      next(err)
    } else {
      res.json({ status: "success", message: "Event Type Found", data: eventTypeInfo })
    }
  })
}

export function getAll(req, res, next) {
  eventTypeModel.find({}, function (err, eventTypes) {
    if (err) {
      next(err)
    } else {
      res.json({ status: "success", message: "User events found!!!", data: eventTypes })
    }
  })
}

export function updateById(req, res, next) {
  eventTypesModel.findByIdAndUpdate(req.params.eventTypeId, req.body.eventType, function (err, result) {
    if (err)
      next(err)
    else {
      res.json({ status: "success", message: "EventType updated successfully!!!", data: result })
    }
  })
}

export function deleteById (req, res, next) {
  eventTypeModel.findByIdAndRemove(req.params.eventTypeId, function (err) {
    if (err)
      next(err)
    else {
      res.json({ status: "success", message: "EventType deleted successfully!!!", data: null })
    }
  })
}

export function create (req, res, next) {

  let newEventType = req.body

  newEventType.createdBy = req.body.userId
  newEventType.fields = JSON.parse(newEventType.fields) || {}

  eventTypeModel.create(newEventType, function (err, result) {
    if (err)
      next(err)
    else
      res.json({ status: "success", message: "EventType added successfully!!!", data: result })
  })
}