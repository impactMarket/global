import React from 'react'
import {
    Container,
    createStyles,
    Grid,
    makeStyles,
    Typography,
} from '@material-ui/core'
import { useStyles } from '../helpers/theme'
import { Button, Logo } from '../theme/components'
import { Currencies } from '../svg/Currencies'
import { modal } from '../lib/modalManager/modal'
import { AppDownloadButtons } from '../theme/components/AppDownloadButtons/AppDownloadButtons'
import { colors } from '../theme/variables'

const description = 'impactMarket enables any community to have its own Unconditional Basic Income for their beneficiaries. Anyone can back those communities by sending/donating $cUSD directly to their UBI contracts.';

export default function Banner() {
    const classes = useStyles()
    const bannerClasses = bannerStyles()

    const handleDonateButtonClick = () => {
        modal.open('donate', { heading: 'Donate', withCloseButton: true });
    }

    return (
        <>
            <div className={bannerClasses.blueBackground}></div>
            <Container maxWidth="lg" style={{ position: 'relative' }}>
                <Grid container justify="space-between" spacing={2}>
                    <Grid item xs={12} md={6}>
                        <Logo href="/" large style={{ marginTop: 58 }} white />
                        <div
                            style={{
                                paddingTop: '33px',
                            }}
                        >
                            <Typography
                                variant="subtitle1"
                                className={classes.bannerText}
                            >
                                {description}
                            </Typography>
                            <div className={bannerClasses.buttonsWrapper}>
                                <div style={{ flexShrink: 0, minWidth: 286 }}>
                                  <AppDownloadButtons style={{ marginTop: 32 }} />
                                </div>
                                <div className={bannerClasses.donateButtonWrapper}>
                                    <Button fluid onClick={handleDonateButtonClick} white >
                                        Donate
                                        <Currencies style={{ marginLeft: '8px' }} />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={12} md={6} className={bannerClasses.mobileAppBox}>
                        <img className={bannerClasses.mobileApp} src="assets/banner/mobileapp.png" alt="mobile app impactmarket" />
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}

const bannerStyles = makeStyles((theme) =>
    createStyles({
        buttonsWrapper: {
            flexShrink: 0,
            [theme.breakpoints.up('md')]: {
                display: 'flex',
                alignItems: 'flex-end',
                whiteSpace: 'nowrap',
            },
        },
        donateButtonWrapper: {
            [theme.breakpoints.down('sm')]: {
                textAlign: 'center',
                marginTop: 16,
                alignItems: 'center',
                display: 'flex',
            },
            [theme.breakpoints.up('md')]: {
                marginTop: 'auto',
                marginLeft: 16
            },
        },
        blueBackground: {
            backgroundColor: colors.p06,
            position: 'absolute',
            width: '100%',
            zIndex: 0,
            [theme.breakpoints.down('xs')]: {
                height: 825,
            },
            [theme.breakpoints.up('sm')]: {
                height: 765,
            },
            [theme.breakpoints.up('md')]: {
                height: 507,
            },
        },
        mobileAppBox: {
            position: 'relative',
            [theme.breakpoints.down('sm')]: {
                textAlign: 'center',
            },
            [theme.breakpoints.up('md')]: {
                maxWidth: 425,
            },
        },
        mobileApp: {
            [theme.breakpoints.down('sm')]: {
                width: 345,
                maxWidth: '100%',
                paddingTop: 42.37,
            },
            [theme.breakpoints.up('md')]: {
                maxHeight: 520,
                paddingTop: 50,
                marginBottom: -54
            },
        },
    })
)
