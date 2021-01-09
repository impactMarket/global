import { Grid, Typography } from '@material-ui/core';
import BigNumber from 'bignumber.js';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';

import {
    LineChart,
    Line,
    BarChart,
    Bar, Tooltip, XAxis, ResponsiveContainer
} from 'recharts';
import { colors } from '../../contants';
import { useStyles } from '../../helpers/theme';
import { IGlobalDailyState } from '../../types';

import moment from 'moment';
import { currencyValue, humanifyNumber, numericalValue } from '../../helpers';
import Paper from '../../components/Paper';
import Box from '../../components/Box';
import config from '../../config';

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

interface ChartData {
    title: string;
    subtitle: string;
    postsubtitle: string;
    data: {
        name: number;
        uv: number;
    }[];
    line: boolean;
    tooltip: string;
    growth: number;
}

export default function Distribution(props: { globalValues: IGlobalDailyState[] }) {
    const classes = useStyles();
    const [outflow, setOutflow] = useState<ChartData[]>([]);

    useEffect(() => {
        const loadOutflow = () => {
            const charts: ChartData[] = [
                {
                    title: 'Claimed',
                    subtitle: currencyValue(humanifyNumber(props.globalValues.reduce((acc, c) => acc.plus(c.claimed), new BigNumber('0')).toString())),
                    postsubtitle: 'cUSD',
                    data: props.globalValues.map((g) => ({ name: new Date(g.date).getTime(), uv: parseFloat(humanifyNumber(g.claimed)) })).reverse(),
                    line: false,
                    tooltip: '${{value}} claimed on {{date}}',
                    growth: Math.ceil((parseFloat(humanifyNumber(props.globalValues[0].claimed)) - parseFloat(humanifyNumber(props.globalValues[29].claimed))) / parseFloat(humanifyNumber(props.globalValues[29].claimed)) * 100)
                },
                {
                    title: '# Claims',
                    subtitle: numericalValue(props.globalValues.reduce((acc, c) => acc + c.claims, 0).toString()),
                    postsubtitle: '',
                    data: props.globalValues.map((g) => ({ name: new Date(g.date).getTime(), uv: g.claims })).reverse(),
                    line: true,
                    tooltip: '{{value}} claims on {{date}}',
                    growth: Math.ceil((props.globalValues[0].claims - props.globalValues[29].claims) / props.globalValues[29].claims * 100)
                },
                {
                    title: 'New Beneficiaries',
                    subtitle: numericalValue(props.globalValues.reduce((acc, c) => acc + c.beneficiaries, 0).toString()),
                    postsubtitle: '',
                    data: props.globalValues.map((g) => ({ name: new Date(g.date).getTime(), uv: g.beneficiaries })).reverse(),
                    line: true,
                    tooltip: '{{value}} new beneficiaries on {{date}}',
                    growth: Math.ceil((props.globalValues[0].beneficiaries - props.globalValues[29].beneficiaries) / props.globalValues[29].beneficiaries * 100)
                },
            ]
            console.log(props.globalValues[0].date, new Date(props.globalValues[0].date))
            setOutflow(charts);
        }
        loadOutflow();
    }, [props.globalValues]);

    const drawChart = (chart: ChartData) => {
        if (chart.line) {
            return <LineChart data={chart.data}>
                <XAxis dataKey="name" hide />
                <Tooltip content={<CustomTooltip tooltip={chart.tooltip} />} />
                <Line type="monotone" dataKey="uv" stroke={colors.aquaBlue} strokeWidth={2} dot={<></>} />
            </LineChart>
        }
        return <BarChart
            data={chart.data}
        >
            <XAxis dataKey="name" hide />
            <Tooltip content={<CustomTooltip tooltip={chart.tooltip} />} />
            <Bar dataKey="uv" radius={[4, 4, 4, 4]} fill={colors.aquaBlue} barSize={4} />
        </BarChart>
    }

    return <>
        <div>
            <Typography variant="h2" className={classes.headerSection}>
                Monthly Distribution
            </Typography>
            <Typography variant="subtitle1">
                Beneficiaries from different communities can claim $cUSD on a regular basis from their community contracts. UBI parameters take into consideration their beneficiaries' basic needs, reality on the ground, and assessment by local social organizations and community leaders.
            </Typography>
        </div>
        <div style={{ margin: '16px 0px' }}>
            <Grid container justify="space-between" spacing={2}>
                {outflow.map((chart) => (
                    <Grid key={chart.title} item xs={12} sm={4}>
                        <Paper
                            style={{ padding: 16 }}
                        >
                            <Box
                                title={chart.title}
                                subtitle={chart.subtitle}
                                postsubtitle={chart.postsubtitle}
                                hasChart={true}
                            >
                                <ResponsiveContainer width="100%" height={config.chartsHeight}>
                                    {drawChart(chart)}
                                </ResponsiveContainer>
                            </Box>
                            <Typography variant="body1" style={{ marginTop: '10px' }}>
                                <img src="assets/chart/up.svg" /> <b>{chart.growth}%</b> Last 30 days
                            </Typography>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </div>
    </>

}
