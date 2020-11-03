import React from 'react';
import { Container, Typography } from '@material-ui/core';
import { useStyles } from '../helpers/theme';

export default function Footer() {
    const classes = useStyles();

    return <div style={{ paddingTop: 50, paddingBottom: 50, marginTop: 57, backgroundColor: 'white', display: 'flex', alignItems: 'center' }}>
        <Container maxWidth="lg">
            <div style={{ marginBottom: 13 }} >
                <img src="assets/twitter.svg" style={{ marginRight: 13 }} alt="twitter logo" />
                <img src="assets/facebook.svg" style={{ marginRight: 13 }} alt="facebook logo" />
                <img src="assets/linkedin.svg" style={{ marginRight: 13 }} alt="linkedin logo" />
                <img src="assets/telegram.svg" style={{ marginRight: 13 }} alt="telegram logo" />
                <img src="assets/github.svg" style={{ marginRight: 13 }} alt="github logo" />
            </div>
            <Typography variant="subtitle1">
                impactMarket is an open, free, borderless, censorship-resistant and transparent infrastructure. It operates on top of Celo protocol, uses cUSD (Celo Dollar) as underlying digital asset, and runs autonomously through smart contracts.
        </Typography>
        </Container>
    </div>

}
