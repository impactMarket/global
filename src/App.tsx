import React, { useEffect, useState } from 'react';
import { Container, Typography } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import Api from './services/api';
import GlobalScanner from './components/GlobalScanner';
import Distribution from './components/Distribution';
import { IGlobalOutflowStatus, IGlobalValue } from './types';
import Communities from './components/Communities';
import { muiTheme, useStyles } from './helpers/theme';
import { humanifyNumber } from './helpers';


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
                        value: humanifyNumber(gValues.totalRaised),
                        isMoney: true,
                    },
                    {
                        title: 'Total Distributed',
                        value: humanifyNumber(gValues.totalDistributed),
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
        <ThemeProvider theme={muiTheme}>
            <div className={classes.headerContainer}>
                <Container maxWidth="lg">
                    <div style={{ textAlign: 'center' }}>
                        <img src="assets/impactmarket.svg" alt="impactmarket logo" />
                        <Typography variant="h1" className={classes.header}>
                            Global Basic Income Distribution Scanner
                        </Typography>
                    </div>
                    <GlobalScanner globalValues={globalValues} />
                </Container>
            </div>
            <Container maxWidth="lg">
                <Distribution outflow={globalOutflowValues} />
                <Communities />
            </Container>
        </ThemeProvider>
    );
}
