import React, { useEffect, useState } from 'react';
import { Container } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import Api from './services/api';
import GlobalSummary from './pages/home/GlobalSummary';
import Distribution from './pages/home/Distribution';
import { GlobalGrowth, IDemographics, IGlobalDailyState } from './types';
import Demographics from './components/Demographics';
import Communities from './pages/home/Communities';
import { muiTheme } from './helpers/theme';
import Inflow from './pages/home/Inflow';
import Footer from './components/Footer';
import Banner from './components/Banner';
import HealingTheWorld from './pages/home/HealingTheWorld';
import Economic from './pages/home/Economic';
import './App.css';
import { ModalManager } from './lib/modalManager/ModalManager';
import { modals } from './modals';

export default function App() {
    const [globalValues, setGlobalValues] = useState<IGlobalDailyState[]>([]);
    const [globalDemographics, setGlobalDemographics] = useState<IDemographics[]>([]);
    const [lastQuarterAvgSSI, setLastQuarterAvgSSI] = useState<{ date: Date, avgMedianSSI: number }[]>([]);
    const [todayData, setTodayData] = useState<{ totalClaimed: string, totalBeneficiaries: number, totalRaised: string } | undefined>(undefined);
    const [totalBackers, setTotalBackers] = useState<number>(0);
    const [reachedLastMonth, setReachedLastMonth] = useState<number>(0);
    const [globalGrowth, setGlobalGrowth] = useState<GlobalGrowth>();

    useEffect(() => {
        const loadGlobalValues = async () => {
            const values = await Api.getGlobalValues();
            if (values !== undefined) {
                setGlobalValues(values.monthly);
                setLastQuarterAvgSSI(values.lastQuarterAvgSSI);
                setTodayData(values.today);
                setTotalBackers(values.totalBackers);
                setReachedLastMonth(values.reachedLastMonth.reach);
                setGlobalGrowth(values.growth);
            }
        }

        const getGlobalDemographics = async () => {
            const results = await Api.getGlobalDemographics();
            if (results) {
                setGlobalDemographics(results);
            }
        };

        loadGlobalValues();
        getGlobalDemographics();

    }, []);

    if (globalValues.length === 0 || lastQuarterAvgSSI.length === 0 || todayData === undefined || totalBackers === 0 || reachedLastMonth === 0 || globalGrowth === undefined) {
        return null;
    }

    return (
        <ThemeProvider theme={muiTheme}>
            <ModalManager modals={modals} />
            <Banner />
            <GlobalSummary globalValues={globalValues[0]} todayData={todayData} totalBackers={totalBackers} />
            <div style={{ backgroundColor: '#FAFAFA', maxWidth: '100%', padding: '32px 0 40px', boxSizing: 'border-box', marginTop: 36 }}>
              <Container maxWidth="lg">
                  <HealingTheWorld />
                  <Communities globalValues={globalValues} lastQuarterAvgSSI={lastQuarterAvgSSI} />
                  <Demographics globalDemographics={globalDemographics} />
                  <Distribution globalValues={globalValues} growth={globalGrowth} />
                  <Inflow globalValues={globalValues} growth={globalGrowth} />
                  <Economic globalValues={globalValues} reachedLastMonth={reachedLastMonth} growth={globalGrowth} />
              </Container>
            </div>
            <Footer />
        </ThemeProvider>
    );
}
