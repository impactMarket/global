import { createStyles, Grid, makeStyles, Paper, Theme, Typography } from '@material-ui/core';
import BigNumber from 'bignumber.js';
import React, { useEffect, useState } from 'react';

import {
    LineChart,
    Line,
    BarChart,
    Bar, Tooltip, XAxis
} from 'recharts';
import { IGlobalOutflowStatus } from '../types';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        header: {
            fontFamily: 'Gelion',
            fontWeight: 550,
            margin: 30,
        },
        root: {
            flexGrow: 1,
        },
        title: {
            fontFamily: 'Gelion'
        },
        description: {
            fontFamily: 'Gelion'
        },
    }),
);

const paper = {
    padding: 10
};

export default function Distribution(props: { outflow: IGlobalOutflowStatus }) {
    const classes = useStyles();
    const [outflow, setOutflow] = useState<any[]>([]);


    useEffect(() => {
        const loadOutflow = () => {
            // TODO: remove this preClaimedData after having more than 30 days of data
            const preClaimedData = [];
            const communitiesData = [];
            const beneficiariesData = [];
            let totalClaimed = 0;
            let totalCommunities = 0;
            let totalBeneficiaries = 0;
            for (const day in props.outflow.claimed) {
                preClaimedData.push({ name: day, uv: props.outflow.claimed[day].length });
                // TODO: improce total calculation
                totalClaimed += props.outflow.claimed[day].reduce((a: number, b: { values: { _amount: string } }) => a + (new BigNumber(b.values._amount).dividedBy(10 ** 18).toNumber()), totalClaimed);
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
                    subtitle: '$' + totalClaimed,
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
            <Typography variant="h4" component="h4" gutterBottom className={classes.header}>
                Distribution (Outflow)
            </Typography>
        </div>
        <Grid container className={classes.root} spacing={2}>
            <Grid item xs={12}>
                <Grid container justify="center" spacing={2}>
                    {outflow.map((chart) => (
                        <Grid key={chart.title} item>
                            <Paper elevation={3} style={{ ...paper, width: (chart.line ? 250 : 515) }}>
                                <Typography variant="h6" className={classes.title} gutterBottom>
                                    {chart.title}
                                </Typography>
                                <Typography variant="body1" className={classes.description} gutterBottom>
                                    <span style={{ fontFamily: 'Gelion', fontWeight: 550, fontSize: 30 }}>{chart.subtitle}</span> {chart.postsubtitle}
                                </Typography>
                                {chart.line ? <LineChart width={250} height={200} data={chart.data}>
                                    <XAxis dataKey="name" hide />
                                    <Tooltip />
                                    <Line type="monotone" dataKey="uv" stroke="#5E72E4" strokeWidth={2} dot={<></>} />
                                </LineChart> : <BarChart
                                    width={500}
                                    height={200}
                                    data={chart.data}
                                >
                                        {/* <Bar dataKey="pv" fill="#8884d8" /> */}
                                        <XAxis dataKey="name" hide />
                                        <Tooltip />
                                        <Bar dataKey="uv" fill="#5E72E4" />
                                    </BarChart>}
                                {/* <Typography variant="body1" className={classes.description} gutterBottom>
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
