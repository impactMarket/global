import { createStyles, Grid, makeStyles, Paper, Theme, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import Api from '../services/api';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        title: {
            fontFamily: 'Gelion'
        },
        description: {
            fontFamily: 'Gelion'
        },
    }),
);

const paper = {
    padding: 10
};

interface IGlobalValue {
    title: string;
    value: number;
    isMoney: boolean;
}
export default function GlobalScanner() {
    const classes = useStyles();
    const [globalValues, setGlobalValues] = useState<IGlobalValue[]>([]);

    useEffect(() => {
        const loadGlobalValues = async () => {
            const values = await Api.getGlobalValues();
            console.log(values)
            if (values !== undefined) {
                const totalValues = [
                    {
                        title: 'Total Raised',
                        value: values.totalRaised,
                        isMoney: true,
                    },
                    {
                        title: 'Total Distributed',
                        value: values.totalDistributed,
                        isMoney: true,
                    },
                    {
                        title: 'Total Beneficiaries',
                        value: values.totalBeneficiaries,
                        isMoney: false,
                    },
                    {
                        title: 'Total Claims',
                        value: values.totalClaims,
                        isMoney: false,
                    },
                ];
                setGlobalValues(totalValues);
            }
        }
        loadGlobalValues();
    }, []);


    const dataText = (data: { title: string, value: number, isMoney: boolean }) => {
        if (data.isMoney) {
            return <Typography variant="body1" className={classes.description} gutterBottom>
                <span style={{ fontFamily: 'Gelion', fontWeight: 550, fontSize: 30 }}>${data.value}</span> cUSD
            </Typography>;
        }
        return <Typography variant="body1" className={classes.description} gutterBottom>
            <span style={{ fontFamily: 'Gelion', fontWeight: 550, fontSize: 30 }}>{data.value}</span>
        </Typography>;
    }

    return <Grid container className={classes.root} spacing={2}>
        <Grid item xs={12}>
            <Grid container justify="center" spacing={2}>
                {globalValues.map((total) => (
                    <Grid key={total.title} item>
                        <Paper elevation={3} style={{ ...paper, width: 250 }}>
                            <Typography variant="h6" className={classes.title} gutterBottom>
                                {total.title}
                            </Typography>
                            {dataText(total)}
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </Grid>
    </Grid>

}
