import { ref, watch } from 'vue'

export function useLocalStorage<T>(key :string, initialValue :T) {
    // was gespeichert wird und ob es hydrated ist, "stored"/"hydrated" mit key, um sicher zu stellen das es keinen clash mit anderen States gibt
    const value = useState<T>(`stored${key}`, () => initialValue);
    const isHydrated = useState<boolean>(`stored${key}hydrated`, () => false);

    // wird aufgerufen, wenn Seite am Client initialisiert wurde
    onMounted(() => {
        if (isHydrated.value) return;

        try {
            const stored = localStorage.getItem(key);
            if (stored !== null) value.value = JSON.parse(stored);
        } catch (e) {
            alert(key + 'konnte nicht aus LocalStorage geladen werden.');
        }

        isHydrated.value = true;
    })

    watch(value, (newValue) => {
        if (!isHydrated.value) return;
        try {
            localStorage.setItem(key, JSON.stringify(newValue));
        } catch (e) {
            alert(newValue + 'konnte nicht zu LocalStorage hinzugefügt werden.');
        }
    }, { deep: true });

    return {value, isHydrated}
}
