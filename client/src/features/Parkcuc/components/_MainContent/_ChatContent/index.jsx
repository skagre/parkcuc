import React from 'react'

import { 
    Avatar,
    List,
    ListItem,
    GridList,
    GridListTile
} from '@material-ui/core'

import AttachmentTwoToneIcon from '@material-ui/icons/AttachmentTwoTone'
import PlayCircleOutlineTwoToneIcon from '@material-ui/icons/PlayCircleOutlineTwoTone'

import useStyles from './style'
import jwtDecode from 'jwt-decode'


const ChatContent = props => {
    const classes = useStyles()
    const userInfo = jwtDecode(localStorage.getItem('jwt'))
    return (
        <>
        {props.messages &&
        <ul className={`${classes.chatWrap} custom-scroll`}>
            {props.messages.map(message => 
                <li className={`${classes.msg} ${message.sender === userInfo._id ? classes.msgMine : null}`}>
                    <Avatar 
                        className={classes.avatar}
                        src={ message.sender === userInfo._id 
                            ? `${process.env.REACT_APP_BASE_URL}/image/${userInfo.avatar}`
                            : `${process.env.REACT_APP_BASE_URL}/image/${message.avatar}`} 
                        alt={userInfo.name}/>
                    <ul className={`${classes.msgBody} ${message.sender === userInfo._id ? classes.msgBodyMine : null}`}>
                        <li>{message.body}</li>

                        {/* <li className={`${classes.msgHasDocument} ${classes.msgHasDocumentMine}`}>
                            <List>
                                <ListItem>
                                    <AttachmentTwoToneIcon />
                                    <span>Kế-hoạch-đồ-án-tốt-nghiệp-khóa-17.docx</span>
                                </ListItem>
                            </List>
                        </li>
                    
                        <li className={`${classes.msgHasMedia} ${classes.msgHasMediaMine}`}>
                            <GridList cellHeight={200} className={classes.gridList} cols={3} >
                                <GridListTile cols={1}>
                                    <img src="https://material-ui.com/static/images/grid-list/honey.jpg" alt="alt" />
                                </GridListTile>
                                <GridListTile cols={1}>
                                    <img src="https://material-ui.com/static/images/grid-list/honey.jpg" alt="alt" />
                                </GridListTile>
                                <GridListTile cols={1}>
                                    <img src="https://material-ui.com/static/images/grid-list/honey.jpg" alt="alt" />
                                </GridListTile>
                                <GridListTile cols={1}>
                                    <video className={classes.video}>
                                        <source src="https://file-examples-com.github.io/uploads/2017/04/file_example_MP4_480_1_5MG.mp4" type="video/mp4" />
                                    </video>
                                    <PlayCircleOutlineTwoToneIcon className={classes.icon} />
                                </GridListTile>
                            </GridList>
                        </li> */}
                    </ul>
                </li>
            )}


          
        </ul> 
        }
        </>
    )
}

export default ChatContent