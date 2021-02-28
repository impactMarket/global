import axios from 'axios';
import { IClaimLocation, ICommunity, IDemographics, IGlobalApiResult } from '../types';

import config from './../config';

axios.defaults.baseURL = config.baseApiUrl;
delete axios.defaults.headers['Host']

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

async function postRequest<T>(endpoint: string, body: object): Promise<T | undefined> {
    let response: T | undefined;
    try {
        const result = await axios.post(endpoint, body);

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
        const result = await getRequest<IGlobalApiResult>('/global/status')
        return result
    }

    static async getGlobalDemographics(): Promise<IDemographics[] | undefined> {
        const result = await getRequest<IDemographics[]>(
            '/global/demographics'
        );

        return result;
    }

    static async listCommunities(order: string): Promise<ICommunity[]> {
        const result = await getRequest<ICommunity[]>(
            '/community/list/full/' + order
        )
        return result ? result : []
    }

    static async getAllClaimLocation(): Promise<IClaimLocation[]> {
        const result = await getRequest<IClaimLocation[]>('/claim-location')
        return result ? result : []
    }

    static async subscribeEmail(email: string): Promise<any> {
        const result = await postRequest('/subscribe', { email });

        return { success: result === 'OK' };
    }
}