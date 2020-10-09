import axios from 'axios';
import { ICommunityInfo, IGlobalApiResult } from '../types';

import config from './../config';

axios.defaults.baseURL = config.baseApiUrl;

async function getRequest<T>(endpoint: string): Promise<T | undefined> {
    let response: T | undefined;
    try {
        const result = await axios.get(endpoint);
        if (result.status >= 400) {
            return undefined;
        }
        if (result.data === '') {
            response = undefined;
        } else {
            response = result.data as T;
        }
    } catch (error) {
        // TODO: handle error
        // console.log(error);
    }
    return response;
}

export default class Api {
    static async getGlobalValues(): Promise<IGlobalApiResult | undefined> {
        const result = await getRequest<IGlobalApiResult>(
            '/global-status'
        );
        return result;
    }

    static async getAllValidCommunities(): Promise<ICommunityInfo[]> {
        const result = await getRequest<ICommunityInfo[]>(
            '/community/all/valid'
        );
        return result ? result : [];
    }
}
