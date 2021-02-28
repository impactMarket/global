import { colors, fonts } from '../../variables'
import { getTag, variations } from '../../helpers'
import styled, { css } from 'styled-components'

const colorArr = Object.keys(colors);
const fontSizeArr = Object.keys(fonts.sizes);
const fontWeightArr = Object.keys(fonts.weights);

const colorVariations = colorArr.reduce(
    (results, colorCode) => {
        return {
            ...results,
            [colorCode]: css`
                color: ${colors[colorCode]};
            `,
        }
    },
    {
        default: css`
            color: ${colors.n09};
        `,
    }
)

const sizeVariations = fontSizeArr.reduce(
    (results, type) => {
        const [fontSize, lineHeight, letterSpacing] = fonts?.sizes[type] || []

        return {
            ...results,
            [type]: css`
                font-size: ${fontSize ? `${fontSize}px` : null};
                line-height: ${lineHeight ? `${lineHeight}px` : null};
                letter-spacing: ${letterSpacing ? `${letterSpacing}px` : null};
            `,
        }
    },
    {
        default: css`
            font-size: ${fonts.sizes.body[0]}px;
            line-height: ${fonts.sizes.body[1]}px;
        `,
    }
)

const weightVariations = fontWeightArr.reduce(
    (results, type) => {
        return {
            ...results,
            [type]: css`
                font-weight: ${fonts.weights[type]};
            `,
        }
    },
    {
        default: css`
            font-weight: ${fonts.weights.regular};
        `,
    }
)

export const Text = styled.p.attrs(props => ({
  as: getTag(props, { defaultTag: 'p' })
}))`
    font-family: ${fonts.families.sans};
    margin: unset;
    padding: unset;

    ${variations(colorVariations)};
    ${variations(sizeVariations)};
    ${variations(weightVariations)};
`;
