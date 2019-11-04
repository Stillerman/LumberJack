import mongoose, { Mongoose } from 'mongoose'

const Schema = mongoose.Schema

const NounSchema = new Schema({
  createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
  type: String, // ie food
  createdAt: {
    type: Date,
    default: Date.now
  },
  noun: String, // ie pizza
  fields: {} // ie {cal: 110}
})

export const nounsModel = mongoose.model('Noun', NounSchema)