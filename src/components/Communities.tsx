import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from '@material-ui/core';
import BigNumber from 'bignumber.js';
import React, { useEffect, useState } from 'react';
import Api from '../services/api';
import { ICommunityInfo } from '../types';
import { claimFrequencyToText, currencyValue, humanifyNumber } from '../helpers';
import { useStyles } from '../helpers/theme';
import config from '../config';
import Paper from './Paper';


export default function Communities() {
    const classes = useStyles();
    const [communities, setCommunities] = useState<ICommunityInfo[]>([]);

    useEffect(() => {
        const loadCommunities = () => Api.getAllValidCommunities().then(setCommunities);
        loadCommunities();
    }, []);

    const shortenAddress = (address: string) => `${address.slice(0, 8)}..${address.slice(36, 42)}`;
    const currentSSI = (ssi: { dates: Date[], values: number[] }) => {
        const total = ssi.dates.length;
        if (total === 0) {
            return 'N/A';
        }
        return ssi.values[total - 1];
    }

    return <>
        <div>
            <Typography variant="h2" className={classes.header}>
                Communities
            </Typography>
            <Typography variant="subtitle1">
                UBI communities are usually managed and promoted by social, governamental or local organizations, who setup the initial UBI parameters, and add/remove which beneficiaries have access to it.
            </Typography>
        </div>
        <div style={{ margin: '16px 0px' }}>
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.tableRowHead}>Community name</TableCell>
                            <TableCell align="center" className={classes.tableRowHead}>Allowance</TableCell>
                            {/* <TableCell align="center" className={classes.tableRowHead}>UBI rate</TableCell>
                        <TableCell align="center" className={classes.tableRowHead}>Duration</TableCell> */}
                            <TableCell align="center" className={classes.tableRowHead}>SSI</TableCell>
                            <TableCell align="center" className={classes.tableRowHead}>Beneficiaries</TableCell>
                            <TableCell align="center" className={classes.tableRowHead}>Backers</TableCell>
                            <TableCell align="center" className={classes.tableRowHead}>Claimed</TableCell>
                            <TableCell align="center" className={classes.tableRowHead}>Raised</TableCell>
                            <TableCell align="center" className={classes.tableRowHead}>UBI Contract</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {communities.map(community => (
                            <TableRow key={community.publicId}>
                                <TableCell component="th" scope="row">
                                    {community.name}
                                    <br />
                                    <span className={classes.tableRowHead}>{community.city}, {community.country}</span>
                                </TableCell>
                                <TableCell align="center">{currencyValue(humanifyNumber(community.vars._claimAmount))}/{claimFrequencyToText(community.vars._baseInterval)}</TableCell>
                                <TableCell align="center">{currentSSI(community.ssi)}</TableCell>
                                <TableCell align="center">{community.beneficiaries.added.length}</TableCell>
                                <TableCell align="center">{community.backers.length}</TableCell>
                                <TableCell align="center">{currencyValue(humanifyNumber(community.totalClaimed))} ({new BigNumber(community.totalClaimed).dividedBy(community.totalRaised).multipliedBy(100).decimalPlaces(2, 1).toString()}%)</TableCell>
                                <TableCell align="center">{currencyValue(humanifyNumber(community.totalRaised))} / {currencyValue(humanifyNumber(new BigNumber(community.vars._maxClaim).multipliedBy(community.beneficiaries.added.length)))}</TableCell>
                                <TableCell align="center"><a style={{ textDecoration: 'none' }} href={`${config.chainExplorer}/${community.contractAddress}/token_transfers`}>{shortenAddress(community.contractAddress)}</a></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    </>

}
