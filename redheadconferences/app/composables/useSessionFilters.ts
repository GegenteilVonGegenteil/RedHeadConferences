
import { computed, ref, toValue } from 'vue';
import type { MaybeRefOrGetter } from 'vue';
import type { ConferenceSession } from './useConferenceData';

export function useSessionFilters(
    sessions: MaybeRefOrGetter<readonly ConferenceSession[]>
) {
    // Ein leerer Wert bedeutet, dass dieser Filter nicht einschränkt.
    const selectedTrack = ref('');
    const selectedDay = ref('');
    const selectedLevel = ref('');

    // Die verfügbaren Level werden reaktiv abgeleitet.
    const levels = computed(() => [
        ...new Set(toValue(sessions).map(session => session.level))
    ]);

    // Die Ergebnisliste reagiert auf Filter- und Datenänderungen.
    const filteredSessions = computed(() => {
        return toValue(sessions).filter(session => {
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
