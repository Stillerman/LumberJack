import { nounsModel } from '../models/nouns'



export function getById(req, res, next) {
  console.log(req.body)
  nounsModel.findById(req.params.nounId, function (err, nounInfo) {
    if (err) {
      next(err)
    } else {
      res.json({ status: "success", message: "noun Found", data: nounInfo })
    }
  })
}

export function getByType(req, res, next) {
  console.log('GET BY TYPE', req.body, req.params)
  nounsModel.find({type: req.params.nounType, createdBy: req.body.userId}, function (err, nounInfo) {
    if (err) {
      next(err)
    } else {
      res.json({ status: "success", message: "nouns Found", data: nounInfo })
    }
  })
}

export function getAll(req, res, next) {
  nounsModel.find({createdBy: req.body.userId}, function (err, nouns) {
    if (err) {
      next(err)
    } else {
      res.json({ status: "success", message: "nouns found!!!", data: nouns })
    }
  })
}

export function updateById(req, res, next) {
  nounsModel.findByIdAndUpdate(req.params.nounId, req.body.noun, function (err, result) {
    if (err)
      next(err)
    else {
      res.json({ status: "success", message: "noun updated successfully!!!", data: result })
    }
  })
}

export function deleteById (req, res, next) {
  nounsModel.findByIdAndRemove(req.params.nounId, function (err) {
    if (err)
      next(err)
    else {
      res.json({ status: "success", message: "Noun deleted successfully!!!", data: null })
    }
  })
}

export function create (req, res, next) {

  let newNoun = req.body

  newNoun.createdBy = req.body.userId

  if (newNoun.fields) newNoun.fields = JSON.parse(newNoun.fields) || {}

  nounsModel.create(newNoun, function (err, result) {
    if (err)
      next(err)
    else
      res.json({ status: "success", message: "Noun added successfully!!!", data: result })
  })
}