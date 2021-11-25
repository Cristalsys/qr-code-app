import React, {useState} from "react";
import Navbar from "../components/Navbar";
import Menu from "../components/Menu";
import Grid from "@material-ui/core/Grid";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import {uploadImage} from "../redux/actions/userActions";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";

//MUI
import EditIcon from "@material-ui/icons/Edit";
import UserDetails from "../components/UserDetails";
import Hidden from "@material-ui/core/Hidden";
import Drawer from "@material-ui/core/Drawer";
import useTheme from "@material-ui/core/styles/useTheme";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const drawerWidth = 250;
const useStyles = makeStyles((theme) => ({
    image: {
        backgroundImage: 'url(https://wallpaperaccess.com/full/1193602.jpg)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'auto',
        backgroundPosition: 'center',
        height: '200px',

    },
    main2: {
        padding: '20px 80px'
    },
    main2Responsive: {
        padding: 10
    },
    paper_image: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '-120px'
    },
    profile: {
        '& .image-wrapper': {
            textAlign: 'center',
            position: 'relative',
            '& button': {
                position: 'absolute',
                top: '80%',
                left: '80%'
            }
        },
        '& .profile-image': {
            width: 200,
            height: 200,
            objectFit: 'cover',
            maxWidth: '100%',
            borderRadius: '50%',
            border: '5px solid #ffffff'
        },
        '& .profile-details': {
            textAlign: 'center',
            '& span, svg': {
                verticalAlign: 'middle'
            },
            '& a': {
                color: theme.palette.primary.main
            }
        },
        '& hr': {
            border: 'none',
            margin: '0 0 10px 0'
        },
        '& svg.button': {
            '&:hover': {
                cursor: 'pointer'
            }
        }
    },
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
        // padding: theme.spacing(3),
    },
    drawerMargin: {
        marginTop: 100
    },
    main1: {
        width: 100,
        marginLeft: 230,
        marginTop: 46
    }
}))

const Profile = (props) => {

    const theme = useTheme();
    const matchesXS = useMediaQuery(theme.breakpoints.down("xs"));

    const classes = useStyles()

    const [fileInputState, setFileInputState] = useState('');

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setFileInputState(e.target.value);

        if (!file) return;
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            const newImage = {
                avatar: reader.result
            };
            props.uploadImage(newImage)
            setFileInputState('');

        };
    }
    const handleEditPicture = () => {
        const fileInput = document.getElementById('imageInput');
        fileInput.click();
    }


    const {window} = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div>
            <Menu selectedIndex={2}/>
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <div className={'container1'}>
            <Navbar handleDrawerToggle={handleDrawerToggle}/>
            {!props.loadingUser ? (props.authenticated ? (
                    <div className={'container-menu'}>
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
                            <div>
                                <div className={classes.image}/>
                                <div className={!matchesXS ? classes.main2 : classes.main2Responsive}>
                                    <Grid container spacing={5}>
                                        <Grid item md={4} sm={12} xs={12}>
                                            <div className={classes.paper_image}>
                                                <div className={classes.profile}>
                                                    <div className="image-wrapper">
                                                        {props.avatar &&
                                                        <>
                                                            <Avatar src={
                                                                props.avatar
                                                            } alt="profile"
                                                                    className="profile-image"/>
                                                            <div>
                                                                <input
                                                                    type="file"
                                                                    id="imageInput"
                                                                    hidden="hidden"
                                                                    onChange={handleImageChange}
                                                                    value={fileInputState}
                                                                />
                                                                <Tooltip title="Edit profile picture" placement="top">
                                                                    <IconButton onClick={handleEditPicture}
                                                                                className="button">
                                                                        <EditIcon color="secondary"/>
                                                                    </IconButton>
                                                                </Tooltip>
                                                            </div>
                                                        </>
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </Grid>
                                        <Grid item md={8} sm={12} xs={12}>
                                            <UserDetails/>
                                        </Grid>
                                    </Grid>
                                </div>
                            </div>
                        </main>
                        {/*<div className={'main1'}>*/}
                        {/*    <div className={classes.image}/>*/}
                        {/*    <div className={classes.main2}>*/}
                        {/*        <Grid container spacing={5}>*/}
                        {/*            <Grid item md={4} sm={12} xs={12}>*/}
                        {/*                <div className={classes.paper_image}>*/}
                        {/*                    <div className={classes.profile}>*/}
                        {/*                        <div className="image-wrapper">*/}
                        {/*                            {props.avatar &&*/}
                        {/*                            <>*/}
                        {/*                                <Avatar src={*/}
                        {/*                                    props.avatar*/}
                        {/*                                } alt="profile"*/}
                        {/*                                        className="profile-image"/>*/}
                        {/*                                <div>*/}
                        {/*                                    <input*/}
                        {/*                                        type="file"*/}
                        {/*                                        id="imageInput"*/}
                        {/*                                        hidden="hidden"*/}
                        {/*                                        onChange={handleImageChange}*/}
                        {/*                                        value={fileInputState}*/}
                        {/*                                    />*/}
                        {/*                                    <Tooltip title="Edit profile picture" placement="top">*/}
                        {/*                                        <IconButton onClick={handleEditPicture}*/}
                        {/*                                                    className="button">*/}
                        {/*                                            <EditIcon color="secondary"/>*/}
                        {/*                                        </IconButton>*/}
                        {/*                                    </Tooltip>*/}
                        {/*                                </div>*/}
                        {/*                            </>*/}
                        {/*                            }*/}
                        {/*                        </div>*/}
                        {/*                    </div>*/}
                        {/*                </div>*/}
                        {/*            </Grid>*/}
                        {/*            <Grid item md={8} sm={12} xs={12}>*/}
                        {/*                <UserDetails/>*/}
                        {/*            </Grid>*/}
                        {/*        </Grid>*/}
                        {/*    </div>*/}
                        {/*</div>*/}
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
    loadingUser: state.user.loading,
    authenticated: state.user.authenticated,
    avatar: state.user.avatar
})


export default connect(mapStateToProps, {uploadImage})(withRouter(Profile))
