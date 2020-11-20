import React from 'react';
import { Container, createStyles, Grid, makeStyles, Typography } from '@material-ui/core';
import { useStyles } from '../helpers/theme';

export default function Banner() {
    const classes = useStyles();
    const bannerClasses = bannerStyles();

    return <div className={bannerClasses.blueBackground}>
        <Container maxWidth="lg">
            <Grid container justify="space-between" spacing={2}>
                <Grid item xs={12} md={6}>
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
                            impactMarket enables any community to have its own Unconditional Basic Income for their beneficiaries. Anyone can back those communities by sending/donating $cUSD directly to their UBI contracts.
                        </Typography>
                        <div className={bannerClasses.buttonBox}>
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
                <Grid item xs={12} md={6} className={bannerClasses.mobileAppBox}>
                    <img
                        className={bannerClasses.mobileApp}
                        src="assets/banner/mobileapp.png"
                        alt="mobile app impactmarket"
                    />
                </Grid>
            </Grid>
        </Container>
    </div>

}

const bannerStyles = makeStyles((theme) =>
    createStyles({
        buttonBox: {
            [theme.breakpoints.down('sm')]: {
                textAlign: 'center',
            },
            [theme.breakpoints.up('md')]: {
                bottom: '60.83px',
                position: 'absolute',
            },
        },
        blueBackground: {
            backgroundColor: '#2362FB',
            position: 'relative',
            [theme.breakpoints.down('xs')]: {
                height: '825px',
            },
            [theme.breakpoints.up('sm')]: {
                height: '765px',
            },
            [theme.breakpoints.up('md')]: {
                height: '507px',
            },
        },
        mobileAppBox: {
            [theme.breakpoints.down('sm')]: {
                textAlign: 'center',
            },
            [theme.breakpoints.up('md')]: {
                maxWidth: '425px',
            },
        },
        mobileApp: {
            [theme.breakpoints.down('sm')]: {
                width: '345px',
                maxWidth: '100%',
                paddingTop: '42.37px',
            },
            [theme.breakpoints.up('md')]: {
                maxHeight: '520px',
                paddingTop: '50px',
            },
        },
    }),
);
