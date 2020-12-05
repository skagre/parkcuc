import React from 'react'

import {
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    ListItemSecondaryAction,
    Avatar,
    Typography,
    Tooltip,
    IconButton
} from '@material-ui/core'

import MoreVertIcon from '@material-ui/icons/MoreVert'

import TabHeading from 'components/_TabHeading'
import TabHeadingSeach from 'components/_TabHeadingSearch'

import useStyles from './style'


const RecentChat = props => {
    const classes = useStyles()
    return (
        <>
            <TabHeading text={"Recent Chat"} subtext={"Start New Conversation"}/>
            <TabHeadingSeach />
            <List className={`${classes.list} custom-scroll`}>
                <ListItem className={classes.listItem} alignItems="flex-start">
                    <ListItemAvatar>
                        <Avatar alt="Remy Sharp" />
                    </ListItemAvatar>
                    <ListItemText
                        primary={
                            <Typography
                                className={classes.text}
                                noWrap
                            >
                                Xuân Bắc asda sdas ds 
                            </Typography>
                        }
                        secondary={
                            <Typography
                                className={classes.text}
                                variant="body2"
                                noWrap
                            >
                                I'll be in your neighborhood doing errasdasd asdasdasdasdasdas
                            </Typography >
                    }
                    />
                    <ListItemSecondaryAction>
                        <IconButton edge="end" className={classes.icon}>
                            <Tooltip title="Action" placement="bottom" arrow>
                                <MoreVertIcon />
                            </Tooltip>
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
            </List>
        </>
    )
}

export default RecentChat