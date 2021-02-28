import { colors, ease } from '../../theme/variables'
import { mq, transitions } from '../../theme/helpers'
import { position, size } from 'polished'
import styled, { css } from 'styled-components'

const ModalBackdrop = styled.div`
    ${position('fixed', 0)};
    ${size('100%')};
    ${transitions(['opacity', 'visibility'], 250, ease.inOutSine)};

    background-color: ${colors.n01};
    opacity: 0;
    pointer-events: none;
    visibility: hidden;
    z-index: 0;

    ${({ isActive }) =>
        isActive &&
        css`
            opacity: 1;
            visibility: visible;
        `}

    ${mq.tablet(
        css`
            background-color: rgba(23, 32, 50, 0.2);
        `
    )}
`

const ModalCloseButton = styled.a`
    ${size(40)};

    align-items: center;
    background-color: ${colors.n04};
    border-radius: 50%;
    color: ${colors.n09};
    display: inline-flex;
    justify-content: center;

    svg {
        ${size('65%')};

        fill: currentColor;
    }

    &:hover {
        background-color: ${colors.n09};
        cursor: pointer;
        color: ${colors.n01};
    }
`

const ModalContent = styled.div`
    ${size('100%')}
    ${transitions(
        ['height', 'opacity', 'transform', 'visibility'],
        500,
        ease.inOutCubic
    )};

    background-color: transparent;
    margin: auto 0;
    opacity: 0;
    overflow-y: auto;
    position: relative;
    transform: translate3d(0, 48px, 0);
    visibility: hidden;
    z-index: 1;

    ${({ isActive }) =>
        isActive &&
        css`
            opacity: 1;
            transform: none;
            visibility: visible;
        `}

    ${mq.tablet(
        css`
            ${size('unset')};

            background-color: ${({ noBackground }) =>
                noBackground ? 'transparent' : colors.n01};
            border-radius: 12px;
            overflow: hidden;
            width: 630px;
        `
    )}
`

const ModalHeading = styled.div`
    align-items: center;
    display: flex;
    justify-content: space-between;
    padding: 32px 32px 0;
`

const ModalInnerContent = styled.div``

const ModalWrapper = styled.div`
    ${position('fixed', 0)};
    ${size('100%')};

    align-items: flex-start;
    justify-content: center;
    overflow-x: hidden;
    overflow-y: auto;
    z-index: 1000;

    -webkit-overflow-scrolling: touch;

    ${mq.tablet(css`
        display: flex;
        overflow-y: auto;
    `)}
`

export {
    ModalBackdrop,
    ModalCloseButton,
    ModalContent,
    ModalHeading,
    ModalInnerContent,
    ModalWrapper,
}
