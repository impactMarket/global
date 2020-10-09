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
};
