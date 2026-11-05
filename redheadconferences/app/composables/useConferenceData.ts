import conferenceDataJSON from '../data/conference-data.json' with { type: "json" };

export type ConferenceSession = Session;

export function useConferenceData() {
    const conferenceData = conferenceDataJSON as ConferenceData;

    function getConference(): Conference {
        return conferenceData.conference;
    }

    function getAllSessions(): Session[] {
        return conferenceData.sessions;
    }

    function getAllSpeakers(): Speaker[] {
        return conferenceData.speakers;
    }

    function getAllTracks(): Track[] {
        return conferenceData.tracks;
    }

    function getSessionById(id: string): Session | undefined {
        return conferenceData.sessions.find(
            session => session.id === id
        );
    }

    function getSpeakerById(id: string): Speaker | undefined {
        return conferenceData.speakers.find(
            speaker => speaker.id === id
        );
    }

    function getTrackById(id: string): Track | undefined {
        return conferenceData.tracks.find(
            track => track.id === id
        );
    }

    function getRoomById(id: string): Room | undefined {
        return conferenceData.rooms.find(
            room => room.id === id
        );
    }

    function getSessionsBySpeakerId(speakerId: string): Session[] {
        return conferenceData.sessions.filter(
            session => session.speakerIds.includes(speakerId)
        );
    }

    function getSpeakersByIds(speakerIds: string[]): Speaker[] {
        const speakers: Speaker[] = [];
        for (const speakerId of speakerIds) {
            const speaker = getSpeakerById(speakerId);
            if (speaker) {
                speakers.push(speaker);
            }
        }

        return speakers;
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
        getSessionsBySpeakerId,
        getSpeakersByIds
    };
}