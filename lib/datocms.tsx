import { executeQuery } from '@datocms/cda-client';

export const performRequest = (query) => {
    return executeQuery(query, {
        token: process.env.DATOCMS_API_TOKEN,
    });
}

