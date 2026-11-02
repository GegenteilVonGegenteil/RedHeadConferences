import conferenceDataJSON from '../data/conference-data.json' with { type: "json" };

export type ConferenceSession =
    (typeof conferenceDataJSON.sessions)[number];
    
export function useConferenceData() {
    const conferenceData = conferenceDataJSON;

    function getConference() {
        return conferenceData.conference;
    }

    function getAllSessions() {
        return conferenceData.sessions;
    }

    function getAllSpeakers() {
        return conferenceData.speakers;
    }

    function getAllTracks() {
        return conferenceData.tracks;
    }

    function getSessionById(id: string) {
        return conferenceData.sessions.find(
            session => session.id === id
        );
    }

    function getSpeakerById(id: string) {
        return conferenceData.speakers.find(
            speaker => speaker.id === id
        );
    }

    function getTrackById(id: string) {
        return conferenceData.tracks.find(
            track => track.id === id
        );
    }

    function getRoomById(id: string) {
        return conferenceData.rooms.find(
            room => room.id === id
        );
    }

    function getSessionsBySpeakerId(speakerId: string) {
        return conferenceData.sessions.filter(
            session => session.speakerIds.includes(speakerId)
        );
    }

    return {
        getConference,
        getAllSessions,
        getAllSpeakers,
        getAllTracks,
        getSessionById,
        getSpeakerById,
        getTrackById,
        getRoomById,
        getSessionsBySpeakerId
    };
}