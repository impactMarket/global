import React, { useEffect, useState } from 'react';
import { Container } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import Api from './services/api';
import GlobalSummary from './pages/home/GlobalSummary';
import Distribution from './pages/home/Distribution';
import { IGlobalDailyState } from './types';
import Communities from './pages/home/Communities';
import { muiTheme } from './helpers/theme';
import Inflow from './pages/home/Inflow';
import Footer from './components/Footer';
import Banner from './components/Banner';
import HealingTheWorld from './pages/home/HealingTheWorld';
import Economic from './pages/home/Economic';


export default function App() {
    const [globalValues, setGlobalValues] = useState<IGlobalDailyState[]>([]);
    const [lastQuarterAvgSSI, setLastQuarterAvgSSI] = useState<{ date: Date, avgMedianSSI: number }[]>([]);
    const [todayData, setTodayData] = useState<{ totalClaimed: string, totalBeneficiaries: number, totalRaised: string } | undefined>(undefined);
    const [totalBackers, setTotalBackers] = useState<number>(0);
    const [reachedLastMonth, setReachedLastMonth] = useState<number>(0);

    useEffect(() => {
        const loadGlobalValues = async () => {
            const values = await Api.getGlobalValues();
            if (values !== undefined) {
                setGlobalValues(values.monthly);
                setLastQuarterAvgSSI(values.lastQuarterAvgSSI);
                setTodayData(values.today);
                setTotalBackers(values.totalBackers);
                setReachedLastMonth(values.reachedLastMonth);
            }
        }
        loadGlobalValues();
    }, []);

    if (globalValues.length === 0 || lastQuarterAvgSSI.length === 0 || todayData === undefined || totalBackers === 0 || reachedLastMonth === 0) {
        return null;
    }

    return (
        <ThemeProvider theme={muiTheme}>
            <Banner />
            <GlobalSummary globalValues={globalValues[0]} todayData={todayData} totalBackers={totalBackers} />
            <Container maxWidth="lg">
                <HealingTheWorld />
                <Communities globalValues={globalValues} lastQuarterAvgSSI={lastQuarterAvgSSI} />
                <Distribution globalValues={globalValues} />
                <Inflow globalValues={globalValues} />
                <Economic globalValues={globalValues} reachedLastMonth={reachedLastMonth} />
            </Container>
            <Footer />
        </ThemeProvider>
    );
}
