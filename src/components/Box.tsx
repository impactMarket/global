import React from 'react';
import { Typography } from '@material-ui/core';


interface IBoxProps {
    hasChart?: boolean;
    children?: any;
    title: string;
    subtitle: string;
    postsubtitle?: string;
}
export default function Box(props: IBoxProps) {
    let styles = {};
    if (props.hasChart) {
        styles = {
            height: '200px',
        };
    }
    return <div style={styles}>
        <Typography variant="h6" style={{ marginBottom: '8px' }}>
            {props.title}
        </Typography>
        <Typography
            variant="h3"
            display="inline"
            style={{
                marginBottom: props.children ? '19px' : '0px',
                fontFamily: 'Gelion-SemiBold'
            }}
        >{props.subtitle}</Typography>&nbsp;
        <Typography variant="subtitle2" display="inline">{props.postsubtitle}</Typography>
        {props.children}
    </div>;
}
