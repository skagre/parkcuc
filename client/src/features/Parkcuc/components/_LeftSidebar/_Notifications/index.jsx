import React, { useEffect } from 'react'

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

import TabHeading from 'components/_TabHeading'

import useStyles from './style'


const Notifications = props => {
    const classes = useStyles()

    return (
        <>
            <TabHeading text={"Notifications"} subtext={"List of notification"}/>
            <List className={`${classes.list} custom-scroll`}>
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
        </>
    )
}

export default Notifications