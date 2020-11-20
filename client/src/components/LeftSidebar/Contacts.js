import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Divider from '@material-ui/core/Divider'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'

import { orange, pink, green, blue } from "@material-ui/core/colors"


const useStyles = makeStyles((theme) => ({
    list: {
    },
    listItem: {
        borderBottom: '1px solid #00000015',
        '&:hover': {
            cursor: 'pointer',
            backgroundColor: '#eff7fe70'
        }
    },
    text: {
        color: '#0000008A'
    }
}));


const Contacts = props => {

    const classes = useStyles();

    return (
        <List className={classes.list}>
            <ListItem className={classes.listItem} alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar alt="Remy Sharp" />
                </ListItemAvatar>
                <ListItemText
                    primary="Brunch this weekend?"
                    secondary={
                    <>
                    <Typography
                        className={classes.text}
                        variant="body2"
                        noWrap
                    >
                        I'll be in your neighborhood doing errasdasd asdasdasdasdasdas
                    </Typography >
                    </>
                }
                />
            </ListItem>
        </List>
    )
}

export default Contacts