import React from 'react'

import { 
    Avatar,
    List,
    ListItem,
    GridList,
    GridListTile
} from '@material-ui/core'

import AttachmentTwoToneIcon from '@material-ui/icons/AttachmentTwoTone'

import useStyles from './style';


const ChatContent = props => {
    const classes = useStyles()
    return (
        <div className={classes.chatContent}>
            <ul className={classes.chatWrap}>
                <li className={`${classes.msg} ${classes.mine}`}>
                    <Avatar 
                        className={classes.avatar}
                        alt="avatar" 
                        src="https://material-ui.com/static/images/avatar/1.jpg" 
                    />
                    <ul className={classes.msgBody}>
                        <li>Hi I am Alan,</li>
                        <li>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Impedit, numquam!</li>

                        <li className={classes.msgHasDocument}>
                            <List>
                                <ListItem>
                                    <AttachmentTwoToneIcon />
                                    <span>Kế-hoạch-đồ-án-tốt-nghiệp-khóa-17.docx</span>
                                </ListItem>
                            </List>
                        </li>
                    
                        <li className={classes.msgHasMedia}>
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
                                    <img src="https://material-ui.com/static/images/grid-list/honey.jpg" alt="alt" />
                                </GridListTile>
                            </GridList>
                            
                        </li>
                    </ul>
                </li>
            </ul>  
        </div>
    )
}

export default ChatContent