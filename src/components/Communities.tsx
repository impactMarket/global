import {
    FormControl,
    Grid,
    IconButton,
    MenuItem,
    Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableFooter,
    TableHead,
    TablePagination,
    TableRow,
    Typography,
    useTheme,
} from '@material-ui/core';
import BigNumber from 'bignumber.js';
import React, { useEffect, useState } from 'react';
import Api from '../services/api';
import { ICommunity, IGlobalDailyState } from '../types';
import { claimFrequencyToText, currencyValue, humanifyNumber } from '../helpers';
import { useStyles } from '../helpers/theme';
import config from '../config';
import Paper from './Paper';
import { colors } from '../contants';
import moment from 'moment';
import { LineChart, XAxis, Line, Tooltip, ResponsiveContainer } from 'recharts';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import countriesJSON from './countries.json';


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

function TablePaginationActions(props: {
    count: number
    onChangePage: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, page: number) => void,
    page: number,
    rowsPerPage: number,
}) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onChangePage } = props;

    const handleFirstPageButtonClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        onChangePage(event, 0);
    };

    const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        onChangePage(event, page - 1);
    };

    const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        onChangePage(event, page + 1);
    };

    const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <div style={{
            flexShrink: 0,
            marginLeft: theme.spacing(2.5),
        }}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </div>
    );
}

export default function Communities(props: { globalValues: IGlobalDailyState[], lastQuarterAvgSSI: { date: Date, avgMedianSSI: number }[] }) {
    const classes = useStyles();
    const [communities, setCommunities] = useState<ICommunity[]>([]);
    const [chartAverageSSIData, setChartAverageSSIData] = useState<{ name: number, uv: any }[]>([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [communitiesFilter, setCommunitiesFilter] = useState('bigger');

    useEffect(() => {
        const loadCommunities = () => Api.listCommunities(communitiesFilter).then(setCommunities);
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
            case 'philippines':
                return '🇵🇭';
            case 'honduras':
                return '🇭🇳';
            default:
                return '';
        }
    }

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: any) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChangeFilter = (event: React.ChangeEvent<{
        name?: string | undefined;
        value: unknown;
    }>, child: React.ReactNode) => {
        setCommunitiesFilter(event.target.value as string);
        Api.listCommunities(event.target.value as string).then(setCommunities);
    }

    return <>
        <div>
            <Typography variant="h2" className={classes.headerSection}>
                Communities ({communities.length})
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
                            <TableCell variant="head" colSpan={10} align="right">
                                <FormControl>
                                    <Select
                                        disableUnderline={true}
                                        style={{ fontSize: '18px', color: colors.almostBlack }}
                                        id="communities-filter-label-select"
                                        value={communitiesFilter}
                                        onChange={handleChangeFilter}
                                    >
                                        <MenuItem value="newest">Newest first</MenuItem>
                                        <MenuItem value="bigger">Bigger first</MenuItem>
                                        <MenuItem value="out_of_funds">Running out of funds first</MenuItem>
                                    </Select>
                                </FormControl></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell variant="head">Community name<br /> & location</TableCell>
                            <TableCell align="center" variant="head">Allowance<br /> / Beneficiary</TableCell>
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
                        {(rowsPerPage > 0
                            ? communities.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : communities
                        ).map(community => (
                            <TableRow key={community.publicId}>
                                <TableCell variant="body">
                                    <span style={{ fontFamily: 'Gelion-Bold', lineHeight: '17px' }}>{community.name}</span>
                                    <br />
                                    <span style={{ color: colors.softGray }}>{community.city}, {countries[community.country].name}&ensp;{countries[community.country].emoji}</span>
                                </TableCell>
                                <TableCell align="center" variant="body">{currencyValue(humanifyNumber(community.contract.claimAmount))} / {claimFrequencyToText(community.contract.baseInterval.toString())}</TableCell>
                                <TableCell align="center" variant="body">
                                    {community.metrics === undefined ? '-' :
                                        `~$${community.metrics.ubiRate} / ${claimFrequencyToText(community.contract.baseInterval.toString())}`}
                                </TableCell>
                                <TableCell align="center" variant="body">
                                    {community.metrics === undefined ? '-' : `~${Math.floor(community.metrics.estimatedDuration)} months`}
                                </TableCell>
                                <TableCell align="center" variant="body">
                                    {community.metrics === undefined ? '-' : `${community.metrics.ssi}`}
                                </TableCell>
                                <TableCell align="center" variant="body">{community.state.beneficiaries}</TableCell>
                                <TableCell align="center" variant="body">{currencyValue(humanifyNumber(community.state.claimed))} ({new BigNumber(community.state.claimed).dividedBy(community.state.raised).multipliedBy(100).decimalPlaces(0).toString()}%)</TableCell>
                                <TableCell align="center" variant="body">{community.state.backers}</TableCell>
                                <TableCell align="center" variant="body">{currencyValue(humanifyNumber(community.state.raised))} / {currencyValue(humanifyNumber(new BigNumber(community.contract.maxClaim).multipliedBy(community.state.beneficiaries)))}</TableCell>
                                <TableCell align="center" variant="body"><a style={{ textDecoration: 'none' }} href={`${config.chainExplorer}/${community.contractAddress}/token_transfers`}>{shortenAddress(community.contractAddress!)}</a></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                colSpan={10}
                                count={communities.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                SelectProps={{
                                    inputProps: { 'aria-label': 'rows per page' },
                                    native: true,
                                }}
                                onChangePage={handleChangePage}
                                onChangeRowsPerPage={handleChangeRowsPerPage}
                                ActionsComponent={TablePaginationActions}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
            <Grid item xs={12} sm={12} style={{ marginTop: '32px' }}>
                <Paper style={{ padding: 16 }}>
                    <Grid container justify="space-between" spacing={2}>
                        <Grid item xs={12} sm={6} style={{ paddingTop: '30px', paddingLeft: '27px', paddingRight: '43.8px', paddingBottom: '25px' }}>
                            <Typography variant="h1" display="inline">{props.globalValues[0].avgMedianSSI}</Typography><Typography variant="h1" display="inline">%</Typography>
                            <Typography variant="subtitle1" style={{ opacity: 1, marginTop: '8px', marginBottom: '13.18px' }}>
                                Global Self-Sustainability Index (SSI)
                            </Typography>
                            <Typography variant="subtitle2" style={{ color: colors.softGray, letterSpacing: '0.229091px', lineHeight: '18px' }}>
                                *SSI measures communities' collective financial self-sustainability, and average progress. It is inversely correlated with their beneficiaries UBI dependency/need and urgency.
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <ResponsiveContainer width="100%" height={131}>
                                <LineChart data={chartAverageSSIData}>
                                    <XAxis dataKey="name" hide />
                                    <Tooltip content={<CustomTooltip tooltip={'{{date}} average SSI was {{value}}'} />} />
                                    <Line type="monotone" dataKey="uv" stroke={colors.aquaBlue} strokeWidth={2} dot={<></>} />
                                </LineChart>
                            </ResponsiveContainer>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        </div>
    </>

}
