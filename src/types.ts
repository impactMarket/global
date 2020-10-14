export interface IClaimLocation {
    communityPublicId: string;
    gps: {
        latitude: number,
        longitude: number;
    };
}

export interface IGlobalStatus {
    totalRaised: string,
    totalDistributed: string,
    totalBeneficiaries: string,
    totalClaims: string,
}

export interface IGlobalOutflowStatus {
    claims: any;
    beneficiaries: any;
}

export interface IGlobalInflowStatus {
    raises: any;
    rate: any;
}

export interface IGlobalApiResult {
    global: IGlobalStatus;
    outflow: IGlobalOutflowStatus;
    inflow: IGlobalInflowStatus;
}

export interface IGlobalValue {
    title: string;
    value: string;
    isMoney: boolean;
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
    createdAt: string;
    updatedAt: string;
}

export interface ICommunityInfo extends ICommunity {
    backers: string[];
    beneficiaries: {
        added: ICommunityInfoBeneficiary[];
        removed: ICommunityInfoBeneficiary[];
    };
    managers: string[];
    ssi: {
        dates: Date[];
        values: number[];
    };
    totalClaimed: string;
    totalRaised: string;
    vars: ICommunityVars;
}
