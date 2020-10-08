import {
    Paper,
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
import { claimFrequencyToText, humanifyNumber } from '../helpers';
import { useStyles } from '../helpers/theme';


export default function Communities() {
    const classes = useStyles();
    const [communities, setCommunities] = useState<ICommunityInfo[]>([]);

    useEffect(() => {
        const loadCommunities = () => Api.getAllValidCommunities().then(setCommunities);
        loadCommunities();
    }, []);

    const shortenAddress = (address: string) => `${address.slice(0, 8)}..${address.slice(36, 42)}`;
    const currentSSI = (ssi: { dates: Date[], values: number[] }) => {
        if (ssi.dates.length === 0) {
            return 'N/A';
        }
        return ssi.values[0];
    }

    return <>
        <div>
            <Typography variant="h2" className={classes.header}>
                Communities
            </Typography>
            <Typography variant="subtitle1" className={classes.subtitle1}>
                UBI communities are usually managed and promoted by social, governamental or local organizations, who setup the initial UBI parameters, and add/remove which beneficiaries have access to it.
            </Typography>
        </div>
        <TableContainer component={Paper}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell className={classes.subtitle2}>Community name</TableCell>
                        <TableCell align="center" className={classes.subtitle2}>UBI Rate</TableCell>
                        <TableCell align="center" className={classes.subtitle2}>SSI</TableCell>
                        <TableCell align="center" className={classes.subtitle2}>Beneficiary</TableCell>
                        <TableCell align="center" className={classes.subtitle2}>Backers</TableCell>
                        <TableCell align="center" className={classes.subtitle2}>Claimed</TableCell>
                        <TableCell align="center" className={classes.subtitle2}>Raised</TableCell>
                        <TableCell align="center" className={classes.subtitle2}>Address</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {communities.map(community => (
                        <TableRow key={community.publicId}>
                            <TableCell component="th" scope="row">
                                {community.name}
                                <br />
                                <span className={classes.subtitle2}>{community.city}, {community.country}</span>
                            </TableCell>
                            <TableCell align="center">${humanifyNumber(community.vars._claimAmount)}/{claimFrequencyToText(community.vars._baseInterval)}</TableCell>
                            <TableCell align="center">{currentSSI(community.ssi)}</TableCell>
                            <TableCell align="center">{community.beneficiaries.added.length}</TableCell>
                            <TableCell align="center">{community.backers.length}</TableCell>
                            <TableCell align="center">{new BigNumber(community.totalClaimed).dividedBy(community.totalRaised).multipliedBy(100).decimalPlaces(2, 1).toString()}%</TableCell>
                            <TableCell align="center">${humanifyNumber(community.totalRaised)}</TableCell>
                            <TableCell align="center">{shortenAddress(community.contractAddress)}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    </>

}
