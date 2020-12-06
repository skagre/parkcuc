import React, { useState } from 'react'

import { 
    Accordion, 
    AccordionDetails, 
    AccordionSummary, 
    Typography,
    GridList,
    GridListTile
} from '@material-ui/core';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import PlayCircleOutlineTwoToneIcon from '@material-ui/icons/PlayCircleOutlineTwoTone'

import useStyles from './style';

const SharedMedia = props => {
    const classes = useStyles()
    const [expanded, setExpanded] = useState(true)
    return (
        <Accordion className={classes.accordion} expanded={expanded}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}  onClick={()=> setExpanded(!expanded)}>
                <Typography className={classes.heading}>SHARED MEDIA</Typography>
            </AccordionSummary>
            <AccordionDetails className={classes.accordionDetails}>
                <div className={classes.gallery}>
                    <div className={classes.media}>
                        <img src="https://dummyimage.com/200x200/ddd/fff" alt="media" />
                    </div>
                    <div className={classes.media}>
                        <video>
                            <source src="https://file-examples-com.github.io/uploads/2017/04/file_example_MP4_480_1_5MG.mp4" type="video/mp4" />
                        </video>
                        <PlayCircleOutlineTwoToneIcon className={classes.icon} />
                    </div>
                    <div className={classes.media}>
                        <img src="https://dummyimage.com/200x200/ddd/fff" alt="media" />
                    </div>
                    <div className={classes.media}>
                        <video>
                            <source src="https://file-examples-com.github.io/uploads/2017/04/file_example_MP4_480_1_5MG.mp4" type="video/mp4" />
                        </video>
                        <PlayCircleOutlineTwoToneIcon className={classes.icon} />
                    </div>
                    <div className={classes.media}>
                        <img src="https://dummyimage.com/200x200/ddd/fff" alt="media" />
                    </div>
                    <div className={classes.media}>
                        <video>
                            <source src="https://file-examples-com.github.io/uploads/2017/04/file_example_MP4_480_1_5MG.mp4" type="video/mp4" />
                        </video>
                        <PlayCircleOutlineTwoToneIcon className={classes.icon} />
                    </div>
                </div>
            </AccordionDetails>
        </Accordion>
    )
}

export default SharedMedia