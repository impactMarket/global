import { ButtonAppstore } from './ButtonAppstore'
import { ButtonPlaystore } from './ButtonPlaystore'
import { stores } from '../../../contants'
import React from 'react'
import styled from 'styled-components'
import { colors } from '../../variables'
import { ItemsRow } from '../ItemsRow/ItemsRow'

const Label = styled.label`
    align-items: center;
    color: ${colors.n02};
    display: flex;
    font-family: 'Gelion', sans-serif;
    font-size: 10px;
    font-weight: 700;
    justify-content: center;
    letter-spacing: 2px;
    margin-bottom: 16px;
    position: relative;
    text-transform: uppercase;
    z-index: 0;

    span {
        background-color: ${colors.p06};
        padding: 0 12px;
        position: relative;
    }

    &::before {
        background-color: rgba(255, 255, 255, 0.58);
        content: '';
        height: 1px;
        left: 0;
        position: absolute;
        width: 100%;
    }
`

const Wrapper = styled.div``

export const AppDownloadButtons = (props) => {
    return (
        <Wrapper {...props}>
            <Label><span>Open Beta</span></Label>
            <ItemsRow spacing={12} distribute>
                <ButtonPlaystore href={stores.playstore} />
                <ButtonAppstore href={stores.appstore} />
            </ItemsRow>
        </Wrapper>
    )
}
