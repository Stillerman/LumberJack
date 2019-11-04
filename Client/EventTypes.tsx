export interface IField {
  name: string,
  type: 'string list' | 'string' | 'number' | 'location' | 'time' | 'options',
  options?: string[],
  description?: string,
  required?: boolean
  min?: number,
  max?: number,
  suggestions?: any[]

}

export interface IUserEvent {
  presentTense: string,
  pastTense: string,
  fields: IField[],
  createdBy: string,
  icon?: string,
  articulation?: string,
  ongoing?: boolean,
}

function when (description?: string) : IField {
  return {
    name: 'when',
    description: description || 'When did it start?',
    type: 'time',
    required: true  
  }
}

function where (description: string = 'Where?', locations: string[] = ['Simpson', 'Central Dining', 'Grundle', 'Dorm room', 'Gaku Ramen']) : IField {
  return {
    name: 'where',
    description: description,
    type: 'options',
    options: locations,
    required: false
  }
}

export const getEventType = (eventType) => {
  let pastTense = eventTypes.find(et => et.pastTense === eventType)
  if (pastTense) return pastTense
  else return eventTypes.find(et => et.presentTense === eventType)
}

export const getPrimaryNoun = (event) => {
  if (!event.fields) return false

  let evtType = getEventType(event.type)

  let fieldName = evtType.fields[0].name

  console.log(event, fieldName, event.fields[fieldName])

  if (Array.isArray(event.fields[fieldName])) return event.fields[fieldName].map(evt => evt.toLowerCase())
  else return event.fields[fieldName].toLowerCase()
}

export const eventTypes: IUserEvent[] = [
  {
    presentTense: 'Eat',
    icon: 'utensils',
    pastTense: 'Ate',
    createdBy: 'Admin',
    // articulation: 'You ate {foods} at {when}',
    fields: [
      {
        name: 'food',
        suggestions: ['Pizza', 'Grilled Cheeze', 'Captain Crunch', 'Tater Tots', 'French Fries', 'Onion Rings', 'Vitamin Water', 'Salad', 'Tofu'],
        description: 'What did you eat and drink?',
        type: 'string list',
        required: true
      },
      where('Where did you eat?'),
      when('When did the meal start?')
    ]
  },
  {
    presentTense: 'Excersize',
    pastTense: 'Excersized',
    icon: 'dumbbell',
    createdBy: 'Admin',
    ongoing: true,
    fields: [
      {
        name: 'excersizes',
        type: 'string list',
        required: true,
        suggestions: ['pushups', 'situps', 'running', 'curls', 'chinups'],
        description: 'Which excersize(s) did you do?'
      },
      {
        description: 'What is the intensity (1-10)',
        name: 'intensity',
        type: 'number',
        min: 1,
        max: 10,
        required: true
      },
      where('Where did you work out?', ['Patrick', 'CWP', 'CCRH', 'Around Campus']),
      when('When did the workout start?')
    ]
  },
  {
    presentTense: 'Run',
    icon: 'running',
    pastTense: 'Ran',
    createdBy: 'Admin',
    fields: [
      {
        name: 'duration',
        type: 'number',
        description: 'Duration of the run in minutes',
        required: true
      },
      {
        name: 'intensity',
        type: 'number',
        min: 1,
        max: 10,
        description: 'The intensity of the run 1-10'
      },
      where('Where did you run?', ['Patrick', 'CWP', 'CCRH', 'Around Campus']),
      when('When did the run start?')
    ]
  },
  {
    presentTense: 'Drink',
    icon: 'glass-martini',
    pastTense: 'Drank',
    createdBy: 'Admin',
    fields: [
      {
        name: 'type',
        type: 'options',
        options: ['Beer', 'Wine', 'Liquor', 'A Mixture'],
        required: true
      },
      {
        name: 'quantity',
        description: 'Number of standard sized drinks you consumed (one shot, one beer, one glass of wine)',
        type: 'number',
        required: true
      },
      {
        name: 'brand',
        type: 'string',
        description: 'What is the brand of the liquor?',
        required: false
      },
      where('Where did you drink?', ['CCRH', 'Patterson', 'Outside']),
      when('When?')

    ]
  },
  {
    presentTense: 'Smoke',
    icon: 'cannabis',
    pastTense: 'Smoked',
    createdBy: 'Admin',
    fields: [
      {
        name: 'strain',
        type: 'string',
        required: false
      },
      {
        name: 'quantity',
        type: 'number',
        description: 'a number 1 - 10 describing the quantity',
        min: 1,
        max: 10,
        required: false
      },
      {
        name: 'method',
        type: 'options',
        options: ['Joint', 'Bong', 'Gravity Bong', 'Pen', 'Spliff', 'Bowl', 'Blunt'],
        required: false
      },
      where('Where did you smoke?', ['Dorm room', 'Henry\'s room', 'Golf Course']),
      when('When did you smoke?')
    ]
  },
  {
    presentTense: 'Sleep',
    icon: 'bed',
    pastTense: 'Slept',
    createdBy: 'Admin',
    fields: [
      where('Where did you sleep?', ['My Dorm', 'CCRH']),
      when('When did your sleep start?')
    ],
    ongoing: true
  }
]