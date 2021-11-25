import React from "react";
import Navbar from "../components/Navbar";
import Menu from "../components/Menu";
import {compose} from "redux";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import Hidden from "@material-ui/core/Hidden";
import Drawer from "@material-ui/core/Drawer";
import useTheme from "@material-ui/core/styles/useTheme";
import makeStyles from "@material-ui/core/styles/makeStyles";


const drawerWidth = 250;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    drawer: {
        [theme.breakpoints.up('lg')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
        [theme.breakpoints.down('md')]: {
            display: 'none',
        },
    },
    appBar: {
        [theme.breakpoints.up('lg')]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        },
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('lg')]: {
            display: 'none',
        },
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
        marginTop: 48,
        zIndex: 0
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    drawerMargin: {
        marginTop: 100
    },
    contentMargin: {
        marginBottom: 10
    }
}));

const About = (props) => {

    const {window} = props;
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div>
            <Menu selectedIndex={3}/>
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <div className={'container1'}>
            <Navbar handleDrawerToggle={handleDrawerToggle}/>
            {!props.loadingUser ? (props.authenticated ? (
                    <div className={classes.root}>
                        <nav className={classes.drawer} aria-label="mailbox folders">
                            <Hidden smUp implementation="css">
                                <Drawer
                                    container={container}
                                    variant="temporary"
                                    anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                                    open={mobileOpen}
                                    onClose={handleDrawerToggle}
                                    classes={{
                                        paper: classes.drawerPaper,
                                    }}
                                    ModalProps={{
                                        keepMounted: true, // Better open performance on mobile.
                                    }}
                                >
                                    {drawer}
                                </Drawer>
                            </Hidden>
                            <Hidden xsDown implementation="css">
                                <Drawer
                                    classes={{
                                        paper: classes.drawerPaper,
                                    }}
                                    variant="permanent"
                                    open
                                >
                                    {drawer}
                                </Drawer>
                            </Hidden>
                        </nav>
                        <main className={classes.content}>
                            <h1 style={{textAlign: 'center',
                            marginBottom: '20px'
                            }}>About program</h1>
                            <p className={classes.contentMargin}>
                                In today's world, there are millions of documents
                                that are created daily in organizations in almost all industries.
                                The role of people in any such company is extremely important,
                                and it must deal with reducing falsification and improving the
                                automation of documents, as well as in their creation. Educational
                                certificates are just one example of such documents. Other examples
                                include identity cards, receipts, invoices, letters of commitment,
                                letters of reference, employment letters, payment receipts, contracts,
                                trade documents, and so on. Some of these documents serve the purpose of
                                proving the accuracy of the data when applying for a new job, loan, visa,
                                opening a bank or brokerage account or other similar requirements.
                            </p>
                            <p className={classes.contentMargin}>
                                Because they are used as proof of input to process important transactions,
                                there is an incentive to manipulate information as required to improve
                                credentials. There have been a number of cases where false or falsified
                                experience letters and payment reports have been received to improve
                                prospects and get better results. It takes time and effort to verify
                                the authenticity of such documents, and this may not always be possible.
                                As a result, there is a risk that the company may make the wrong decision
                                based on these documents, which could have serious long-term consequences.
                                It should be possible to easily verify the information, thus ensuring the
                                credibility of the submitted documents.
                            </p>
                            <p className={classes.contentMargin}>
                                One way to solve this problem is to make sure that all such documents are generated
                                centrally, and information about them is recorded in the form of a secure QR-code before
                                printing it physically or electronically. In addition, the QR code will also be
                                digitally
                                signed by the issuing organization so that unauthorized changes can be detected and
                                stopped.
                                This can then be verified by the various stakeholders to whom it is presented
                                (other employers, banks, embassies, visa providers, etc.), and the verified content
                                can be used for the purposes required with full confidence.
                            </p>
                            <p className={classes.contentMargin}>
                                This system provides the ability to exchange information through documents with
                                complete
                                trust, security and confidentiality in the most user-friendly way with high efficiency
                                to save on costs and time. This work offers solutions for a wide range of industries and
                                applications.
                            </p>
                        </main>
                    </div>
                ) : (
                    <div>
                        {props.history.push('/login')}
                    </div>
                )
            ) : (
                <div>
                </div>
            )
            }
        </div>
    )
}

const mapStateToProps = (state) => ({
    post: state.post,
    loadingUser: state.user.loading,
    authenticated: state.user.authenticated
})


export default compose(connect(mapStateToProps),
    withRouter)(About)
