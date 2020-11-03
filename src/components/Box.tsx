import React from 'react';
import { Typography } from '@material-ui/core';


interface IBoxProps {
    children?: any;
    title: string;
    subtitle: string;
    postsubtitle?: string;
}
export default function Box(props: IBoxProps) {
    return <>
        <Typography variant="h6" style={{ marginBottom: '8px' }}>
            {props.title}
        </Typography>
        <Typography variant="h3" display="inline" style={{ marginBottom: props.children ? '19px' : '0px' }}>{props.subtitle}</Typography>&nbsp;
        <Typography variant="subtitle2" display="inline">{props.postsubtitle}</Typography>
        {props.children}
    </>;
}
