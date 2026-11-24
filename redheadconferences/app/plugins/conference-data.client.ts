export default defineNuxtPlugin((nuxtApp) => {
    const { refreshConferenceData } = useConferenceData();

    nuxtApp.hook('app:mounted', () => {
        void refreshConferenceData();

        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.addEventListener(
                'controllerchange',
                () => void refreshConferenceData()
            );
        }

        window.addEventListener('online', () => {
            void refreshConferenceData();
        });
    });

    nuxtApp.hook('page:finish', () => {
        void refreshConferenceData();
    });
});