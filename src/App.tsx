import React, { useEffect, useState } from 'react';
import { Container, Typography } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import Api from './services/api';
import GlobalSummary from './components/GlobalSummary';
import Distribution from './components/Distribution';
import { IGlobalInflowStatus, IGlobalOutflowStatus, IGlobalValue } from './types';
import Communities from './components/Communities';
import { muiTheme, useStyles } from './helpers/theme';
import { currencyValue, humanifyNumber, numericalValue } from './helpers';
import Inflow from './components/Inflow';
import { colors } from './contants';
import Footer from './components/Footer';
import Banner from './components/Banner';


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
            <Banner />
            <GlobalSummary globalValues={globalValues} />
            <Container maxWidth="lg">
                <Distribution outflow={globalOutflowValues} />
                <Communities />
                <Inflow fundraising={globalInflowValues} />
            </Container>
            <Footer />
        </ThemeProvider>
    );
}
