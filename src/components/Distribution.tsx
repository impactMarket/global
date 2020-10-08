import { Grid, Paper, Typography } from '@material-ui/core';
import BigNumber from 'bignumber.js';
import React, { useEffect, useRef, useState } from 'react';

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
    const [charLineWidth, setChartLineWidth] = useState(100);
    const [charBarWidth, setChartBarWidth] = useState(100);


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

    const paperSize = (instance: unknown, isLine: boolean) => {
        if (instance === null) {
            return;
        }
        if (isLine) {
            setChartLineWidth((instance as any).getBoundingClientRect().width - 20);
        } else {
            setChartBarWidth((instance as any).getBoundingClientRect().width - 20);
        }
    }

    return <>
        <div>
            <Typography variant="h2" className={classes.header}>
                Montly Distribution (Outflow)
            </Typography>
            <Typography variant="subtitle1" className={classes.subtitle1}>
                Beneficiaries from different communities have access to an unconditional basic income, by claiming $cUSD on a regular basis from their community contracts. Each contract UBI parameters take into consideration their beneficiaries' basic needs, and assessment by local social organizations and community leaders.
            </Typography>
        </div>
        <Grid container justify="space-between" spacing={2}>
            {outflow.map((chart) => (
                <Grid key={chart.title} item xs={(chart.line ? 3 : 6)}>
                    <Paper elevation={3} style={{ padding: 10 }} ref={(r) => paperSize(r, chart.line)}>
                        <Typography variant="h4">
                            {chart.title}
                        </Typography>
                        <Typography variant="h3" component="p" display="inline">{chart.subtitle}</Typography>&nbsp;
                        <Typography variant="subtitle2" display="inline">{chart.postsubtitle}</Typography>
                        {chart.line ? <LineChart width={charLineWidth} height={200} data={chart.data}>
                            <XAxis dataKey="name" hide />
                            <Tooltip />
                            <Line type="monotone" dataKey="uv" stroke={colors.aquaBlue} strokeWidth={2} dot={<></>} />
                        </LineChart> : <BarChart
                            width={charBarWidth}
                            height={200}
                            data={chart.data}
                        >
                                <XAxis dataKey="name" hide />
                                <Tooltip />
                                <Bar dataKey="uv" fill={colors.aquaBlue} barSize={4} />
                            </BarChart>}
                    </Paper>
                </Grid>
            ))}
        </Grid>
    </>

}
