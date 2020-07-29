import React from 'react';
import { Container, Grid, Paper, Typography } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Logo from './assets/logo.png';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        paper: {
            width: 250,
        },
        container: {
            textAlign: 'center'
        }
    }),
);
export default function App() {
    const classes = useStyles();

    const totalValues = [
        {
            title: 'Total Raised',
            value: '2,360,401',
        },
        {
            title: 'Total Distributed',
            value: '952,778',
        },
        {
            title: 'Total Beneficiaries',
            value: '6,912',
        },
        {
            title: 'Total Claims',
            value: '380,847',
        },
    ]

    return (
        <Container maxWidth="xl" className={classes.container}>
            <img src={Logo} alt="Logo" height="200" />
            <Typography variant="h4" component="h4" gutterBottom>
                Global Basic Income Distribution Scanner
            </Typography>
            <Grid container className={classes.root} spacing={2}>
                <Grid item xs={12}>
                    <Grid container justify="center" spacing={2}>
                        {totalValues.map((total) => (
                            <Grid key={total.title} item>
                                <Paper elevation={3} className={classes.paper}>
                                    <Typography variant="h6" gutterBottom>
                                        {total.title}
                                    </Typography>
                                    <Typography variant="body1" gutterBottom>
                                        ${total.value} cUSD
                                    </Typography>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
}
