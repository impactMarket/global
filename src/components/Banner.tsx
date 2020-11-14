import React from 'react';
import { Container, Grid, Typography } from '@material-ui/core';
import { useStyles } from '../helpers/theme';

export default function Banner() {
    const classes = useStyles();

    return <div style={{
        backgroundColor: '#2362FB',
        position: 'relative',
        height: '507px',
    }}>
        <Container maxWidth="lg">
            <Grid container justify="space-between" spacing={2}>
                <Grid item xs={12} sm={8}>
                    <img
                        style={{
                            height: '88px',
                            marginTop: '58px'
                        }}
                        src="assets/banner/logo_white.png"
                        alt="impactmarket logo"
                    />
                    <div
                        style={{
                            paddingTop: '33px',
                        }}
                    >
                        <Typography variant="subtitle1" className={classes.bannerText}>
                            impactMarket enables any vulnerable community to have its own unconditional basic income system for their beneficiaries, where each member can claim a fixed amount on a regular basis, and make/receive payments, with just a mobile phone.
                        </Typography>
                        <Typography variant="subtitle1" className={classes.bannerText}>
                            Anyone can back those beneficiaries by donating directly to their UBI community contracts.
                        </Typography>
                        <div
                            style={{
                                bottom: '60.83px',
                                position: 'absolute',
                            }}
                        >
                            <img
                                style={{
                                    marginBottom: '4.37px',
                                    width: '278px',
                                }}
                                src="assets/banner/openbeta.svg"
                                alt="open beta"
                            />
                            <br />
                            <a href="https://play.google.com/store/apps/details?id=com.impactmarket.mobile">
                                <img
                                    style={{
                                        height: '40.8px',
                                        marginRight: '8.16px'
                                    }}
                                    src="assets/banner/get_on_play_store.png"
                                    alt="get on play store"
                                />
                            </a>
                            <a href="https://testflight.apple.com/join/o19f5StV">
                                <img
                                    style={{ height: '40.8px' }}
                                    src="assets/banner/get_on_app_store.png"
                                    alt="get on app store"
                                />
                            </a>
                        </div>
                    </div>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <div style={{ height: '455px', width: '300px' }}>
                        <img
                            style={{
                                position: 'absolute',
                                paddingTop: '75.17px',
                            }}
                            src="assets/banner/back_smartphone.png"
                            alt="back smartphone impactmarket"
                        />
                        <img
                            style={{
                                position: 'absolute',
                                paddingLeft: '94.81px',
                                paddingTop: '55px',
                            }}
                            src="assets/banner/front_smartphone.png"
                            alt="front smartphone impactmarket"
                        />
                    </div>
                </Grid>
            </Grid>
        </Container>
    </div>

}
