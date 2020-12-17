import { green } from '@material-ui/core/colors'
import { makeStyles } from '@material-ui/core/styles'


const useStyles = makeStyles((theme) => ({
    chatWrap: {
        padding: '140px 10px 10px 10px',
        height: 'calc(100vh - 95px)',
        overflowY: 'scroll'
    },
    avatar: {
        display: 'flex',
        alignItems: 'flex-end',
        height: 'unset',
        overflow: 'unset',
        '& > img': {
            width: 40,
            height: 40,
            borderRadius: '50%'
        }
    },
    msg: {
        display: 'flex',
        margin: '5px 0'
    },
    msgBody: {
        listStyle: 'none',
        display: 'flex',
        flexFlow: 'column wrap',
        alignItems: 'flex-start',
        paddingLeft: 10,
        maxWidth: '60%',
        '& > li': {
            width: 'fit-content',
            padding: '6px 12px 7px',
            fontSize: 15,
            margin: '2px 0',
            backgroundColor: '#e0e0e0',
            color: '#545454',
            borderRadius: '0 1.3em 1.3em 0',
            '&:first-child': {
                borderTopLeftRadius: '1.3em',
                marginTop: 0
            },
            '&:last-child': {
                borderBottomLeftRadius: '1.3em',
                marginBottom: 0
            }
        }
    },
    msgHasMedia: {
        padding: '0 !important',
        backgroundColor: 'transparent !important',
        overflow: 'hidden',
        '& > ul > li:hover': {
            cursor: 'pointer',
            opacity: 0.9
        }
    },
    msgHasDocument: {
        width: 'fit-content',
        '& > ul': {
            margin: 0,
            padding: 0,
            '& > li': {
                margin: 0,
                padding: 0,
                '& > svg': {
                    marginRight: 10
                },
                '&:hover': {
                    cursor: 'pointer',
                    color: green[600],
                    textDecoration: 'underline'
                },
            },
        },
        
    },
    video: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        position: 'relative'
    },
    icon: {
        position: 'absolute',
        color: '#fff',
        fontSize: '2em',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
    },
    msgMine: {
        flexFlow: 'row-reverse'
    },
    msgBodyMine: {
        paddingLeft: 0,
        paddingRight: 10,
        alignItems: 'flex-end',
        '& > li': {
            padding: '7px 12px 6px',
            backgroundColor: green[400],
            color: '#fff',
            borderRadius: '1.3em 0 0 1.3em',
            '&:first-child': {
                borderTopRightRadius: '1.3em',
                marginTop: 0
            },
            '&:last-child': {
                borderBottomRightRadius: '1.3em',
                marginBottom: 0
            }
        }
    },
    msgHasDocumentMine: {
        '& > ul > li:hover': {
            color: '#ffffff95',
        }
    },
    msgHasMediaMine: {
        '& > ul': {
            justifyContent: 'flex-end'
        }
    }
}))

export default useStyles