import mongoose, { Mongoose } from 'mongoose'

const Schema = mongoose.Schema

const UserEventSchema = new Schema({
  createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
  type: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  fields: {}
})

export const userEventsModel = mongoose.model('UserEvent', UserEventSchema)