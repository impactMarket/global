import styled, { css } from 'styled-components'
import { mq } from '../../theme/helpers'
import { colors } from '../../theme/variables'

export const ModalCol = styled.div`
    width: 100%;

    &:last-of-type {
        margin-top: 32px;
    }

    ${mq.tablet(css`
        &:first-of-type {
            width: 100%;
            padding-right: 24px;
        }

        &:last-of-type {
            margin-top: 0;
        }

        width: auto;
    `)}
`

export const ModalCopyLink = styled.div`
    display: inline-block;
    cursor: pointer;
`;

export const ModalFooter = styled.div`
    padding: 32px;
    background-color: ${colors.n03};
`

export const ModalRow = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow: hidden;

    ${mq.tablet(css`
        flex-direction: row;
    `)}
`

export const ModalWrapper = styled.div`
    padding: 16px 32px 32px;
`
