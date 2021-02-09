import React from 'react';
import { Typography } from '@material-ui/core';
import styled from 'styled-components';

const BoxContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
`;

const Content = styled.div`
    margin-top: auto;
`;

const TitleWrapper = styled.div`
    margin-bottom: 16px;

    @media (min-width: 769px) {
        display: flex;
        justify-content: space-between;
        margin-bottom: 0;
    }
`;

interface IBoxProps {
    children?: any;
    flex?: boolean;
    hasChart?: boolean;
    legend?: any;
    postsubtitle?: string;
    subtitle?: string;
    title: string;
}
export default function Box(props: IBoxProps) {
    const { children, legend, postsubtitle, subtitle, title } = props;

    return (
        <BoxContainer>
            {(title || legend) && (
                <TitleWrapper>
                    {title && (
                        <Typography variant="h6" style={{ marginBottom: '8px' }}>
                            {title}
                        </Typography>
                    )}
                    {legend && <Typography variant="caption">{legend}</Typography>}
                </TitleWrapper>
            )}
            {(subtitle || postsubtitle) && (
                <div>
                    {subtitle && (
                        <Typography
                            variant="h3"
                            display="inline"
                            style={{
                                marginBottom: children ? '19px' : '0px',
                                fontFamily: 'Gelion-SemiBold'
                            }}
                        >
                            {subtitle}
                        </Typography>
                    )}
                    {postsubtitle && <Typography variant="subtitle2" style={{ display: 'inline', marginLeft: subtitle ? 4 : 0 }}>{postsubtitle}</Typography>}
                </div>
            )}
            <Content>
                {children}
            </Content>
        </BoxContainer>
    );
}