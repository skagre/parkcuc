import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Divider from '@material-ui/core/Divider'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import MoreVertIcon from '@material-ui/icons/MoreVert';

import { green } from '@material-ui/core/colors'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'


const useStyles = makeStyles((theme) => ({
    listItem: {
        borderBottom: '1px solid #00000015',
        '&:hover': {
            cursor: 'pointer',
            backgroundColor: green[50]
        }
    },
    text: {
        maxWidth: '65%',
        '&:last-child': {
            color: '#0000008A'
        }
    }
}));


const Contacts = props => {

    const classes = useStyles();

    return (
        <List>
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
    )
}

export default Contacts