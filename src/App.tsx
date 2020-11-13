import React, { useEffect, useState } from 'react';
import { Container } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import Api from './services/api';
import GlobalSummary from './components/GlobalSummary';
import Distribution from './components/Distribution';
import { IGlobalDailyState } from './types';
import Communities from './components/Communities';
import { muiTheme } from './helpers/theme';
import Inflow from './components/Inflow';
import Footer from './components/Footer';
import Banner from './components/Banner';
import HealingTheWorld from './components/HealingTheWorld';


export default function App() {
    const [globalValues, setGlobalValues] = useState<IGlobalDailyState[]>([]);

    useEffect(() => {
        const loadGlobalValues = async () => {
            const values = await Api.getGlobalValues();
            if (values !== undefined) {
                setGlobalValues(values.monthly);
            }
        }
        loadGlobalValues();
    }, []);

    if (globalValues.length === 0) {
        return null;
    }

    return (
        <ThemeProvider theme={muiTheme}>
            <Banner />
            <GlobalSummary globalValues={globalValues[0]} />
            <Container maxWidth="lg">
                <HealingTheWorld />
                <Communities />
                <Distribution globalValues={globalValues} />
                <Inflow globalValues={globalValues} />
            </Container>
            <Footer />
        </ThemeProvider>
    );
}
