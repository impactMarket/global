import { Typography } from '@material-ui/core';
import React from 'react';
import { useStyles } from '../helpers/theme';
import Globe from './Globe';


export default function HealingTheWorld() {
    const classes = useStyles();

    return <>
        <div>
            <Typography variant="h2" className={classes.header}>
                Healing the world, ending poverty
            </Typography>
            <Typography variant="subtitle1">
                Discover communities and their beneficiaries’ activity on accessing/claiming a basic income that is empowering them out of poverty.
            </Typography>
        </div>
        <Globe />
    </>

}
