import { css } from 'styled-components'
import { breakpoints } from '../variables/bps';

const getBp = (bp, options) => {
  if (typeof bp === 'number') {
    return `${bp - (options && options.isMax ? 1 / 16 : 0)}em`
  }

  if (!breakpoints[bp]) {
    return '100%'
  }

  return `${breakpoints[bp] - (options && options.isMax ? 1 / 16 : 0)}em`;
}

export const mq = {
  upTo: (bp, style) => css`
    @media only screen and (max-width: ${getBp(bp, {isMax: true})}) {
      ${style};
    }
  `,

  from: (bp, style) => css`
    @media only screen and (min-width: ${getBp(bp)}) {
      ${style};
    }
  `,

  between: (bp1, bp2, style) => css`
    @media only screen and (min-width: ${getBp(bp1)}) and (max-width: ${getBp(bp2, {isMax: true})}) {
      ${style};
    }
  `,

  phone: style => css`
    @media only screen and (max-width: ${getBp('tablet', {isMax: true})}) {
      ${style};
    }
  `,

  tablet: style => css`
    @media only screen and (min-width: ${getBp('tablet')}) {
      ${style};
    }
  `,

  tabletLandscape: style => css`
    @media only screen and (min-width: ${getBp('tabletLandscape')}) {
      ${style};
    }
  `,

  tabletLandscapeMax: style => css`
    @media only screen and (max-width: ${getBp('tabletLandscape', {isMax: true})}) {
      ${style};
    }
  `,

  desktop: style => css`
    @media only screen and (min-width: ${getBp('desktop')}) {
      ${style};
    }
  `
}