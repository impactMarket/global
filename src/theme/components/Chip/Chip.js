import styled, { css } from 'styled-components'
import { colors, fonts } from '../../variables'

export const Chip = styled.div`
	font-size: 12px;
	line-height: 1;
    align-items: center;
    background-color: ${colors.n04};
    border-radius: 22px;
    color: ${colors.p07};
    display: inline-flex;
    font-family: ${fonts.families.sans};
    font-weight: ${fonts.weights.medium};
    height: 44px;
    justify-content: center;
    letter-spacing: 0.3px;
    padding: 0 16px;
    text-transform: uppercase;
	user-select: none;
	white-space: nowrap;

    ${({ isActive }) =>
        isActive &&
        css`
            background-color: ${colors.p07};
            color: ${colors.n01};
        `}

    ${({ as, isActive }) =>
        as === 'a' &&
		!isActive &&
        css`
            &:hover {
                box-shadow: 0 0 16px rgba(0, 0, 0, 0.08);
                cursor: pointer;
            }
        `}
`
