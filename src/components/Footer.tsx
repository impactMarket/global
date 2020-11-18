import React from 'react';
import { Container, Typography } from '@material-ui/core';
import { useStyles } from '../helpers/theme';

export default function Footer() {
    const classes = useStyles();

    return <div className={classes.footer}>
        <Container maxWidth="lg">
            <div style={{ marginBottom: 13 }} >
                <a href="https://twitter.com/IPCTmarket">
                    <img src="assets/twitter.svg" style={{ marginRight: 13 }} alt="twitter logo" />
                </a>
                <a href="https://www.facebook.com/IPCTmarket">
                    <img src="assets/facebook.svg" style={{ marginRight: 13 }} alt="facebook logo" />
                </a>
                <a href="https://www.linkedin.com/company/impactmarket/">
                    <img src="assets/linkedin.svg" style={{ marginRight: 13 }} alt="linkedin logo" />
                </a>
                <a href="https://t.me/impactMarket">
                    <img src="assets/telegram.svg" style={{ marginRight: 13 }} alt="telegram logo" />
                </a>
                <a href="https://github.com/impactMarket">
                    <img src="assets/github.svg" style={{ marginRight: 13 }} alt="github logo" />
                </a>
            </div>
            <Typography variant="subtitle1">
                impactMarket is an open, free, borderless, censorship-resistant and transparent crowdfinance infrastructure. It operates on top of Celo protocol, uses cUSD (Celo Dollar) as main underlying digital asset, and runs autonomously through smart contracts.
            </Typography>
        </Container>
    </div>

}
