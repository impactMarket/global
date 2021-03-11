import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { mq, transitions } from '../../helpers';
import { ease, fonts } from '../../variables';

const TooltipWrapper = styled.div`
    align-items: flex-start;
    display: inline-flex;
    height: 100%;
    justify-content: center;
    margin-left: 8px;
    position: relative;

    ${mq.tabletLandscape(css`
        justify-content: flex-start;
    `)}
`;

const Tip = styled.div`
    ${transitions('all', 750, ease.outQuart)};

    background-color: #ffffff;
    border-radius: 8px;
    border: 1px solid #E1E4E7;
    box-shadow: 0px 4px 24px rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
    font-family: ${fonts.families.sans};
    font-size: 16px;
    line-height: 26px;
    opacity: 0;
    padding: 22px;
    position: absolute;
    top: 100%;
    transform: translate(0, 32px);
    visibility: hidden;
    width: 192px;
    z-index: 999;

    ${mq.tabletLandscape(css`
        top: unset;
        transform: translate(46px, -10px);
        width: 324px;
    `)}
`;

const TipIcon = styled.div`
    align-items: flex-start;
    display: flex;
    height: 16px;
    justify-content: flex-start;
    width: 16px;

    &:hover {
        & ~ ${Tip} {
            opacity: 1;
            transform: translate(0, 10px);
            visibility: visible;

            ${mq.tabletLandscape(css`
                transform: translate(26px, -10px);
            `)}
        }
    }
`;

export const Tooltip = props => {
    const { children } = props;

    return (
        <TooltipWrapper>
            <TipIcon>
                <svg width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 0a8 8 0 100 16A8 8 0 008 0zm.338 3.165a1.052 1.052 0 110 2.103 1.052 1.052 0 010-2.103zm.943 9.304s-.828.695-1.872.171a1.35 1.35 0 01-.553-.538c-.354-.627-.218-1.3-.218-1.3l.105-.824.27-2.151-.737.016a.623.623 0 01-.242-1.204l1.888-.743a.874.874 0 011.173 1.008l-.025.112-.739 3.242-.184.81c-.027.122-.031.15-.039.214-.02.365.499.091.499.091a.643.643 0 01.674 1.096z" fill="#73839D"/>
                </svg>
            </TipIcon>
            <Tip>
                {children}
            </Tip>
        </TooltipWrapper>
    )
}

Tooltip.propTypes = {
    children: PropTypes.any,
}
