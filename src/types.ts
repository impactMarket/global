// export interface IClaimLocation {
//     communityId: string;
//     gps: {
//         latitude: number,
//         longitude: number;
//     };
// }
export interface IClaimLocation {
    latitude: number,
    longitude: number;
}

export interface IGlobalDailyState {
    date: Date;
    avgMedianSSI: number;
    claimed: string;
    claims: number;
    beneficiaries: number;
    raised: string;
    backers: number;
    volume: string;
    transactions: number;
    reach: number;
    totalRaised: string;
    totalDistributed: string;
    totalBackers: number;
    totalBeneficiaries: number;
    givingRate: number;
    ubiRate: number;
    fundingRate: number;
    spendingRate: number;
    avgComulativeUbi: string;
    avgUbiDuration: number;
    totalVolume: string;
    totalTransactions: BigInt;
    totalReach: BigInt;
}

export interface IGlobalApiResult {
    monthly: IGlobalDailyState[];
    lastQuarterAvgSSI: { date: Date, avgMedianSSI: number }[];
    today: { totalClaimed: string, totalBeneficiaries: number, totalRaised: string };
    totalBackers: number;
    reachedLastMonth: number;
}

export interface IGlobalValue {
    title: string;
    subtitle: string;
    postsubtitle?: string;
}

// API and app

export interface CommunityAttributes {
    publicId: string;
    requestByAddress: string;
    contractAddress: string | null;
    name: string;
    description: string;
    descriptionEn: string | null;
    language: string;
    currency: string;
    city: string;
    country: string;
    gps: {
        latitude: number;
        longitude: number;
    };
    email: string;
    visibility: 'public' | 'private';
    coverImage: string;
    status: 'pending' | 'valid' | 'removed';
    started: Date;
}

export interface CommunityStateAttributes {
    claimed: string;
    claims: number;
    beneficiaries: number;
    raised: string;
    backers: number;
}

export interface CommunityContractAttributes {
    claimAmount: string;
    maxClaim: string;
    baseInterval: number;
    incrementInterval: number;
}

export interface CommunityDailyMetricsAttributes {
    ssiDayAlone: number;
    ssi: number;
    ubiRate: number;
    estimatedDuration: number;
    date: Date;
}

export interface ICommunity extends CommunityAttributes {
    state: CommunityStateAttributes;
    contract: CommunityContractAttributes;
    metrics: CommunityDailyMetricsAttributes;
}
