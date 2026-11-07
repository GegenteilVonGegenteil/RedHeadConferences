import {useLocalStorage} from "~/composables/useLocalStorage.ts";
import type {Theme} from "~/types/theme.ts";

export function useTheme() {
    const STORAGE_KEY = 'theme';
    const DEFAULT_THEME: Theme = 'light';

    const { value: theme, isHydrated } = useLocalStorage<Theme>(STORAGE_KEY, DEFAULT_THEME);

    watch(
        [theme, isHydrated],
        ([newTheme, hydrated]) => {
            if (!hydrated) return;
            document.documentElement.setAttribute('data-theme', newTheme);
        },
        { immediate: true }
    );

    return { theme, isHydrated };
}