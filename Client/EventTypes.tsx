
export interface IUserEvent {
  presentTense: string,
  pastTense: string,
  fields: any,
  createdBy: string,

  ongoing?: boolean
}

export const eventTypes: IUserEvent[] = [
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
    presentTense: 'Drink',
    pastTense: 'Drank',
    createdBy: 'Admin',
    fields: {
      type: {
        type: 'options',
        options: ['Beer', 'Wine', 'Liquor', 'A Mixture'],
        required: true
      },
      quantity: {
        description: 'Number of standard sized drinks you consumed (one shot, one beer, one glass of wine)',
        type: 'number',
        required: true
      },
      brand: {
        type: 'string',
        description: 'What is the brand of the liquor',
        required: false
      }
    }
  },
  {
    presentTense: 'Smoke',
    pastTense: 'Smoked',
    createdBy: 'Jason Stillerman',
    fields: {
      strain: {
        type: 'string',
        required: false
      },
      quantity: {
        type: 'number',
        description: 'a number 1 - 10 describing the quantity',
        min: 1,
        max: 10,
        required: false
      },
      method: {
        type: 'options',
        options: ['Joint', 'Bong', 'Gravity Bong', 'Pen', 'Spliff', 'Bowl', 'Blunt'],
        required: false
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