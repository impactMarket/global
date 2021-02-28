import PropTypes from 'prop-types';

export const getNamedPropTypes = objects =>
  objects.reduce((result, object) =>
    ({ ...result, ...Object.keys(object).reduce((acc, key) =>
      ({ ...acc, [key]: PropTypes.bool }) , {})
    }), {});
