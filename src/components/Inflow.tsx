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

import moment from 'moment';
import { currencyValue, humanifyNumber, numericalValue } from '../helpers';
import { IGlobalInflowStatus } from '../types';

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
            <Paper elevation={3} style={{ padding: 10, textAlign: "center" }}>
                <p>{tooltip.replace('{{date}}', moment(parseInt(label!)).format('MMMM Do')).replace('{{value}}', payload![0].value)}</p>
            </Paper>
        );
    }
    return null;
}

export default function Inflow(props: { fundraising: IGlobalInflowStatus }) {
    const classes = useStyles();
    const [fundraising, setFundraising] = useState<any[]>([]);
    const [chartLineWidth, setChartLineWidth] = useState(100);
    const [chartBarWidth, setChartBarWidth] = useState(100);


    useEffect(() => {
        const loadFundraising = () => {
            const raisedData: any[] = [];
            const backersData: any[] = [];
            let backersAddresses: any[] = [];
            const fundingRateData: any[] = [];
            let totalRaised = new BigNumber(0);
            let lastFundingRate = 0;


            const buildLast30Days = (data: any, callback: (date: number, daydata: any | undefined) => void) => {
                const today = moment().utc().startOf('day').toDate().getTime();
                for (let day = 30; day >= 0; day -= 1) {
                    callback(today - day * 86400000, data[today - day * 86400000]);
                }
            }

            buildLast30Days(props.fundraising.raises, (date: number, daydata: any | undefined) => {
                if (daydata === undefined) {
                    raisedData.push({ name: date, uv: 0 });
                    backersData.push({ name: date, uv: 0 });
                } else {
                    let raisedThisDay = new BigNumber(0)
                    for (let x = 0; x < daydata.length; x += 1) {
                        raisedThisDay = raisedThisDay.plus(daydata[x].values.value)
                    }
                    raisedData.push({ name: date, uv: parseFloat(humanifyNumber(raisedThisDay)) });
                    const backersThisDay = daydata.reduce((acc: any, o: any) => (acc[o.values.from] = (acc[o.values.from] || 0) + 1, acc), {});
                    backersAddresses = backersAddresses.concat(Object.keys(backersThisDay));
                    backersData.push({ name: date, uv: Object.keys(backersThisDay).length });
                    totalRaised = totalRaised.plus(raisedThisDay);
                }
            });

            const charts = [
                {
                    title: 'Raised',
                    subtitle: currencyValue(humanifyNumber(totalRaised)),
                    postsubtitle: 'cUSD',
                    data: raisedData,
                    line: false,
                    tooltip: '{{date}} were raised ${{value}}',
                },
                {
                    title: 'Backers',
                    subtitle: numericalValue(Array.from(new Set(backersAddresses)).length.toString()),
                    postsubtitle: '',
                    data: backersData,
                    line: true,
                    tooltip: '{{date}} were {{value}} new backers',
                },
                {
                    title: 'Funding Rate',
                    subtitle: numericalValue(lastFundingRate.toString()),
                    postsubtitle: '',
                    data: fundingRateData,
                    line: true,
                    tooltip: '{{date}} had {{value}} funding rate',
                },
            ]
            setFundraising(charts);
        }
        loadFundraising();
    }, [props.fundraising]);

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

    const drawChart = (chart: any) => {
        if (chart.line) {
            return <LineChart width={chartLineWidth} height={200} data={chart.data}>
                <XAxis dataKey="name" hide />
                <Tooltip content={<CustomTooltip tooltip={chart.tooltip} />} />
                <Line type="monotone" dataKey="uv" stroke={colors.aquaBlue} strokeWidth={2} dot={<></>} />
            </LineChart>
        }
        return <BarChart
            width={chartBarWidth}
            height={200}
            data={chart.data}
        >
            <XAxis dataKey="name" hide />
            <Tooltip content={<CustomTooltip tooltip={chart.tooltip} />} />
            <Bar dataKey="uv" fill={colors.aquaBlue} barSize={4} />
        </BarChart>
    }

    return <>
        <div>
            <Typography variant="h2" className={classes.header}>
                Fundraising (Inflow)
            </Typography>
            <Typography variant="subtitle1" className={classes.subtitle1}>
                Anyone can back those communities by sending cUSD (Celo Dollar) directly to their contracts. This measures global monthly inflow, and its rate vs fundraising.
            </Typography>
        </div>
        <div style={{ margin: '16px 0px' }}>
            <Grid container justify="space-between" spacing={2}>
                {fundraising.map((chart) => (
                    <Grid key={chart.title} item xs={12} sm={(chart.line ? 3 : 6)}>
                        <Paper elevation={3} style={{ padding: 10 }} ref={(r) => paperSize(r, chart.line)}>
                            <Typography variant="h4">
                                {chart.title}
                            </Typography>
                            <Typography variant="h3" display="inline">{chart.subtitle}</Typography>&nbsp;
                        <Typography variant="subtitle2" display="inline">{chart.postsubtitle}</Typography>
                            {drawChart(chart)}
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </div>
    </>

}
