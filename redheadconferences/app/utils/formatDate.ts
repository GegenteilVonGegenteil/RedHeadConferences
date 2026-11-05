import {useConferenceData} from "~/composables/useConferenceData.ts";

const timeZone = useConferenceData().getConference().timezone;

export function formatDate(
    iso: string,
    locale = 'de-DE',
    options: Intl.DateTimeFormatOptions = { dateStyle: 'long', timeZone: timeZone }
) {
    return new Date(iso).toLocaleDateString(locale, options)
}