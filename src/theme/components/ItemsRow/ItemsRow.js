import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const ItemsCol = styled.div`
    display: flex;
    padding: 0 ${({ spacing }) => spacing / 2 }px;
    width: ${({ distribute }) => distribute ? '100%' : null};
`;

const ItemsRowWrapper = styled.div`
    display: flex;
    justify-content: ${({ distribute }) => distribute ? 'space-between' : 'flex-start'};
    margin: 0 -${({ spacing }) => spacing / 2}px;
`;

export const ItemsRow = props => {
  const { children, distribute, spacing, ...forwardProps } = props;

  return (
    <ItemsRowWrapper distribute={distribute} {...forwardProps} spacing={spacing}>
        {React.Children.map(children, (child, index) => (
            <ItemsCol distribute={distribute} key={index} spacing={spacing}>
                {React.cloneElement(child, {...child.props, fluid: true})}
            </ItemsCol>
        ))}
    </ItemsRowWrapper>
  )
}

ItemsRow.propTypes = {
  children: PropTypes.any.isRequired,
  distribute: PropTypes.bool,
  spacing: PropTypes.number
}

ItemsRow.defaultProps = {
  spacing: 16
}