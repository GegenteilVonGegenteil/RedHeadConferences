import {useLocalStorage} from "~/composables/useLocalStorage.ts";
import {useConferenceData} from "~/composables/useConferenceData.ts";

export function useMyProgram() {
    const STORAGE_KEY :string = 'myProgram';

    const { value: myProgram, isHydrated } = useLocalStorage<string[]>(STORAGE_KEY, [])
    const { getSessionById } = useConferenceData();

    const inProgram = (id: string): boolean => myProgram.value.includes(id);

    const addToProgram = (id: string): void  => {
        if (!inProgram(id)) myProgram.value = [...myProgram.value, id];
    };

    const removeFromProgram = (id: string): void => {
        if (inProgram(id)) myProgram.value = myProgram.value.filter((i) => i !== id);
    }

    const toggle = (id: string): void => (inProgram(id) ? removeFromProgram(id) : addToProgram(id));

    const savedSessions = computed<Session[]>(() => {

        const sessions: Session[] = [];
        for (const id of myProgram.value) {
            const session = getSessionById(id)
            if (session) sessions.push(session)
        }

        return sessions;
    })

    return {
        myProgram: myProgram,
        isHydrated: isHydrated,
        savedSessions,
        inProgram,
        addToProgram,
        removeFromProgram,
        toggle,
    }
}