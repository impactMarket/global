import axios from 'axios';
import { IGlobalStatus } from '../types';

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
    static async getGlobalValues(): Promise<IGlobalStatus | undefined> {
        const result = await getRequest<IGlobalStatus>(
            '/global-status'
        );
        return result;
    }
}
