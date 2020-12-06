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

import useStyles from './style';


const ChatContent = props => {
    const classes = useStyles()
    return (
        <ul className={`${classes.chatWrap} custom-scroll`}>
            <li className={`${classes.msg} ${classes.msgMine}`}>
                <Avatar 
                    className={classes.avatar}
                    alt="avatar" 
                    src="https://material-ui.com/static/images/avatar/1.jpg" 
                />
                <ul className={`${classes.msgBody} ${classes.msgBodyMine}`}>
                    <li>Hi I am Alan,</li>
                    <li>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Impedit, numquam!</li>

                    <li className={`${classes.msgHasDocument} ${classes.msgHasDocumentMine}`}>
                        <List>
                            <ListItem>
                                <AttachmentTwoToneIcon />
                                <span>Kế-hoạch-đồ-án-tốt-nghiệp-khóa-17.docx</span>
                            </ListItem>
                        </List>
                    </li>
                
                    <li className={`${classes.msgHasMedia} ${classes.msgHasMediaMine}`}>
                        <GridList cellHeight={200} className={classes.gridList} cols={3} >
                            <GridListTile cols="1">
                                <img src="https://material-ui.com/static/images/grid-list/honey.jpg" alt="alt" />
                            </GridListTile>
                            <GridListTile cols="1">
                                <img src="https://material-ui.com/static/images/grid-list/honey.jpg" alt="alt" />
                            </GridListTile>
                            <GridListTile cols="1">
                                <img src="https://material-ui.com/static/images/grid-list/honey.jpg" alt="alt" />
                            </GridListTile>
                            <GridListTile cols="1">
                                <video className={classes.video}>
                                    <source src="https://file-examples-com.github.io/uploads/2017/04/file_example_MP4_480_1_5MG.mp4" type="video/mp4" />
                                </video>
                                <PlayCircleOutlineTwoToneIcon className={classes.icon} />
                            </GridListTile>
                        </GridList>
                        
                    </li>
                </ul>
            </li>


            <li className={`${classes.msg}`}>
                <Avatar 
                    className={classes.avatar}
                    alt="avatar" 
                    src="https://material-ui.com/static/images/avatar/1.jpg" 
                />
                <ul className={`${classes.msgBody}`}>
                    <li>Hi I am Alan,</li>
                    <li>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Impedit, numquam!</li>

                    <li className={`${classes.msgHasDocument}`}>
                        <List>
                            <ListItem>
                                <AttachmentTwoToneIcon />
                                <span>Kế-hoạch-đồ-án-tốt-nghiệp-khóa-17.docx</span>
                            </ListItem>
                        </List>
                    </li>
                
                    <li className={`${classes.msgHasMedia}`}>
                        <GridList cellHeight={200} className={classes.gridList} cols={3} >
                            <GridListTile cols="1">
                                <img src="https://material-ui.com/static/images/grid-list/honey.jpg" alt="alt" />
                            </GridListTile>
                            <GridListTile cols="1">
                                <img src="https://material-ui.com/static/images/grid-list/honey.jpg" alt="alt" />
                            </GridListTile>
                            <GridListTile cols="1">
                                <img src="https://material-ui.com/static/images/grid-list/honey.jpg" alt="alt" />
                            </GridListTile>
                            <GridListTile cols="1">
                                <video className={classes.video}>
                                    <source src="https://file-examples-com.github.io/uploads/2017/04/file_example_MP4_480_1_5MG.mp4" type="video/mp4" />
                                </video>
                                <PlayCircleOutlineTwoToneIcon className={classes.icon} />
                            </GridListTile>
                        </GridList>
                        
                    </li>
                </ul>
            </li>
        </ul>  
    )
}

export default ChatContent