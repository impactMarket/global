export interface IGlobalStatus {
    totalRaised: string,
    totalDistributed: string,
    totalBeneficiaries: string,
    totalClaims: string,
}

export interface IGlobalOutflowStatus {
    claimed: any,
    communities: any,
    beneficiaries: any,
}

export interface IGlobalApiResult {
    global: IGlobalStatus,
    outflow: IGlobalOutflowStatus,
}

export interface IGlobalValue {
    title: string;
    value: string;
    isMoney: boolean;
}
