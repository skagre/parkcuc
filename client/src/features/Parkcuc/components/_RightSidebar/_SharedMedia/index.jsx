import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Typography
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import PlayCircleOutlineTwoToneIcon from '@material-ui/icons/PlayCircleOutlineTwoTone'
import { unwrapResult } from '@reduxjs/toolkit'
import { fetchAttachmentsAPI, rerenderAttachments } from 'features/Parkcuc/parkcucSlice'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useStyles from './style'


const SharedMedia = props => {
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
        <>
        <Accordion className={classes.accordion} expanded={expanded}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}  onClick={()=> setExpanded(!expanded)}>
                <Typography className={classes.heading}>SHARED MEDIA</Typography>
            </AccordionSummary>
            <AccordionDetails className={classes.accordionDetails}>
                <div className={classes.gallery}>
                    {attachmentLists && attachmentLists.slice().sort((a, b) => b.uploadDate - a.uploadDate).map(attachment =>
                        attachment.mimetype.includes('image')
                        ?
                        <div className={classes.media} key={attachment.id}>
                            <img src={`${process.env.REACT_APP_BASE_URL}/attachment/${attachment.filename}`} alt={attachment.filename} />
                        </div>
                        :
                        attachment.mimetype.includes('video') &&
                        <div className={classes.media} key={attachment.id}>
                            <video>
                                <source src={`${process.env.REACT_APP_BASE_URL}/attachment/${attachment.filename}`} />
                            </video>
                            <PlayCircleOutlineTwoToneIcon className={classes.icon} />
                        </div>
                    )}
                </div>
            </AccordionDetails>
        </Accordion>
        </>
    )
}

export default SharedMedia