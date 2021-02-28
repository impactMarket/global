import styled from 'styled-components';
import { colors, fonts } from '../../variables';

export const Input = styled.input`
    background-color: ${colors.n01};
    border-radius: 8px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
    font-family: ${fonts.families.sans};
    font-size: 16px;
    height: 42px;
    outline: 0;
    padding: 0 8px;
    width: 100%;

    &:focus {
        border: 1px solid rgba(0, 0, 0, 0.3);
    }

    ::placeholder,
    ::-webkit-input-placeholder {
        color: ${colors.n06};
    }
`;
