import { createStyles, Grid, makeStyles, Paper, Theme, Typography } from '@material-ui/core';
import React from 'react';

import {
    LineChart,
    Line,
    BarChart,
    Bar
} from 'recharts';


const barChartData = [
    { name: '1', uv: 300 },
    { name: '2', uv: 145 },
    { name: '3', uv: 100 },
    { name: '4', uv: 8 },
    { name: '5', uv: 100 },
    { name: '6', uv: 9 },
    { name: '7', uv: 53 },
    { name: '8', uv: 252 },
    { name: '9', uv: 79 },
    { name: '10', uv: 294 },
    { name: '12', uv: 43 },
    { name: '13', uv: 74 },
    { name: '14', uv: 71 },
    { name: '15', uv: 117 },
    { name: '16', uv: 186 },
    { name: '17', uv: 16 },
    { name: '18', uv: 125 },
    { name: '19', uv: 222 },
    { name: '20', uv: 372 },
    { name: '21', uv: 182 },
    { name: '22', uv: 164 },
    { name: '23', uv: 316 },
    { name: '24', uv: 131 },
    { name: '25', uv: 291 },
    { name: '26', uv: 47 },
    { name: '27', uv: 415 },
    { name: '28', uv: 182 },
    { name: '29', uv: 93 },
    { name: '30', uv: 99 },
    { name: '31', uv: 52 },
    { name: '32', uv: 154 },
    { name: '33', uv: 205 },
    { name: '34', uv: 70 },
    { name: '35', uv: 25 },
    { name: '36', uv: 59 },
    { name: '37', uv: 63 },
    { name: '38', uv: 91 },
    { name: '39', uv: 66 },
    { name: '40', uv: 50 },
    { name: '1', uv: 300 },
    { name: '2', uv: 145 },
    { name: '3', uv: 100 },
    { name: '4', uv: 8 },
    { name: '5', uv: 100 },
    { name: '6', uv: 9 },
    { name: '7', uv: 53 },
    { name: '8', uv: 252 },
    { name: '9', uv: 79 },
    { name: '10', uv: 294 },
    { name: '12', uv: 43 },
    { name: '13', uv: 74 },
    { name: '14', uv: 71 },
    { name: '15', uv: 117 },
    { name: '16', uv: 186 },
    { name: '17', uv: 16 },
    { name: '18', uv: 125 },
    { name: '19', uv: 222 },
    { name: '20', uv: 372 },
    { name: '21', uv: 182 },
    { name: '22', uv: 164 },
    { name: '23', uv: 316 },
    { name: '24', uv: 131 },
    { name: '25', uv: 291 },
    { name: '26', uv: 47 },
    { name: '27', uv: 415 },
    { name: '28', uv: 182 },
    { name: '29', uv: 93 },
    { name: '30', uv: 99 },
    { name: '31', uv: 52 },
    { name: '32', uv: 154 },
    { name: '33', uv: 205 },
    { name: '34', uv: 70 },
    { name: '35', uv: 25 },
    { name: '36', uv: 59 },
    { name: '37', uv: 63 },
    { name: '38', uv: 91 },
    { name: '39', uv: 66 },
    { name: '40', uv: 50 },
];

const lineChartData = [
    {
        name: 'Page A', uv: 2400,
    },
    {
        name: 'Page B', uv: 1398,
    },
    {
        name: 'Page C', uv: 9800,
    },
    {
        name: 'Page D', uv: 3908,
    },
    {
        name: 'Page E', uv: 4800,
    },
    {
        name: 'Page F', uv: 3800,
    },
    {
        name: 'Page G', uv: 4300,
    },
];

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

export default function Distribution() {
    const classes = useStyles();

    const charts = [
        {
            title: 'Claimed',
            subtitle: '$357,057',
            postsubtitle: 'cUSD',
            data: barChartData,
            growth: '-12',
            line: false,
        },
        {
            title: 'Communities',
            subtitle: '271',
            postsubtitle: '',
            data: lineChartData,
            growth: '20',
            line: true,
        },
        {
            title: 'Beneficiaries',
            subtitle: '4,761',
            postsubtitle: '',
            data: lineChartData,
            growth: '12',
            line: true,
        },
    ]

    return <>
        <div style={{ marginLeft: 35 }}>
            <Typography variant="h4" component="h4" gutterBottom className={classes.header}>
                Distribution (Outflow)
            </Typography>
        </div>
        <Grid container className={classes.root} spacing={2}>
            <Grid item xs={12}>
                <Grid container justify="center" spacing={2}>
                    {charts.map((chart) => (
                        <Grid key={chart.title} item>
                            <Paper elevation={3} style={{ ...paper, width: (chart.line ? 250 : 515) }}>
                                <Typography variant="h6" className={classes.title} gutterBottom>
                                    {chart.title}
                                </Typography>
                                <Typography variant="body1" className={classes.description} gutterBottom>
                                    <span style={{ fontFamily: 'Gelion', fontWeight: 550, fontSize: 30 }}>{chart.subtitle}</span> {chart.postsubtitle}
                                </Typography>
                                {chart.line ? <LineChart width={250} height={200} data={chart.data}>
                                    <Line type="monotone" dataKey="uv" stroke="#5E72E4" strokeWidth={2} dot={<></>} />
                                </LineChart> : <BarChart
                                    width={500}
                                    height={200}
                                    data={chart.data}
                                >
                                        {/* <Bar dataKey="pv" fill="#8884d8" /> */}
                                        <Bar dataKey="uv" fill="#5E72E4" />
                                    </BarChart>}
                                <Typography variant="body1" className={classes.description} gutterBottom>
                                    {chart.growth}% Last 30 days
                                </Typography>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </Grid>
    </>

}
