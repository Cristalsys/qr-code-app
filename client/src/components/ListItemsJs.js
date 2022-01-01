import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AddIcon from '@material-ui/icons/Add';
import {Link} from "react-router-dom";
import List from "@material-ui/core/List";
import PersonIcon from '@material-ui/icons/Person';
import InfoIcon from '@material-ui/icons/Info';


import {connect} from "react-redux";

const ListItemsJs = (props) => {

    return (

        <List component={'nav'}>

            <ListItem button
                      selected={props.selectedIndex === 0}
                      component={Link}
                      to={`/`}

            >
                <ListItemIcon>
                    <DashboardIcon/>
                </ListItemIcon>
                <ListItemText primary="Dashboard"/>
            </ListItem>

            <ListItem button
                      selected={props.selectedIndex === 1}
                      component={Link}
                      to={`/add`}

            >
                <ListItemIcon>
                    <AddIcon/>
                </ListItemIcon>
                <ListItemText primary="Add document"/>
            </ListItem>

            <ListItem button
                      selected={props.selectedIndex === 2}
                      component={Link}
                      to={`/profile`}

            >
                <ListItemIcon>
                    <PersonIcon/>
                </ListItemIcon>
                <ListItemText primary="Profile"/>
            </ListItem>
            {props.role === 1 ? (

                <ListItem button
                          selected={props.selectedIndex === 4}
                          component={Link}
                          to={`/administration`}

                >
                    <ListItemIcon>
                        <InfoIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Administration"/>
                </ListItem>

            ) : (
                <ListItem button
                          selected={props.selectedIndex === 3}
                          component={Link}
                          to={`/about`}

                >
                    <ListItemIcon>
                        <InfoIcon/>
                    </ListItemIcon>
                    <ListItemText primary="About us"/>
                </ListItem>
            )}
        </List>
    )
};


const mapStateToProps = (state) => ({
    role: state.user.role
});

export default connect(mapStateToProps)(ListItemsJs)