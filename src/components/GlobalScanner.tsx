import { createStyles, Grid, makeStyles, Paper, Theme, Typography } from '@material-ui/core';
import BigNumber from 'bignumber.js';
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
    value: string;
    isMoney: boolean;
}
export default function GlobalScanner() {
    const classes = useStyles();
    const [globalValues, setGlobalValues] = useState<IGlobalValue[]>([]);

    useEffect(() => {
        const loadGlobalValues = async () => {
            const values = await Api.getGlobalValues();
            if (values !== undefined) {
                const totalValues = [
                    {
                        title: 'Total Raised',
                        value: new BigNumber(values.totalRaised).dividedBy(10 ** 18).toString(),
                        isMoney: true,
                    },
                    {
                        title: 'Total Distributed',
                        value: new BigNumber(values.totalDistributed).dividedBy(10 ** 18).toString(),
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


    const dataText = (data: { title: string, value: string, isMoney: boolean }) => {
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
