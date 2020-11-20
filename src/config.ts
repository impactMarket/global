import dotenv from 'dotenv';
dotenv.config();

export default {
    /**
     * Base URL to api
     */
    baseApiUrl: process.env.REACT_APP_BASE_URL_API! + '/api',

    /**
     * Base URL to api
     */
    chainExplorer: process.env.REACT_APP_CHAIN_EXPLORER_URL!,

    /**
     * cUSD decimals to use in ui format
     */
    cUSDDecimals: 18,

    /**
     * MapBox API Key
     */
    mapBoxApiKey: process.env.REACT_APP_MAPBOX_KEY!,

    /**
     * MapBox Style
     */
    mapBoxStyle: process.env.REACT_APP_MAPBOX_STYLE!,

    /**
     * Firebase configuration for Analytics etc
     */
    firebaseConfig: {
        apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
        authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
        databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
        projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
        storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.REACT_APP_FIREBASE_APP_ID,
        measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
    },

    /**
     * Boolean to use firebase or not
     */
    useFirebase: process.env.REACT_APP_USE_FIREBASE === 'true',

    chartsHeight: 148,
};
