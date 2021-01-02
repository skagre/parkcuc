import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Button, Dialog,
    DialogActions, DialogContent, DialogContentText, DialogTitle, List,
    ListItem,
    ListItemText,
    Typography
} from '@material-ui/core'
import AdjustTwoToneIcon from '@material-ui/icons/AdjustTwoTone'
import EditTwoToneIcon from '@material-ui/icons/EditTwoTone'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import SearchTwoToneIcon from '@material-ui/icons/SearchTwoTone'
import ThumbUpTwoToneIcon from '@material-ui/icons/ThumbUpTwoTone'
import Picker, { SKIN_TONE_NEUTRAL } from 'emoji-picker-react'
import React, { useState } from 'react'
import useStyles from './style'


const Actions = props => {
    const classes = useStyles()
    const [expanded, setExpanded] = useState(true)
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const onEmojiClick = (event, emojiObject) => {
        alert(emojiObject.emoji)
    }

    return (
        <>
        <Accordion className={classes.accordion} expanded={expanded}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}  onClick={()=> setExpanded(!expanded)}>
                <Typography className={classes.heading}>MORE ACTIONS</Typography>
            </AccordionSummary>
            <AccordionDetails className={classes.accordionDetails}>
                <List className={classes.list}>
                    <ListItem className={classes.listItem} button>
                        <ListItemText primary="Search in conversation" />
                        <SearchTwoToneIcon className={classes.icon} />
                    </ListItem>
                    <ListItem className={classes.listItem} button>
                        <ListItemText primary="Edit nicknames" />
                        <EditTwoToneIcon className={classes.icon} />
                    </ListItem>
                    <ListItem className={classes.listItem} button>
                        <ListItemText primary="Change theme" />
                        <AdjustTwoToneIcon className={classes.icon} />
                    </ListItem>
                    <ListItem className={classes.listItem} button onClick={() => handleOpen()}>
                        <ListItemText primary="Change emoji" />
                        <ThumbUpTwoToneIcon className={classes.icon} />
                    </ListItem>
                </List>
            </AccordionDetails>
        </Accordion>
        <Dialog
            open={open}
            keepMounted
            onClose={handleClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle id="alert-dialog-slide-title">{"Change emoji"}</DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
                <Picker
                    onEmojiClick={onEmojiClick} 
                    disableAutoFocus={true} 
                    skinTone={SKIN_TONE_NEUTRAL}
                    groupNames={{smileys_people:"PEOPLE"}}/>
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose} color="primary">
                Cancel
            </Button>
            </DialogActions>
        </Dialog>
        </>
    )
}

export default Actions