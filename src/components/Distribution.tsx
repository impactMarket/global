import { Grid, Paper, Typography } from '@material-ui/core';
import BigNumber from 'bignumber.js';
import React, { useEffect, useState } from 'react';

import {
    LineChart,
    Line,
    BarChart,
    Bar, Tooltip, XAxis
} from 'recharts';
import { colors } from '../contants';
import { useStyles } from '../helpers/theme';
import { IGlobalOutflowStatus } from '../types';

export default function Distribution(props: { outflow: IGlobalOutflowStatus }) {
    const classes = useStyles();
    const [outflow, setOutflow] = useState<any[]>([]);


    useEffect(() => {
        const loadOutflow = () => {
            // TODO: remove this preClaimedData after having more than 30 days of data
            const preClaimedData = [];
            const communitiesData = [];
            const beneficiariesData = [];
            let totalClaimed = new BigNumber(0);
            let totalCommunities = 0;
            let totalBeneficiaries = 0;
            for (const day in props.outflow.claimed) {
                preClaimedData.push({ name: day, uv: props.outflow.claimed[day].length });
                // TODO: improce total calculation
                totalClaimed = props.outflow.claimed[day].reduce((a: BigNumber, b: { values: { _amount: string } }) => a.plus(b.values._amount), totalClaimed);
            }
            const claimedData = Array(30 - preClaimedData.length).fill({ name: '', uv: 0 }).concat(preClaimedData);
            for (const day in props.outflow.communities) {
                communitiesData.push({ name: day, uv: props.outflow.communities[day].length });
                totalCommunities += props.outflow.communities[day].length;
            }
            for (const day in props.outflow.beneficiaries) {
                beneficiariesData.push({ name: day, uv: props.outflow.beneficiaries[day].length });
                totalBeneficiaries += props.outflow.beneficiaries[day].length;
            }
            const charts = [
                {
                    title: 'Claimed',
                    subtitle: '$' + totalClaimed.dividedBy(10 ** 18).toFixed(2, 1),
                    postsubtitle: 'cUSD',
                    data: claimedData,
                    line: false,
                },
                {
                    title: 'Communities',
                    subtitle: totalCommunities,
                    postsubtitle: '',
                    data: communitiesData,
                    line: true,
                },
                {
                    title: 'Beneficiaries',
                    subtitle: totalBeneficiaries,
                    postsubtitle: '',
                    data: beneficiariesData,
                    line: true,
                },
            ]
            setOutflow(charts);
        }
        loadOutflow();
    }, [props.outflow]);

    return <>
        <div style={{ marginLeft: 35 }}>
            <Typography variant="h2" className={classes.header}>
                Montly Distribution (Outflow)
            </Typography>
            <Typography variant="subtitle1" className={classes.subtitle1}>
                Beneficiaries from different communities have access to an unconditional basic income, by claiming $cUSD on a regular basis from their community contracts. Each contract UBI parameters take into consideration their beneficiaries' basic needs, and assessment by local social organizations and community leaders.
            </Typography>
        </div>
        <Grid container style={{ flexGrow: 1 }} spacing={2}>
            <Grid item xs={12}>
                <Grid container justify="center" spacing={2}>
                    {outflow.map((chart) => (
                        <Grid key={chart.title} item>
                            <Paper elevation={3} style={{ padding: 10, width: (chart.line ? 250 : 515) }}>
                                <Typography variant="h6">
                                    {chart.title}
                                </Typography>
                                <Typography variant="body1">
                                    <span style={{ fontFamily: 'Gelion', fontWeight: 550, fontSize: 30 }}>{chart.subtitle}</span> {chart.postsubtitle}
                                </Typography>
                                {chart.line ? <LineChart width={250} height={200} data={chart.data}>
                                    <XAxis dataKey="name" hide />
                                    <Tooltip />
                                    <Line type="monotone" dataKey="uv" stroke={colors.aquaBlue} strokeWidth={2} dot={<></>} />
                                </LineChart> : <BarChart
                                    width={500}
                                    height={200}
                                    data={chart.data}
                                >
                                        <XAxis dataKey="name" hide />
                                        <Tooltip />
                                        <Bar dataKey="uv" fill={colors.aquaBlue} barSize={4} />
                                    </BarChart>}
                                {/* <Typography variant="body1" className={classes.description}>
                                    {chart.growth}% Last 30 days
                                </Typography> */}
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </Grid>
    </>

}
