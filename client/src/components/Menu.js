import React from 'react'
import makeStyles from "@material-ui/core/styles/makeStyles";
import Avatar from "@material-ui/core/Avatar";
import {connect} from 'react-redux'
import ListItemsJs from "./ListItemsJs";
import useTheme from "@material-ui/core/styles/useTheme";
import useMediaQuery from "@material-ui/core/useMediaQuery";


const useStyles = makeStyles((theme) => ({
    menu: {
        width: '250px',
        height: '92vh',
        borderRight: '1px solid rgba(0,0,0,0.2)',
        backgroundColor: '#ffffff',
        // [theme.breakpoints.down("xs")]: {
        //     display: 'none'
        // },
    },
    profile: {
        borderBottom: '1px solid rgba(0,0,0,0.2)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
    },
    body: {
        display: 'flex',
    },
    avatar: {
        marginBottom: '10px'
    },
    bio: {
        fontSize: 16,
        fontWeight: 600
    }

}))

const Menu = (props) => {

    const classes = useStyles()

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down("xs"));

    return (
        <div className={classes.menu}>
            <div className={classes.profile}>
                <div>
                    <Avatar alt="Remy Sharp" className={classes.avatar} src={props.user.avatar}/>
                </div>
                <div className={classes.bio}>
                    {props.user.firstName + ' ' + props.user.lastName}
                </div>

            </div>
            <div>
                <ListItemsJs selectedIndex={props.selectedIndex}/>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    user: state.user
})

export default connect(mapStateToProps)(Menu)