import React, {Fragment} from "react";
import {Link} from 'react-router-dom';
import {connect} from 'react-redux'
import navlogo from "../utils/images/logo.jpg";
import {withRouter} from "react-router-dom";
//util

//Mui staff
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import {logoutUser} from "../redux/actions/userActions";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import {KeyboardReturn} from "@material-ui/icons";
import MenuIcon from "@material-ui/icons/Menu";


const useStyles = makeStyles((theme) => ({
    navLogo: {
        display: 'block',
        height: '30px',
        width: '30px',
        borderRadius: '50%',
    },
    root: {
        position: 'fixed',
        backgroundColor: theme.palette.secondary.main,

    },
    logoText: {
        marginLeft: '10px'
    },
    button: {
        padding: 7,
        color: '#262626'
    },
    containerInner: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between'
    },
    containerInnerFirst: {
        display: 'flex',
        alignItems: 'center'
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('lg')]: {
            display: 'none',
        },
    },

}))

const Navbar = (props) => {
    const classes = useStyles()

    const {authenticated} = props.user

    const handleLogout = () => {
        props.logoutUser(props.history);

    };

    return (
        <AppBar className={classes.root}>
            <Toolbar variant={"dense"}>
                {authenticated ? (
                    <Fragment>
                        <div className={classes.containerInner}>
                            <div className={classes.containerInnerFirst}>
                                <IconButton
                                    color="primary"
                                    aria-label="open drawer"
                                    edge="start"
                                    onClick={props.handleDrawerToggle}
                                    className={classes.menuButton}
                                >
                                    <MenuIcon/>
                                </IconButton>

                                <Link to="/">
                                    <img className={classes.navLogo} src={navlogo} alt="logo"/>
                                </Link>
                                <Link to="/">
                                    <Typography className={classes.logoText} color={"primary"} variant="body1"
                                                align="center">
                                        Qr cloud
                                    </Typography>
                                </Link>
                            </div>
                            <div>
                                <Tooltip title="Logout">
                                    <IconButton onClick={handleLogout}>
                                        <KeyboardReturn color="primary"/>
                                    </IconButton>
                                </Tooltip>
                            </div>
                        </div>
                    </Fragment>
                ) : (
                    <Fragment>
                        <Link to="/">
                            <img className={classes.navLogo} src={navlogo} alt="logo"/>
                        </Link>
                    </Fragment>
                )}
            </Toolbar>
        </AppBar>
    )
}


// Navbar.propTypes = {
//     user: PropTypes.object.isRequired
// };

const mapStateToProps = (state) => ({
    user: state.user
})

export default connect(mapStateToProps, {logoutUser})(withRouter(Navbar))




