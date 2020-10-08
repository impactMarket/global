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

import moment from 'moment';
import { humanifyNumber } from '../helpers';

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

export default function Distribution(props: { outflow: IGlobalOutflowStatus }) {
    const classes = useStyles();
    const [outflow, setOutflow] = useState<any[]>([]);
    const [charLineWidth, setChartLineWidth] = useState(100);
    const [charBarWidth, setChartBarWidth] = useState(100);


    useEffect(() => {
        const loadOutflow = () => {
            // TODO: remove this preClaimedData after having more than 30 days of data
            const claimedData: any[] = [];
            const claimsData: any[] = [];
            const beneficiariesData: any[] = [];
            let totalClaimed = new BigNumber(0);
            let totalClaims = 0;
            let totalBeneficiaries = 0;


            const buildLast30Days = (data: any, callback: (date: number, daydata: any | undefined) => void) => {
                const today = moment().utc().startOf('day').toDate().getTime();
                for (let day = 30; day >= 0; day -= 1) {
                    callback(today - day * 86400000, data[today - day * 86400000]);
                }
            }

            buildLast30Days(props.outflow.claims, (date: number, daydata: any | undefined) => {
                if (daydata === undefined) {
                    claimedData.push({ name: date, uv: 0 });
                    claimsData.push({ name: date, uv: 0 });
                } else {
                    let claimedThisDay = new BigNumber(0)
                    for (let x = 0; x < daydata.length; x += 1) {
                        claimedThisDay = claimedThisDay.plus(daydata[x].values._amount)
                    }
                    // console.log(day, humanifyNumber(claimedThisDay))
                    claimedData.push({ name: date, uv: humanifyNumber(claimedThisDay) });
                    claimsData.push({ name: date, uv: daydata.length });
                    totalClaimed = totalClaimed.plus(claimedThisDay)
                    totalClaims += daydata.length;
                }
            });
            buildLast30Days(props.outflow.beneficiaries, (date: number, daydata: any | undefined) => {
                if (daydata === undefined) {
                    beneficiariesData.push({ name: date, uv: 0 });
                } else {
                    beneficiariesData.push({ name: date, uv: daydata.length });
                    totalBeneficiaries += daydata.length;
                }
            });

            const charts = [
                {
                    title: 'Claimed',
                    subtitle: '$' + humanifyNumber(totalClaimed),
                    postsubtitle: 'cUSD',
                    data: claimedData,
                    line: false,
                    tooltip: '{{date}} were claimed ${{value}}',
                },
                {
                    title: 'Claims',
                    subtitle: totalClaims,
                    postsubtitle: '',
                    data: claimsData,
                    line: true,
                    tooltip: '{{date}} were realized {{value}} claims',
                },
                {
                    title: 'Beneficiaries',
                    subtitle: totalBeneficiaries,
                    postsubtitle: '',
                    data: beneficiariesData,
                    line: true,
                    tooltip: '{{date}} were added {{value}} new beneficiaries',
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
                        <Typography variant="h3" display="inline">{chart.subtitle}</Typography>&nbsp;
                        <Typography variant="subtitle2" display="inline">{chart.postsubtitle}</Typography>
                        {chart.line ? <LineChart width={charLineWidth} height={200} data={chart.data}>
                            <XAxis dataKey="name" hide />
                            <Tooltip content={<CustomTooltip tooltip={chart.tooltip} />} />
                            <Line type="monotone" dataKey="uv" stroke={colors.aquaBlue} strokeWidth={2} dot={<></>} />
                        </LineChart> : <BarChart
                            width={charBarWidth}
                            height={200}
                            data={chart.data}
                        >
                                <XAxis dataKey="name" hide />
                                <Tooltip content={<CustomTooltip tooltip={chart.tooltip} />} />
                                <Bar dataKey="uv" fill={colors.aquaBlue} barSize={4} />
                            </BarChart>}
                    </Paper>
                </Grid>
            ))}
        </Grid>
    </>

}
