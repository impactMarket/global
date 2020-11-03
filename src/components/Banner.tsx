import React from 'react';
import { Container, Grid, Typography } from '@material-ui/core';
import { useStyles } from '../helpers/theme';

export default function Banner() {
    const classes = useStyles();

    return <div style={{ backgroundColor: '#2362FB' }}>
        <Container maxWidth="lg" style={{ paddingTop: '55px' }}>
            <Grid container justify="space-between" spacing={2}>
                <Grid item xs={12} sm={8}>
                    <img src="assets/banner/logo_white.png" alt="impactmarket logo" />
                    <Typography variant="subtitle1" className={classes.bannerText}>
                        impactMarket enables any vulnerable community to have its own unconditional basic income system for their beneficiaries, where each member can claim a fixed amount on a regular basis, and make/receive payments, with just a mobile phone.
                    </Typography>
                    <Typography variant="subtitle1" className={classes.bannerText}>
                        Anyone can back those beneficiaries by donating directly to their UBI community contracts.
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <div>
                        <img style={{
                            position: 'absolute',
                            paddingTop: '20.17px',
                        }} src="assets/banner/back_smartphone.png" alt="back smartphone impactmarket" />
                        <img style={{
                            position: 'absolute',
                            paddingLeft: '94.81px',
                        }} src="assets/banner/front_smartphone.png" alt="front smartphone impactmarket" />
                    </div>
                </Grid>
            </Grid>
        </Container>
    </div>

}
