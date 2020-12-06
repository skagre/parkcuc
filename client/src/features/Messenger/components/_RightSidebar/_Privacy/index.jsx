import React, { useState } from 'react'

import { 
    Accordion, 
    AccordionDetails, 
    AccordionSummary, 
    Typography,
    List,
    ListItem,
    ListItemText
} from '@material-ui/core';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import DeleteTwoToneIcon from '@material-ui/icons/DeleteTwoTone'
import VisibilityOffTwoToneIcon from '@material-ui/icons/VisibilityOffTwoTone'
import RemoveCircleTwoToneIcon from '@material-ui/icons/RemoveCircleTwoTone'

import useStyles from './style';

const Privacy = props => {
    const classes = useStyles()
    const [expanded, setExpanded] = useState(true)
    return (
        <Accordion className={classes.accordion} expanded={expanded}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}  onClick={()=> setExpanded(!expanded)}>
                <Typography className={classes.heading}>PRIVACY</Typography>
            </AccordionSummary>
            <AccordionDetails className={classes.accordionDetails}>
                <List className={classes.list}>
                    <ListItem className={classes.listItem} button>
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
    )
}

export default Privacy