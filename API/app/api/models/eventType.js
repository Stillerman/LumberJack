import mongoose, { Mongoose } from 'mongoose'

const Schema = mongoose.Schema

const EventTypeSchema = new Schema({
  createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
  presentTense: String,
  pastTense: String,
  icon: String,
  sentenceFragment: String,
  paragraphTemplate: String,
  ongoing: Boolean,
  createdAt: {
    type: Date,
    default: Date.now
  },
  fields: [{}]
})

export const eventTypeModel = mongoose.model('EventType', EventTypeSchema)

/**
 * 
 *  presentTense: 'Eat',
    icon: 'utensils',
    pastTense: 'Ate',
    sentenceFragment: 'ate {{food}}',
    paragraphTemplate: 'You ate {{food}} at {{where}} at {{when}}.',
    createdBy: 'Admin',
 * 
 */