import { Typography } from '@material-ui/core';
import moment from 'moment';
import React, { Component } from 'react'
import { Bar, BarChart, LineChart, Tooltip, XAxis, ResponsiveContainer, Line } from 'recharts';
import config from '../config';
import { colors } from '../contants';
import { ChartData } from '../types';
import Box from './Box';
import Paper from './Paper';


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

interface IChartBoxProps {
    chart: ChartData;
}
export default class ChartBox extends Component<IChartBoxProps, {}> {

    drawChart = (chart: ChartData) => {
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

    render() {
        const { chart } = this.props;
        return (
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
                        {this.drawChart(chart)}
                    </ResponsiveContainer>
                </Box>
                <Typography variant="body1" style={{ marginTop: '10px' }}>
                    {chart.growth > 0 ? <img alt="" src="assets/chart/up.svg" /> : <img alt="" src="assets/chart/down.svg" />} <b>{chart.growth}%</b> vs previous 30 days
                </Typography>
            </Paper>
        )
    }
}
