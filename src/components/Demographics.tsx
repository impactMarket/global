import { Grid, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { useStyles } from '../helpers/theme';
import Box from './Box';
import Paper from './Paper';
import config from '../config';
import { IDemographics } from '../types';
import styled from 'styled-components';

import { BarChart, Bar, LabelList, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { getDemographicsAgeRange, getDemographicsBeneficiariesByCountry } from '../helpers/demographics';
import { Pagination } from './Pagination';

type GenderType = 'female' | 'male' | 'undisclosed';

const countriesPerPage = 6;

const colors: {[key: string]: string} = {
	female: '#E6B8E7',
	male: 'rgba(35, 98, 251, 0.5)',
  undisclosed: '#E5EAF2'
}

const gender: {[key: string]: string} = { female: 'Woman', male: 'Man', undisclosed: 'Undisclosed' };

interface ICircleProps {
	gender: string
};

interface ICountryCartPage {
	activePage: number;
	index: number;
}

const Cirlce = styled.div<ICircleProps>`
	background-color: ${({ gender }) => colors[gender]};
	border-radius: 50%;
	display: inline-block;
	height: 8px;
	width: 8px;
`;

const LegendList = styled.ul`
	list-style: none;
	margin: 0;
    padding: 0;

	li {
		display: inline-block;
	}
`;

const CountryChartPage = styled.div<ICountryCartPage>`
	display: inline-block;
	position: absolute;
	transform: translateX(${({ activePage, index }) =>  (index - activePage) * 100}%);
	transition: 0.5s cubic-bezier(0.25, 0.1, 0.25, 1);
	width: 100%;
`;

const CountryChartsWrapper = styled.div`
	display: block;
	height: 150px;
	overflow: hidden;
	position: relative;
	white-space: nowrap;
    margin-top: 8px;
`;

const Legend = () => (
	<LegendList>
        {Object.keys(gender).map((genderType: string, index) => (
            <li style={{ marginLeft: index ? 24 : 0 }} key={genderType}>
                <Cirlce gender={genderType} />
                <span style={{ marginLeft: 12 }}>{gender[genderType]}</span>
            </li>
        ))}
	</LegendList>
);

const DemographicsWrapper = styled.div`
    margin: 16px 0;

    .recharts-wrapper {
        font-family: "Gelion-Regular";
    }

    .recharts-cartesian-axis-tick-value {
        fill: #73839d;
        font-size: 14px;
    }

    .recharts-text.recharts-label {
        fill: #73839d;
        font-size: 14px;
        font-weight: 700;
    }

    .recharts-responsive-container {
        margin-top: auto;
    }
`;

const CustomTooltip = (props: {
  active?: boolean,
  payload?: any[],
}) => {
  const { active, payload = [] } = props;

if (active && payload !== null) {
        return (
          <Paper style={{ padding: 10, textAlign: 'center' }}>
              {payload.map(({name, payload: { total }, value}, index) => {
                  const percentage = +((value / total) * 100).toFixed(2);

                  return (
                      <Typography variant='body1' key={index} style={{ textAlign: 'left' }}>
                          {gender[name]}: {!isNaN(percentage) ? `${percentage}%` : '---'}
                      </Typography>
                  )
              })}
          </Paper>
      );
  }
  return null;
}

const getPaginationLabel = (countryPage: number, countriesCount: number) => {
    const current = (countryPage * countriesPerPage) + 1;
    const maxCurrent = (countryPage * countriesPerPage) + countriesPerPage < countriesCount ? (countryPage * countriesPerPage) + countriesPerPage : countriesCount;

    const label = `${current}-${maxCurrent} of ${countriesCount} Countries`;

    return label;
}

const Demographics = (props: { globalDemographics: IDemographics[] }) => {
    const classes = useStyles();
	const { globalDemographics } = props;
	const [countryPage, setCountryPage] = useState<number>(0);

	const ageRankData = getDemographicsAgeRange(globalDemographics)

	const countriesData = getDemographicsBeneficiariesByCountry(globalDemographics)
    const countriesCount = globalDemographics.length;

	const changePage = (page: number) => {
		if (page < 0) {
			return setCountryPage(countriesData.length - 1);
		}

		const nextPage = countriesData.length > page ? page : 0;

		return setCountryPage(nextPage);
	}

    return (
        <>
            <Typography variant="h2" className={classes.headerSection}>
                Demographics
            </Typography>
            <DemographicsWrapper style={{ margin: "16px 0px" }}>
                <Grid alignItems="stretch" container justify="flex-start" spacing={2}>
                    <Grid item lg={4} md={6} xs={12}>
                        <Paper style={{ padding: 16 }}>
                        <Box flex hasChart title="Age Range">
                            <ResponsiveContainer width="100%" height={config.chartsHeight}>
                            <BarChart data={ageRankData} margin={{ top: 16 }}>
                                <XAxis axisLine={false} dataKey="label" tickLine={false} />
                                <Bar
                                    barSize={32}
                                    dataKey="percentage"
                                    fill="rgba(116, 114, 243, 0.5)"
                                    radius={[4, 4, 4, 4]}
                                >
                                <LabelList dataKey="percentage" formatter={(val) => `${val}%`} offset={8} position="top" />
                                </Bar>
                            </BarChart>
                            </ResponsiveContainer>
                        </Box>
                        </Paper>
                    </Grid>
                    <Grid item lg={8} md={6} xs={12}>
                        <Paper style={{ padding: 16 }}>
                        <Box flex legend={<Legend />} title="Country (Number of beneficiaries)">
                            <CountryChartsWrapper>
                            {countriesData.map((countryData, index) => (
                                <CountryChartPage key={index} activePage={countryPage} index={index}>
                                <ResponsiveContainer height={config.chartsHeight}>
                                    <BarChart data={countryData} layout="vertical" margin={{ right: 50 }}>
                                    <XAxis hide={true} type="number" />
                                    <YAxis axisLine={false} dataKey="country" interval={0} width={80} tickLine={false} type="category" />
                                    <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f2f2f2' }} />
                                    {Object.keys(gender).map((genderType, index) => {
                                        const isLast = Object.keys(gender).length === index + 1;
                                        const isFirst = !index;

                                        return (
                                          <Bar
                                              barSize={10}
                                              dataKey={genderType}
                                              fill={colors[genderType]}
                                              radius={
                                                (isFirst || isLast)
                                                    ? isFirst
                                                      ? [4, 0, 0, 4]
                                                      : [0, 4, 4, 0]
                                                    : undefined
                                              }
                                              stackId="a"
                                          >
                                              {isLast && <LabelList dataKey="total" offset={5} position="right" />}
                                          </Bar>
                                        )
                                    })}
                                    </BarChart>
                                </ResponsiveContainer>
                                </CountryChartPage>
                            ))}
                            </CountryChartsWrapper>
                            <Pagination
                                activePage={countryPage}
                                handlePageChange={changePage}
                                isLastPage={(countryPage + 1) * countriesPerPage >= countriesCount}
                                label={getPaginationLabel(countryPage, countriesCount)}
                            />
                        </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </DemographicsWrapper>
        </>
    );
};

export default Demographics;
