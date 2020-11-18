import { makeStyles, createStyles, createMuiTheme } from "@material-ui/core";
import { colors } from "../contants";

const useStyles = makeStyles((theme) =>
    createStyles({
        bannerText: {
            fontSize: '18px',
            lineHeight: '27px',
            color: '#FFFFFF',
            opacity: 0.79,
            paddingBottom: '27px',
        },
        header: {
            color: colors.almostBlack,
        },
        headerContainer: {
            backgroundColor: 'white',
            [theme.breakpoints.down('sm')]: {
                paddingTop: '160px',
                paddingBottom: '3%',
            },
            [theme.breakpoints.up('md')]: {
                padding: '3% 0px',
            },
        },
        footer: {
            paddingTop: 50,
            paddingBottom: 50,
            marginTop: 57,
            backgroundColor: 'white',
            display: 'flex',
            alignItems: 'center',
        }
    }),
);

const muiTheme = createMuiTheme({
    palette: {
        text: {
            primary: colors.almostBlack,
        },
    },
    overrides: {
        MuiTableCell: {
            head: {
                fontSize: '13px',
                lineHeight: '17px',
                color: colors.softGray,
            },
            body: {
                fontSize: '13px',
                lineHeight: '15px',
                color: colors.almostBlack,
            }
        }
    },
    typography: {
        fontFamily: 'Gelion-Regular',
        h1: {
            fontWeight: 'bold',
            fontSize: '36px',
            lineHeight: '32px'
        },
        h2: {
            fontSize: '28px',
            lineHeight: '28px',
            marginTop: '32px',
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
        h5: {
            fontSize: '16px',
            lineHeight: '16px',
            marginTop: '17px',
            marginBottom: '8px',
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
