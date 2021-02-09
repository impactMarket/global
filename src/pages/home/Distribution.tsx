import { Grid, Typography } from '@material-ui/core';
import BigNumber from 'bignumber.js';
import React, { useEffect, useState } from 'react';
import { useStyles } from '../../helpers/theme';
import { ChartData, GlobalGrowth, IGlobalDailyState } from '../../types';
import { currencyValue, humanifyNumber, numericalValue } from '../../helpers';
import ChartBox from '../../components/ChartBox';

export default function Distribution(props: { globalValues: IGlobalDailyState[],  growth: GlobalGrowth }) {
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
                    growth: props.growth.claimed,
                },
                {
                    title: '# Claims',
                    subtitle: numericalValue(props.globalValues.reduce((acc, c) => acc + c.claims, 0).toString()),
                    postsubtitle: '',
                    data: props.globalValues.map((g) => ({ name: new Date(g.date).getTime(), uv: g.claims })).reverse(),
                    line: true,
                    tooltip: '{{value}} claims on {{date}}',
                    growth: props.growth.claims,
                },
                {
                    title: 'New Beneficiaries',
                    subtitle: numericalValue(props.globalValues.reduce((acc, c) => acc + c.beneficiaries, 0).toString()),
                    postsubtitle: '',
                    data: props.globalValues.map((g) => ({ name: new Date(g.date).getTime(), uv: g.beneficiaries })).reverse(),
                    line: true,
                    tooltip: '{{value}} new beneficiaries on {{date}}',
                    growth: props.growth.beneficiaries,
                },
            ]
            console.log(props.globalValues[0].date, new Date(props.globalValues[0].date))
            setOutflow(charts);
        }
        loadOutflow();
    }, [props.globalValues]);

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
                        <ChartBox chart={chart} />
                    </Grid>
                ))}
            </Grid>
        </div>
    </>

}
