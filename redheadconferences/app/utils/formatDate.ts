
import conferenceData from '../data/conference-data.json';

const timeZone = conferenceData.conference.timezone;

export function formatDate(
    iso: string,
    locale = 'de-DE',
    options: Intl.DateTimeFormatOptions = {
        dateStyle: 'long',
        timeZone: timeZone
    }
) {
    return new Date(iso).toLocaleDateString(locale, options);
}
