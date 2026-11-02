import { computed, ref } from 'vue';
import type { ConferenceSession } from './useConferenceData';

export function useSessionFilters(
    sessions: readonly ConferenceSession[]
) {
    // Ein leerer Wert bedeutet, dass dieser Filter nicht einschränkt.
    const selectedTrack = ref('');
    const selectedDay = ref('');
    const selectedLevel = ref('');

    // Die verfügbaren Level werden aus den Sessiondaten abgeleitet.
    const levels = [
        ...new Set(sessions.map(session => session.level))
    ];

    // Die Ergebnisliste wird bei einer Filteränderung neu berechnet.
    const filteredSessions = computed(() => {
        return sessions.filter(session => {
            const matchesTrack =
                selectedTrack.value === '' ||
                session.trackId === selectedTrack.value;

            const matchesDay =
                selectedDay.value === '' ||
                session.day === selectedDay.value;

            const matchesLevel =
                selectedLevel.value === '' ||
                session.level === selectedLevel.value;

            return matchesTrack && matchesDay && matchesLevel;
        });
    });

    function resetFilters() {
        selectedTrack.value = '';
        selectedDay.value = '';
        selectedLevel.value = '';
    }

    return {
        selectedTrack,
        selectedDay,
        selectedLevel,
        levels,
        filteredSessions,
        resetFilters
    };
}