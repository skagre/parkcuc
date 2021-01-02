import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    List,
    ListItem,
    ListItemText, Typography
} from '@material-ui/core'
import AttachmentTwoToneIcon from '@material-ui/icons/AttachmentTwoTone'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { unwrapResult } from '@reduxjs/toolkit'
import { fetchAttachmentsAPI, rerenderAttachments } from 'features/Parkcuc/parkcucSlice'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useStyles from './style'


const SharedFiles = props => {
    const classes = useStyles()
    const [expanded, setExpanded] = useState(true)    
    const f = useSelector(state => state.parkcuc)
    const dispatch = useDispatch()
    const [attachmentLists, setAttachmentLists] = useState()

    useEffect(() => {
        if (f.activeConversationInfo) {
            fetchAttachments()
        }
    }, [f.activeConversationInfo])

    useEffect(() => {
        if (f.rerenderAttachments) {
            fetchAttachments()
        }
    }, [f.rerenderAttachments])

    const fetchAttachments = async () => {
        try {
            const actionResult = await dispatch(fetchAttachmentsAPI({ user_id: f.activeConversationInfo._id, limit: 20, offset: 0 }))
            const fetchStatus = unwrapResult(actionResult)
            setAttachmentLists(fetchStatus.data.fetchAttachments)
            dispatch(rerenderAttachments(false))
        } catch (err) {
            console.log("Oops! Failed to fetchAttachments.")
        }
    }

    return (
        <Accordion className={classes.accordion} expanded={expanded}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}  onClick={()=> setExpanded(!expanded)}>
                <Typography className={classes.heading}>SHARED FILES</Typography>
            </AccordionSummary>
            <AccordionDetails className={classes.accordionDetails}>
                <List className={classes.list}>
                {attachmentLists && attachmentLists.slice().sort((a, b) => b.uploadDate - a.uploadDate).map(attachment =>
                    !attachment.mimetype.includes('image') && !attachment.mimetype.includes('video') &&
                    <ListItem className={classes.listItem} button key={attachment.id}>
                            <ListItemText primary={
                                <a className={classes.a} href={`${process.env.REACT_APP_BASE_URL}/attachment/${attachment.filename}`} target="_blank">
                                    <Typography noWrap>{attachment.originalname}</Typography>
                                </a>
                            } />
                        
                        <AttachmentTwoToneIcon className={classes.icon} />
                    </ListItem>
                )}
                </List>
            </AccordionDetails>
        </Accordion>
    )
}

export default SharedFiles