import React, {useEffect, useState} from 'react'
import Navbar from "../components/Navbar";
import Menu from "../components/Menu";
import {compose} from "redux";
import {connect} from "react-redux";
import {getPosts} from "../redux/actions/postActions";
import {withRouter} from "react-router-dom";
import Post from "../components/Posts";
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import makeStyles from "@material-ui/core/styles/makeStyles";
import useTheme from "@material-ui/core/styles/useTheme";


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
}));

const Home = (props) => {

    useEffect(() => {

        props.getPosts()

    }, [])

    const {posts, loading} = props.post

    const {window} = props;
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div>
            <Menu selectedIndex={0}/>
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    let recentPostsMarkup = !loading ? (
        <Post posts={posts}/>
    ) : (
        <div className="loader">
            <div className="lds-ellipsis">
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    );


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
                            {recentPostsMarkup}
                        </main>
                    </div>
                ) : (
                    <div>
                        {props.history.push('/login')}
                    </div>
                )
            ) : (
                <div></div>
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


export default compose(connect(mapStateToProps, {getPosts}),
    withRouter)(Home)