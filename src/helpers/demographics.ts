import { IDemographics } from '../types';
import countriesJSON from '../constants/countries.json';
import { chunk, sortBy } from 'lodash';
interface IDataItem {
    label: string;
    value: number;
}
interface IBeneficaryItem {
    country: string;
    female: number;
    male: number;
    total: number;
    undisclosed: number;
}

const countries: {
    [key: string]: {
        name: string;
        native: string;
        phone: string;
        currency: string;
        languages: string[];
        emoji: string;
    };
} = countriesJSON;

export const getDemographicsAgeRange = (
    data: IDemographics[] | undefined
): IDataItem[] => {
    if (!data || !data.length) {
        return [];
    }

    let total = 0;

    const ageItems = [...new Array(6)];

    const ranges = ageItems.map((_, index: number) => {
        const value = data.reduce((result, countryData: any) => {
            const rangeValue = countryData[`ageRange${index + 1}`] || 0;

            return result + rangeValue;
        }, 0);

        total = total + value;

        let label =
            index + 1 < ageItems.length
                ? `${index ? (index + 1) * 10 + 5 : 18}-${(index + 2) * 10 + 4}`
                : "65+";

        return { label, value };
    });

    return ranges.map(({ value, ...rest }) => ({
        ...rest,
        percentage: +((value / total) * 100).toFixed(),
        value,
    }));
};

export const getDemographicsBeneficiariesByCountry = (
    data: any[] | undefined,
    chunkSize = 6
): IBeneficaryItem[][] => {
    if (!data || !data.length) {
        return [];
    }

    const result = data.map(({ country: countryCode, female, male, totalGender, undisclosed }) => {
        const country = countries[countryCode]?.name;

        const totalMF = male + female;
        const nMale = (male / totalMF) * totalGender;
        const nFemale = (female / totalMF) * totalGender;

        return {
            country,
            female: totalMF === 0 ? 0 : nFemale,
            male: totalMF === 0 ? 0 : nMale,
            total: totalGender,
            undisclosed,
        };
    });

    const chunks = chunk(sortBy(result, ['total']).reverse(), chunkSize);

    chunks[chunks.length - 1] = [...chunks[chunks.length - 1], ...new Array(chunkSize - chunks[chunks.length - 1].length).map(() => ({ country: '', female: 0, male: 0, total: 0, undisclosed: 0 }))];

    return chunks;
};

export const getDemographicsTotalPercentage = (data: any[] | undefined): number => {
    const { totalGender, undisclosed } = data?.reduce((result, { totalGender, undisclosed }) => ({
        totalGender: result.totalGender + totalGender,
        undisclosed: result.undisclosed + undisclosed,
    }), { totalGender: 0, undisclosed: 0 });

    return +((undisclosed / totalGender) * 100).toFixed();
}
