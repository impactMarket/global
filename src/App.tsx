import React, { useEffect, useState } from 'react';
import { Container, Typography } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import Api from './services/api';
import GlobalScanner from './components/GlobalScanner';
import Distribution from './components/Distribution';
import { IGlobalInflowStatus, IGlobalOutflowStatus, IGlobalValue } from './types';
import Communities from './components/Communities';
import { muiTheme, useStyles } from './helpers/theme';
import { currencyValue, humanifyNumber, numericalValue } from './helpers';
import Inflow from './components/Inflow';
import { colors } from './contants';
import Footer from './components/Footer';
import config from './config';
import firebase from 'firebase';

if (process.env.NODE_ENV !== 'development') {
    firebase.initializeApp(config.firebaseConfig);
}

export default function App() {
    const classes = useStyles();

    const [globalValues, setGlobalValues] = useState<IGlobalValue[]>([]);
    const [globalOutflowValues, setGlobalOutflowValues] = useState<IGlobalOutflowStatus>({
        claims: {},
        beneficiaries: {}
    });
    const [globalInflowValues, setGlobalInflowValues] = useState<IGlobalInflowStatus>({
        raises: {},
        rate: {},
    });

    useEffect(() => {
        const loadGlobalValues = async () => {
            const values = await Api.getGlobalValues();
            if (values !== undefined) {
                const gValues = values.global;
                const totalValues = [
                    {
                        title: 'Total Raised',
                        value: currencyValue(humanifyNumber(gValues.totalRaised)),
                        isMoney: true,
                    },
                    {
                        title: 'Total Distributed',
                        value: currencyValue(humanifyNumber(gValues.totalDistributed)),
                        isMoney: true,
                    },
                    {
                        title: 'Total Beneficiaries',
                        value: numericalValue(gValues.totalBeneficiaries),
                        isMoney: false,
                    },
                    {
                        title: 'Total Claims',
                        value: numericalValue(gValues.totalClaims),
                        isMoney: false,
                    },
                ];
                setGlobalValues(totalValues);
                setGlobalOutflowValues(values.outflow);
                setGlobalInflowValues(values.inflow);
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
                        <Typography variant="h1" style={{ color: colors.almostBlack, margin: '35px 0px' }}>
                            Global Basic Income Distribution Scanner
                        </Typography>
                    </div>
                    <GlobalScanner globalValues={globalValues} />
                </Container>
            </div>
            <Container maxWidth="lg">
                <Distribution outflow={globalOutflowValues} />
                <Communities />
                <Inflow fundraising={globalInflowValues} />
            </Container>
            <Footer />
        </ThemeProvider>
    );
}
