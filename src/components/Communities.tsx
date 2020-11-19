import {
    Grid,
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
import { ICommunityInfo, IGlobalDailyState } from '../types';
import { claimFrequencyToText, currencyValue, humanifyNumber } from '../helpers';
import { useStyles } from '../helpers/theme';
import config from '../config';
import Paper from './Paper';
import { colors } from '../contants';
import moment from 'moment';
import { LineChart, XAxis, Line, Tooltip } from 'recharts';


function CustomTooltip(props: {
    tooltip: string,
    type?: string,
    payload?: any[],
    label?: string,
    active?: boolean,
}) {
    const { active, payload, label, tooltip } = props;
    if (active && payload !== null && tooltip !== undefined) {
        return (
            <Paper style={{ padding: 10, textAlign: "center" }}>
                <Typography variant="body1" >{tooltip.replace('{{date}}', moment(parseInt(label!)).format('MMMM Do')).replace('{{value}}', payload![0].value)}</Typography>
            </Paper>
        );
    }
    return null;
}

export default function Communities(props: { globalValues: IGlobalDailyState[], lastQuarterAvgSSI: { date: Date, avgMedianSSI: number }[] }) {
    const classes = useStyles();
    const [communities, setCommunities] = useState<ICommunityInfo[]>([]);
    const [chartWidth, setChartWidth] = useState(100);
    const [chartAverageSSIData, setChartAverageSSIData] = useState<{ name: number, uv: any }[]>([]);

    useEffect(() => {
        const loadCommunities = () => Api.getAllValidCommunities().then(setCommunities);
        loadCommunities();
        setChartAverageSSIData(props.lastQuarterAvgSSI.map((g) => ({ name: new Date(g.date).getTime(), uv: g.avgMedianSSI })).reverse());
    }, [props.globalValues, props.lastQuarterAvgSSI]);

    const shortenAddress = (address: string) => `${address.slice(0, 6)}..${address.slice(38, 42)}`;

    function getCountryFlag(countryName: string) {
        switch (countryName) {
            case 'portugal':
                return '🇵🇹';
            case 'brasil':
                return '🇧🇷';
            case 'ghana':
                return '🇬🇭';
            case 'cabo verde':
                return '🇨🇻';
            case 'nigeria':
                return '🇳🇬';
            case 'venezuela':
                return '🇻🇪';
            case 'argentina':
                return '🇦🇷';
            default:
                return '';
        }
    }

    const paperSize = (instance: unknown) => {
        if (instance === null) {
            return;
        }
        setChartWidth((instance as any).getBoundingClientRect().width - 20);
    }

    return <>
        <div>
            <Typography variant="h2" className={classes.header}>
                Communities
            </Typography>
            <Typography variant="subtitle1">
                UBI communities are usually managed and promoted by community leaders and social, governamental, or local organizations, who set up the initial UBI parameters, and add/remove which beneficiaries they believe would most benefit from it.
            </Typography>
        </div>
        <div style={{ margin: '16px 0px' }}>
            <TableContainer component={Paper}>
                <Table >
                    <TableHead>
                        <TableRow>
                            <TableCell variant="head">Community name<br /> & location</TableCell>
                            <TableCell align="center" variant="head" >Allowance<br /> / Beneficiary</TableCell>
                            <TableCell align="center" variant="head">UBI Rate<br /> / Beneficiary</TableCell>
                            <TableCell align="center" variant="head">UBI Duration</TableCell>
                            <TableCell align="center" variant="head">SSI*</TableCell>
                            <TableCell align="center" variant="head">Beneficiaries</TableCell>
                            <TableCell align="center" variant="head">Claimed</TableCell>
                            <TableCell align="center" variant="head">Backers</TableCell>
                            <TableCell align="center" variant="head">Raised</TableCell>
                            <TableCell align="center" variant="head">UBI Contract</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {communities.map(community => (
                            <TableRow key={community.publicId}>
                                <TableCell variant="body">
                                    <span style={{ fontFamily: 'Gelion-Bold', lineHeight: '17px' }}>{community.name}</span>
                                    <br />
                                    <span style={{ color: colors.softGray }}>{community.city}, {community.country}&ensp;{getCountryFlag(community.country.toLowerCase())}</span>
                                </TableCell>
                                <TableCell align="center" variant="body">{currencyValue(humanifyNumber(community.contractParams.claimAmount))} / {claimFrequencyToText(community.contractParams.baseInterval.toString())}</TableCell>
                                <TableCell align="center" variant="body">~${community.metrics!.ubiRate} / {claimFrequencyToText(community.contractParams.baseInterval.toString())}</TableCell>
                                <TableCell align="center" variant="body">~{Math.floor(community.metrics!.estimatedDuration)} months</TableCell>
                                <TableCell align="center" variant="body">{community.metrics!.ssi}</TableCell>
                                <TableCell align="center" variant="body">{community.state.beneficiaries}</TableCell>
                                <TableCell align="center" variant="body">{currencyValue(humanifyNumber(community.state.claimed))} ({new BigNumber(community.state.claimed).dividedBy(community.state.raised).multipliedBy(100).decimalPlaces(0).toString()}%)</TableCell>
                                <TableCell align="center" variant="body">{community.state.backers}</TableCell>
                                <TableCell align="center" variant="body">{currencyValue(humanifyNumber(community.state.raised))} / {currencyValue(humanifyNumber(new BigNumber(community.contractParams.maxClaim).multipliedBy(community.state.beneficiaries)))}</TableCell>
                                <TableCell align="center" variant="body"><a style={{ textDecoration: 'none' }} href={`${config.chainExplorer}/${community.contractAddress}/token_transfers`}>{shortenAddress(community.contractAddress)}</a></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Grid item xs={12} sm={12} style={{ marginTop: '32px' }}>
                <Paper style={{ padding: 10 }}>
                    <Grid container justify="space-between" spacing={2}>
                        <Grid item xs={12} sm={6} style={{ paddingTop: '30px', paddingLeft: '27px', paddingRight: '43.8px' }}>
                            <Typography variant="h1" display="inline">{props.globalValues[0].avgMedianSSI}</Typography><Typography variant="h1" display="inline">%</Typography>
                            <Typography variant="subtitle1" style={{ opacity: 1, marginTop: '8px', marginBottom: '13.18px' }}>
                                Global Self-Sustainability Index (SSI)
                            </Typography>
                            <Typography variant="subtitle2" style={{ color: colors.softGray, letterSpacing: '0.229091px', lineHeight: '18px' }}>
                                *SSI measures communities' collective financial self-sustainability, and average progress. It is inversely correlated with their beneficiaries UBI dependency/need and urgency.
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} ref={(r) => paperSize(r)}>
                            <LineChart width={chartWidth} height={200} data={chartAverageSSIData}>
                                <XAxis dataKey="name" hide />
                                <Tooltip content={<CustomTooltip tooltip={'{{date}} average SSI was {{value}}'} />} />
                                <Line type="monotone" dataKey="uv" stroke={colors.aquaBlue} strokeWidth={2} dot={<></>} />
                            </LineChart>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        </div>
    </>

}
