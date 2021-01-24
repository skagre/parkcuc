import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, List,
    ListItem,
    ListItemText, Typography
} from '@material-ui/core';
import DeleteTwoToneIcon from '@material-ui/icons/DeleteTwoTone';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import RemoveCircleTwoToneIcon from '@material-ui/icons/RemoveCircleTwoTone';
import VisibilityOffTwoToneIcon from '@material-ui/icons/VisibilityOffTwoTone';
import { blockMessagesAPI } from 'features/Parkcuc/parkcucSlice';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useStyles from './style';


const Privacy = props => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const f = useSelector(state => state.parkcuc)
    const [expanded, setExpanded] = useState(true)
    const [openBlockDialog, setOpenBlockDialog] = useState(false)

    const blockMessages = async () => {
        await dispatch(blockMessagesAPI({ conversation_id: f.activeConversationID }))
        setOpenBlockDialog(false)
    }

    return (
        <>
        <Accordion className={classes.accordion} expanded={expanded}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}  onClick={() => setExpanded(!expanded)}>
                <Typography className={classes.heading}>PRIVACY</Typography>
            </AccordionSummary>
            <AccordionDetails className={classes.accordionDetails}>
                <List className={classes.list}>
                    <ListItem className={classes.listItem} button onClick={() => setOpenBlockDialog(true)}>
                        <ListItemText primary="Block messages" />
                        <RemoveCircleTwoToneIcon className={classes.icon} />
                    </ListItem>
                    <ListItem className={classes.listItem} button>
                        <ListItemText primary="Hide conversation" />
                        <VisibilityOffTwoToneIcon className={classes.icon} />
                    </ListItem>
                    <ListItem className={classes.listItem} button>
                        <ListItemText primary="Delete conversation" />
                        <DeleteTwoToneIcon className={classes.icon} />
                    </ListItem>
                </List>
            </AccordionDetails>
        </Accordion>

        <Dialog
            open={openBlockDialog}
            keepMounted
            onClose={() => setOpenBlockDialog(false)}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle id="alert-dialog-slide-title">{"Are you sure you want to block this user?"}</DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
                This action can not be undone.
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={() => blockMessages()} color="secondary">
                Block
            </Button>
            <Button onClick={() => setOpenBlockDialog(false)} color="primary">
                Cancel
            </Button>
            </DialogActions>
        </Dialog>
        </>
    )
}

export default Privacy