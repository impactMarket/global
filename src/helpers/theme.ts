import { makeStyles, createStyles, createMuiTheme } from "@material-ui/core";
import { colors } from "../contants";

const useStyles = makeStyles(() =>
    createStyles({
        header: {
            color: colors.almostBlack,
        },
        headerContainer: {
            backgroundColor: 'white',
            padding: '3% 0px',
        },
        subtitle1: {
            opacity: '0.54',
        },
        subtitle2: {
            color: colors.softGray,
        },
    }),
);

const muiTheme = createMuiTheme({
    palette: {
        text: {
            primary: colors.almostBlack,
        },
    },
    typography: {
        fontFamily: 'Gelion',
        h1: {
            fontWeight: 500,
            fontSize: '34px',
            lineHeight: '42px'
        },
        h2: {
            fontWeight: 400,
            fontSize: '28px',
            lineHeight: '52px'
        },
        subtitle1: {
            fontWeight: 400,
            fontSize: '18px',
            lineHeight: '22px'
        },
    },
    shape: {
        borderRadius: 8
    },
});

export { useStyles, muiTheme }
