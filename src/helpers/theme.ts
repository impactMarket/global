import { makeStyles, createStyles, createMuiTheme } from "@material-ui/core";
import createBreakpoints from "@material-ui/core/styles/createBreakpoints";
import { colors } from "../contants";

const useStyles = makeStyles((theme) =>
    createStyles({
        bannerText: {
            fontSize: '22px',
            lineHeight: '29px',
            color: '#FFFFFF',
            opacity: 0.79,
            paddingBottom: '27px',
        },
        header: {
            color: colors.almostBlack,
        },
        headerSection: {
            color: colors.almostBlack,
            fontFamily: 'Gelion-SemiBold',
        },
        headerContainer: {
            backgroundColor: 'white',
            [theme.breakpoints.down('sm')]: {
                paddingTop: '160px',
                paddingBottom: '34px',
            },
            [theme.breakpoints.up('md')]: {
                padding: '21px 0px',
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

const breakpoints = createBreakpoints({})
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
        },
        MuiContainer: {
            maxWidthLg: {
                [breakpoints.up('sm')]: {
                    paddingLeft: '60px',
                    paddingRight: '60px',
                },
                [breakpoints.down('sm')]: {
                    paddingLeft: '24px',
                    paddingRight: '24px',
                },
                [breakpoints.down('xs')]: {
                    paddingLeft: '16px',
                    paddingRight: '16px',
                },
            },
        }
    },
    typography: {
        fontFamily: 'Gelion-Regular',
        h1: {
            fontWeight: 'bold',
            fontSize: '36px',
            lineHeight: '32px',
            color: colors.almostBlack,
        },
        h2: {
            fontSize: '28px',
            lineHeight: '28px',
            marginTop: '32px',
            marginBottom: '8px',
            color: colors.almostBlack,
        },
        h3: {
            fontSize: '26px',
            lineHeight: '26px',
            color: colors.almostBlack,
        },
        h4: {
            fontWeight: 400,
            fontSize: '18px',
            lineHeight: '17px',
            color: colors.almostBlack,
        },
        h5: {
            fontSize: '16px',
            lineHeight: '16px',
            marginTop: '17px',
            marginBottom: '8px',
            color: colors.almostBlack,
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
            color: colors.almostBlack,
        },
        subtitle2: {
            fontSize: '14px',
            lineHeight: '17px',
            color: colors.almostBlack,
        },
    },
    shape: {
        borderRadius: 8
    },
});

export { useStyles, muiTheme }
