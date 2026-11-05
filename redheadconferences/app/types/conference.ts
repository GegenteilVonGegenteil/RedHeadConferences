export type Level = 'Einsteiger' | 'Fortgeschritten' | 'Experte'
export type SessionFormat = 'Vortrag' | 'Workshop' | 'Podium'

export type TrackId = | 'frontend-architecture' | 'rendering-performance' | 'ai-dx' | 'design-systems' | 'keynote'

export type RoomId = 'main-hall' | 'room-a' | 'room-b' | 'room-c'

export interface Conference {
    name: string
    tagline: string
    dates: string[]
    location: string
    timezone: string
}

export interface Track {
    id: TrackId
    name: string
}

export interface Room {
    id: RoomId
    name: string
    capacity: number
}

export interface Speaker {
    id: string
    name: string
    title: string
    company: string
    bio: string
    sessionIds: string[]
}

export interface Session {
    id: string
    title: string
    abstract: string
    trackId: TrackId
    speakerIds: string[]
    day: string
    startTime: string
    endTime: string
    roomId: RoomId
    level: Level
    format: SessionFormat
}

export interface ConferenceData {
    conference: Conference
    tracks: Track[]
    rooms: Room[]
    speakers: Speaker[]
    sessions: Session[]
}