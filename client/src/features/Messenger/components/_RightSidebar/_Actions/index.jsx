import React from 'react'

import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import useStyles from './style';
import { 
    Accordion, 
    AccordionDetails, 
    AccordionSummary, 
    Typography,
    List,
    ListItem,
    ListItemIcon,
    ListItemText
} from '@material-ui/core';


const Actions = props => {
    const classes = useStyles()
    return (
        <div className={classes.headerWrap}>
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography className={classes.heading}>ACTIONS</Typography>
                </AccordionSummary>
                <AccordionDetails>
                <List component="nav">
                    <ListItem button>
                        <ListItemText primary="Inbox" />
                        <ListItemIcon>
                            <ExpandMoreIcon />
                        </ListItemIcon>
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon>
                            <ExpandMoreIcon />
                        </ListItemIcon>
                        <ListItemText primary="Drafts" />
                    </ListItem>
                </List>
                </AccordionDetails>
            </Accordion>
        </div>
    );
}

export default Actions