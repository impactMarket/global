import { colors } from '../../variables'
import { variations } from '../../helpers'
import PropTypes from 'prop-types'
import React from 'react'
import styled, { css } from 'styled-components'
import { Spinner } from '../Spinner/Spinner'

const colorVariations = {
    default: css`
        background-color: ${colors.p06};
        color: ${colors.n01};

		&:not(:disabled) {
			&:hover {
				box-shadow: 0 0 16px rgba(0, 0, 0, 0.16);
			}
		}
    `,

    white: css`
        background-color: ${colors.n01};
        color: ${colors.p06};

		&:not(:disabled) {
			&:hover {
				box-shadow: 0 0 24px rgba(0, 0, 0, 0.24);
			}
		}
    `,
}

const miscVariations = {
    minPadding: css`
        padding: 0 8px;
    `,

    fluid: css`
        width: 100%;
    `,
}

const sizeVariations = {
    default: css`
        font-size: 18px;
        height: 44px;
        padding: 0 26px;
    `,

    small: css`
        font-size: 14px;
        height: 44px;
        padding: 0 16px;
    `,
}

const ButtonWrapper = styled.button`
    align-items: center;
    border-radius: 8px;
    border: 0;
    display: inline-flex;
    font-family: 'Inter';
    font-weight: 700;
    justify-content: center;
    outline: 0;
	overflow: hidden;
	position: relative;
    white-space: nowrap;

	&:not(:disabled) {
		&:hover {
			cursor: pointer;
		}
	}

    ${variations(colorVariations)};
    ${variations(sizeVariations)};
    ${variations(miscVariations)};
`

export const Button = (props) => {
    const { as, children, isLoading, ...forwardProps } = props

    return (
		<ButtonWrapper as={as} disabled={isLoading} {...forwardProps}>
			<Spinner
				backgroundColor={!forwardProps.white ? colors.p06 : colors.n01}
				color={forwardProps.white ? colors.p06 : colors.n01}
				isLoading={isLoading}
				spinnerColor={forwardProps.white ? colors.p06 : colors.n01}
			/>
			{children}
		</ButtonWrapper>
	);
}

Button.propTypes = {
    default: PropTypes.bool,
    fluid: PropTypes.bool,
	isLoading: PropTypes.bool,
    minPadding: PropTypes.bool,
    small: PropTypes.bool,
    white: PropTypes.bool,
}
