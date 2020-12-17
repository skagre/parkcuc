import React from 'react'

import {
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    ListItemSecondaryAction,
    Avatar,
    Button
} from '@material-ui/core'

import TabHeading from 'components/_TabHeading'

import useStyles from './style'


const SentRequests = props => {
    const classes = useStyles();
    return (
        <>
            <TabHeading text={"Sent Requests"} subtext={"136 sent requests"}/>
            <List className={`${classes.list} custom-scroll`}>
                <ListItem className={classes.listItem}>
                    <ListItemAvatar>
                        <Avatar>D</Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary="Xuân Bắc"
                        secondary="Sent 3d ago"
                    />
                    <ListItemSecondaryAction>
                        <Button color="secondary">Cancel</Button>
                    </ListItemSecondaryAction>
                </ListItem>
            </List>
        </>
    )
}

export default SentRequests