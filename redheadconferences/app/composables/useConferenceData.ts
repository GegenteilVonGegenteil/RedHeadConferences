
import conferenceDataJSON from '../data/conference-data.json' with { type: "json" };

export type ConferenceSession = Session;

export function useConferenceData() {
    const conferenceData = useState<ConferenceData>(
        'conference-data',
        () => conferenceDataJSON as ConferenceData
    );

    const lastUpdated = useState<string | null>(
        'conference-last-updated',
        () => null
    );

    async function refreshConferenceData() {
        try {
            const data = await $fetch<ConferenceData>(
                '/api/conference'
            );

            conferenceData.value = data;
        } catch (error) {
            console.warn(
                'Konferenzdaten konnten nicht aktualisiert werden.',
                error
            );
        }
    }

    function getConference(): Conference {
        return conferenceData.value.conference;
    }

    function getAllSessions(): Session[] {
        return conferenceData.value.sessions;
    }

    function getAllSpeakers(): Speaker[] {
        return conferenceData.value.speakers;
    }

    function getAllTracks(): Track[] {
        return conferenceData.value.tracks;
    }

    function getSessionById(id: string): Session | undefined {
        return conferenceData.value.sessions.find(
            session => session.id === id
        );
    }

    function getSpeakerById(id: string): Speaker | undefined {
        return conferenceData.value.speakers.find(
            speaker => speaker.id === id
        );
    }

    function getTrackById(id: string): Track | undefined {
        return conferenceData.value.tracks.find(
            track => track.id === id
        );
    }

    function getRoomById(id: string): Room | undefined {
        return conferenceData.value.rooms.find(
            room => room.id === id
        );
    }

    function getSessionsBySpeakerId(speakerId: string): Session[] {
        return conferenceData.value.sessions.filter(
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
        getSpeakersByIds,
        refreshConferenceData,
        lastUpdated
    };
}
