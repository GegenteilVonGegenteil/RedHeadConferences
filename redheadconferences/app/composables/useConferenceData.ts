import conferenceDataJSON from '../data/conference-data.json' with { type: "json" };

export function useConferenceData() {
    const conferenceData = conferenceDataJSON;

    function getAllSessions() {
        return conferenceData.sessions;
    }

    return {getAllSessions};
}