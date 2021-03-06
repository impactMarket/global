import { css } from 'styled-components';
import { durations } from '../variables/durations';
import { ease as eases } from '../variables/ease';

const defaultDuration = 500;

const transition = (props, {cssProps, duration, ease}) => {
  const durationVal = durations[duration] || duration || defaultDuration

  return `${cssProps || 'all'} ${typeof durationVal === 'number' ? `${durationVal}ms` : durationVal} ${eases[ease] || ease}`
}

const setTransitions = (props, {cssProps, duration, ease}) =>
  Array.isArray(cssProps)
    ? cssProps.map(cssProp => transition(props, {cssProps: cssProp, duration, ease})).join(', ')
    : transition(props, {cssProps, duration, ease})

export const transitions = (cssProps, duration, ease) => css`
    transition: ${props => setTransitions(props, {cssProps, duration, ease})};
`;
