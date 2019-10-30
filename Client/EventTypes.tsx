
export interface IUserEvent {
  presentTense: string,
  pastTense: string,
  fields: any,
  createdBy: string,

  ongoing?: boolean
}

export const eventTypes : IUserEvent[] = [
  {
    presentTense: 'Eat',
    pastTense: 'Ate',
    createdBy: 'Jason Stillerman',
    fields: {
      food: {
        type: 'string list',
        required: true
      },
      where: {
        type: 'location',
        required: false
      },
      when: {
        type: 'time',
        required: true  
      }
    }
  },
  {
    presentTense: 'Sleep',
    pastTense: 'Slept',
    createdBy: 'Jason Stillerman',
    fields: {
      where: {
        type: 'location',
        required: false
      }
    },
    ongoing: true
  }
]