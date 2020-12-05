import React from 'react'

import {
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    ListItemSecondaryAction,
    Avatar,
    IconButton,
    Tooltip
} from '@material-ui/core'

import DeleteForeverTwoToneIcon from '@material-ui/icons/DeleteForeverTwoTone'
import ToysTwoToneIcon from '@material-ui/icons/ToysTwoTone'

import TabHeading from 'components/_TabHeading'
import TabHeadingSeach from 'components/_TabHeadingSearch'

import useStyles from './style'


const FriendLists = props => {
    const classes = useStyles();
    return (
        <>
            <TabHeading text={"My Friends"} subtext={"136 friends"}/>
            <TabHeadingSeach />
            <List className={`${classes.list} custom-scroll`}>
                <ListItem className={classes.listItem}>
                    <ListItemAvatar>
                        <Avatar>B</Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary="Xuân Bắc"
                        secondary="Active 30m ago"
                    />
                    <ListItemSecondaryAction>
                        <IconButton>
                            <Tooltip title="Wave" placement="bottom" arrow>
                                <ToysTwoToneIcon />
                            </Tooltip>
                        </IconButton>
                        <IconButton edge="end">
                            <Tooltip title="Delete" placement="bottom" arrow>
                                <DeleteForeverTwoToneIcon />
                            </Tooltip>
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
            </List>
        </>
    )
}

export default FriendLists