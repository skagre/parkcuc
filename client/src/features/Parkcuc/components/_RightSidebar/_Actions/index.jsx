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

import SearchTwoToneIcon from '@material-ui/icons/SearchTwoTone'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import EditTwoToneIcon from '@material-ui/icons/EditTwoTone'
import ThumbUpTwoToneIcon from '@material-ui/icons/ThumbUpTwoTone'
import AdjustTwoToneIcon from '@material-ui/icons/AdjustTwoTone'

import useStyles from './style';

const Actions = props => {
    const classes = useStyles()
    const [expanded, setExpanded] = useState(true)
    return (
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
                    <ListItem className={classes.listItem} button>
                        <ListItemText primary="Change emoji" />
                        <ThumbUpTwoToneIcon className={classes.icon} />
                    </ListItem>
                </List>
            </AccordionDetails>
        </Accordion>
    )
}

export default Actions