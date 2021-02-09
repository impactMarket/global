import { IconButton, Typography, useTheme } from '@material-ui/core';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import React from 'react';
import styled from 'styled-components';

const PaginationWrapper = styled.div`
    align-items: center;
    display: flex;
    justify-content: flex-end;
    margin: -8px;
`;

interface IPagination {
    activePage: number;
    handlePageChange: Function;
    isLastPage: boolean;
    label?: string;
}

export const Pagination = (props: IPagination) => {
    const { activePage, handlePageChange, isLastPage, label } = props;
    const theme = useTheme();

    return (
        <PaginationWrapper>
            {label && (<Typography variant="subtitle2" style={{ marginRight: 8 }}>{label}</Typography>)}
            <IconButton onClick={() => handlePageChange(activePage - 1)} disabled={activePage === 0} aria-label="previous page">
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton onClick={() => handlePageChange(activePage + 1)} disabled={isLastPage} aria-label="next page">
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
        </PaginationWrapper>
    );
};
