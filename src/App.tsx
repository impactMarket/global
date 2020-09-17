import React from 'react';
import { Container, Typography } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import ImpactMarketLogoSvg from './components/ImpactMarketLogoSvg';
import GlobalScanner from './components/GlobalScanner';
import Distribution from './components/Distribution';

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

    return (
        <>
            <div className={classes.headerContainer}>
                <Container maxWidth="xl">
                    <div style={{ textAlign: 'center' }}>
                        <ImpactMarketLogoSvg />
                        <Typography variant="h3" gutterBottom className={classes.header}>
                            Global Basic Income Distribution Scanner
                        </Typography>
                    </div>
                    <GlobalScanner />
                </Container>
            </div>
            <Container maxWidth="lg">
                <div style={{ marginLeft: 35 }}>
                    <Typography variant="h3" component="h3" gutterBottom className={classes.header}>
                        Montly Activity (last 30 days)
                    </Typography>
                </div>
                <Distribution />
            </Container>
        </>
    );
}
