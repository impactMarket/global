import { makeStyles, createStyles, createMuiTheme } from "@material-ui/core";
import { colors } from "../contants";

const useStyles = makeStyles(() =>
    createStyles({
        bannerText: {
            fontSize: '18px',
            lineHeight: '27px',
            color: '#FFFFFF',
            opacity: 0.79,
            paddingTop: '33px',
            paddingBottom: '33px',
        },
        header: {
            color: colors.almostBlack,
        },
        headerContainer: {
            backgroundColor: 'white',
            padding: '3% 0px',
        },
        // subtitle1: {
        //     opacity: '0.54',
        // },
        tableRowHead: {
            fontSize: '13px',
            lineHeight: '17px',
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
        // h1: {
        //     fontWeight: 500,
        //     fontSize: '34px',
        //     lineHeight: '42px'
        // },
        h2: {
            fontSize: '28px',
            lineHeight: '28px',
            marginTop: '8px',
            marginBottom: '8px',
        },
        h3: {
            fontSize: '26px',
            lineHeight: '26px'
        },
        h4: {
            fontWeight: 400,
            fontSize: '18px',
            lineHeight: '17px'
        },
        h6: {
            fontSize: '14px',
            lineHeight: '14px',
            color: colors.softGray,
        },
        subtitle1: {
            fontWeight: 400,
            fontSize: '18px',
            lineHeight: '22px',
            opacity: 0.54,
            // marginTop: '8px',
            // marginBottom: '8px',
        },
        subtitle2: {
            fontSize: '14px',
            lineHeight: '17px'
        },
    },
    shape: {
        borderRadius: 8
    },
});

export { useStyles, muiTheme }
