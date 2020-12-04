import React from 'react'

import {
    Avatar, 
    Box,
    Button, 
    List, 
    ListItem, 
    ListItemAvatar, 
    ListItemText, 
    Typography
} from '@material-ui/core'

import useStyles from './style'


const Notifications = props => {
    const classes = useStyles()
    return (
        <List>
            <ListItem className={classes.listItem}>
                <ListItemAvatar>
                    <Avatar>B</Avatar>
                </ListItemAvatar>
                <ListItemText
                    primary="Xuân Bắc"
                    secondary="sent you a friend request."
                />
                <Typography variant="body2">1d ago</Typography>
                <Box className={classes.box}>
                    <Button variant="outlined">Accept</Button>
                    <Button variant="outlined">Cancel</Button>
                </Box>
            </ListItem>
            <ListItem className={classes.listItem}>
                <ListItemAvatar>
                    <Avatar>B</Avatar>
                </ListItemAvatar>
                <ListItemText
                    primary="Xuân Bắc"
                    secondary="accepted your friend request."
                />
                <Typography variant="body2">1d ago</Typography>
            </ListItem>
        </List>
    )
}

export default Notifications