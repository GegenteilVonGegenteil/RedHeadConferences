import conferenceData from '../../app/data/conference-data.json';

export default defineEventHandler((event) => {
    setResponseHeader(event, 'Cache-Control', 'no-store');

    return {
        data: conferenceData,
        updatedAt: new Date().toISOString()
    };
});
