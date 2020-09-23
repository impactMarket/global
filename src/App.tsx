import React, { useEffect, useState } from 'react';
import { Container, Typography } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import BigNumber from 'bignumber.js';
import Api from './services/api';
import GlobalScanner from './components/GlobalScanner';
import Distribution from './components/Distribution';
import { IGlobalOutflowStatus, IGlobalValue } from './types';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        header: {
            fontFamily: 'Gelion',
            fontWeight: 550,
            margin: 30,
        },
        headerContainer: {
            backgroundColor: 'white',
            padding: '5% 0px',
        },
    }),
);
export default function App() {
    const classes = useStyles();

    const [globalValues, setGlobalValues] = useState<IGlobalValue[]>([]);
    const [globalOutflowValues, setGlobalOutflowValues] = useState<IGlobalOutflowStatus>({
        claimed: {},
        communities: {},
        beneficiaries: {}
    });

    useEffect(() => {
        const loadGlobalValues = async () => {
            const values = await Api.getGlobalValues();
            if (values !== undefined) {
                const gValues = values.global;
                const totalValues = [
                    {
                        title: 'Total Raised',
                        value: new BigNumber(gValues.totalRaised).dividedBy(10 ** 18).toFixed(2, 1),
                        isMoney: true,
                    },
                    {
                        title: 'Total Distributed',
                        value: new BigNumber(gValues.totalDistributed).dividedBy(10 ** 18).toFixed(2, 1),
                        isMoney: true,
                    },
                    {
                        title: 'Total Beneficiaries',
                        value: gValues.totalBeneficiaries,
                        isMoney: false,
                    },
                    {
                        title: 'Total Claims',
                        value: gValues.totalClaims,
                        isMoney: false,
                    },
                ];
                setGlobalValues(totalValues);
                setGlobalOutflowValues(values.outflow);
            }
        }
        loadGlobalValues();
    }, []);

    return (
        <>
            <div className={classes.headerContainer}>
                <Container maxWidth="xl">
                    <div style={{ textAlign: 'center' }}>
                        <img src="assets/impactmarket.svg" alt="impactmarket logo" />
                        <Typography variant="h3" gutterBottom className={classes.header}>
                            Global Basic Income Distribution Scanner
                        </Typography>
                    </div>
                    <GlobalScanner globalValues={globalValues} />
                </Container>
            </div>
            <Container maxWidth="lg">
                <div style={{ marginLeft: 35 }}>
                    <Typography variant="h3" component="h3" gutterBottom className={classes.header}>
                        Montly Activity (last 30 days)
                    </Typography>
                </div>
                <Distribution outflow={globalOutflowValues} />
            </Container>
        </>
    );
}
