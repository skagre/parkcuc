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
import AttachmentTwoToneIcon from '@material-ui/icons/AttachmentTwoTone'

import useStyles from './style';

const SharedFiles = props => {
    const classes = useStyles()
    const [expanded, setExpanded] = useState(true)
    return (
        <Accordion className={classes.accordion} expanded={expanded}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}  onClick={()=> setExpanded(!expanded)}>
                <Typography className={classes.heading}>SHARED FILES</Typography>
            </AccordionSummary>
            <AccordionDetails className={classes.accordionDetails}>
                <List className={classes.list}>
                    <ListItem className={classes.listItem} button>
                        <ListItemText primary="Kế-hoạch-asd-asdasd-đồ-án-tốt-nghiệp-khóa-17.docx" />
                        <AttachmentTwoToneIcon className={classes.icon} />
                    </ListItem>
                    <ListItem className={classes.listItem} button>
                        <ListItemText primary="Kế-hoạch-khóa-17.docx" />
                        <AttachmentTwoToneIcon className={classes.icon} />
                    </ListItem>
                </List>
            </AccordionDetails>
        </Accordion>
    )
}

export default SharedFiles