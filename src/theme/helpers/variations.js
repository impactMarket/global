import { css } from 'styled-components';

const getVariations = (props, variations) => {
  const variationKeys = Object.keys(variations);

  const variationName = variationKeys.reduce((results, variation) => {
    const propKeys = Object.keys(props);

    return propKeys.find(prop => props[variation] && prop === variation) || results;
  }, '')

  return variations[variationName] || variations?.default || null;
}

export const variations = variations => css`
  ${props => getVariations(props, variations)};
`