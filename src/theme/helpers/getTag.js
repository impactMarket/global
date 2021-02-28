const tags = ['div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'span', 'p', 'quote'];

export const getTag = (props, { defaultTag = 'div' } = {}) =>
  Object.keys(props).reduce((acc, prop) => (tags.find(tag => tag === prop) ? prop : acc), defaultTag);
