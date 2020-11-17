export interface IClaimLocation {
    communityPublicId: string;
    gps: {
        latitude: number,
        longitude: number;
    };
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
}

export interface IGlobalValue {
    title: string;
    subtitle: string;
    postsubtitle?: string;
}

// API and app

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
    /**
     * @deprecated
     */
    txCreationObj: ICommunityVars; // TODO: remove in future
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
    historicalSSI: number[];
}

export interface ICommunityInfo extends ICommunity {
    /**
     * @deprecated
     */
    backers: string[];
    beneficiaries: {
        added: ICommunityInfoBeneficiary[];
        removed: ICommunityInfoBeneficiary[];
    };
    managers: string[];
    /**
     * @deprecated
     */
    ssi: {
        dates: Date[],
        values: number[],
    };
    /**
     * @deprecated
     */
    totalClaimed: string;
    /**
     * @deprecated
     */
    totalRaised: string;
    /**
     * @deprecated
     */
    vars: ICommunityVars; // TODO: remove
    state: ICommunityState;
    metrics?: ICommunityMetrics;
    contractParams: ICommunityContractParams;
}

/**
 * @deprecated
 */
export interface ICommunityVars {
    _claimAmount: string;
    _baseInterval: string;
    _incrementInterval: string;
    _maxClaim: string;
}

export interface ICommunityContractParams {
    claimAmount: string,
    maxClaim: string,
    baseInterval: number,
    incrementInterval: number,
}

export interface ICommunityInfoBeneficiary {
    address: string;
    name: string;
    claimed: string;
}
