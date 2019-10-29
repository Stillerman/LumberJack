interface User {
    _id: string,
    username: string,
    passwordHash: string,
    createdAt: number, // ms since th epoc
    friends: string[], // list of guids of friends
    eventTypes: string[], // list of guids of event types
    locations: string[] // list of guids of locations
}

interface EventType {
    _id: string,
    name: string,
    passedTense: string,
    createdBy: string,
    createdAt: number,
    public: boolean,
    fields: {
        fieldName: {
            type: 'number' | 'string' | 'string list' | 'boolean',
            description: string,
            range: [number, number] // type = number only
            required: boolean
        }
    },
    hasLocation: boolean, // does the event type have a location?
    hasDuration: boolean // is this event an ongoing event?
}

interface UserEvent {
    _id: string,
    type: string, // must be an EventType with this name, or maybe this should be a guid of the event type
    createdAt: number,
    createdBy: string, // guid
    fields: {} // full of stuff from the schema
}