import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Tooltip from '@material-ui/core/Tooltip'

import FolderIcon from '@material-ui/icons/Folder'
import DeleteForeverTwoToneIcon from '@material-ui/icons/DeleteForeverTwoTone'
import ToysTwoToneIcon from '@material-ui/icons/ToysTwoTone'
import { green } from '@material-ui/core/colors'

const useStyles = makeStyles((theme) => ({
    listItem: {
        borderBottom: '1px solid #00000015',
        '&:hover': {
            cursor: 'pointer',
            backgroundColor: green[50]
        }
    }
}));


const Friends = props => {
  const classes = useStyles();

    return (
        <List>
            <ListItem className={classes.listItem}>
                <ListItemAvatar>
                    <Avatar>B</Avatar>
                </ListItemAvatar>
                <ListItemText
                    primary="Xuân Bắc"
                    secondary="30 minutes ago"
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
    );
}

export default Friends