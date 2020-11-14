export interface IClaimLocation {
    communityPublicId: string;
    gps: {
        latitude: number,
        longitude: number;
    };
}

export interface IGlobalDailyState {
    date: Date;
    meanSSI: number;
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
}

export interface IGlobalValue {
    title: string;
    subtitle: string;
    postsubtitle?: string;
}

// API and app

export interface ICommunityVars {
    _claimAmount: string;
    _baseInterval: string;
    _incrementInterval: string;
    _maxClaim: string;
}

export interface ICommunityInfoBeneficiary {
    address: string;
    name: string;
    claimed: string;
}

export interface ICommunity {
    publicId: string;
    requestByAddress: string;
    contractAddress: string;
    name: string;
    description: string;
    descriptionEn: string;
    language: string;
    currency: string;
    country: string;
    city: string;
    gps: {
        latitude: number;
        longitude: number;
    };
    visibility: string;
    email: string;
    coverImage: string;
    status: string;
    txCreationObj: ICommunityVars;
}

export interface ICommunityState {
    claimed: string;
    raised: string;
    beneficiaries: number;
    backers: number;
}

export interface ICommunityMetrics {
    ssiDayAlone: number;
    ssi: number;
    ubiRate: number;
    estimatedDuration: number;
}

export interface ICommunityInfo extends ICommunity {
    backers: string[];
    beneficiaries: {
        added: ICommunityInfoBeneficiary[];
        removed: ICommunityInfoBeneficiary[];
    };
    managers: string[];
    ssi: {
        dates: Date[],
        values: number[],
    };
    totalClaimed: string;
    totalRaised: string;
    vars: ICommunityVars;
    state: ICommunityState;
    metrics: ICommunityMetrics;
}
