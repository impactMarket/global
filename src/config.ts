import dotenv from 'dotenv';

const envFound = dotenv.config();
if (!envFound) {
    // This error should crash whole process

    throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export default {
    /**
     * Base URL to api
     */
    baseApiUrl: process.env.REACT_APP_BASE_URL_API + '/api',
};
