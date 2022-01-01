import React, {useEffect} from "react";
import Navbar from "../components/Navbar";
import Menu from "../components/Menu";
import {compose} from "redux";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import Hidden from "@material-ui/core/Hidden";
import Drawer from "@material-ui/core/Drawer";
import useTheme from "@material-ui/core/styles/useTheme";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {getAllUsers} from "../redux/actions/userActions";
import {Accordion, AccordionDetails, AccordionSummary, Paper} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import UserDetails from "../components/UserDetails";
import Avatar from "@material-ui/core/Avatar";
import DeleteUser from "../components/DeleteUser";

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
    },
    paper: {
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
        marginBottom: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    info: {
        display: 'flex',
        alignItems: 'center',
    },
    info__credentials: {
        marginLeft: 30
    },
    info__email: {
        marginLeft: 30
    },
    info__organization: {
        marginLeft: 30
    },
    delete: {
        marginLeft: 30
    }
}));


const Administration = (props) => {

    const {window} = props;
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    useEffect(() => {
        props.getAllUsers()
    }, [])

    const drawer = (
        <div>
            <Menu selectedIndex={4}/>
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
                            {props.users && props.users.length > 0 && props.users.filter(user => user._id !== props.userId).map(user => (
                                <div key={user._id}>
                                    <Paper elevation={3} className={classes.paper}>
                                        <div className={classes.info}>
                                            <Avatar alt="Remy Sharp" src={user.avatar}/>
                                            <div className={classes.info__credentials}>
                                                {user.firstName + " " + user.lastName}
                                            </div>
                                            <div className={classes.info__email}>
                                                {user.email}
                                            </div>
                                            <div className={classes.info__organization}>
                                                {user.organization}
                                            </div>
                                        </div>
                                        <div className={classes.delete}>
                                            <DeleteUser userId={user._id}/>
                                        </div>
                                    </Paper>

                                </div>
                            ))}

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
    authenticated: state.user.authenticated,
    users: state.user.users,
    userId: state.user._id
})


export default compose(connect(mapStateToProps, {getAllUsers}),
    withRouter)(Administration)
