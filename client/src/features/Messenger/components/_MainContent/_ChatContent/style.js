import { Hidden } from '@material-ui/core'
import { green } from '@material-ui/core/colors'
import { makeStyles } from '@material-ui/core/styles'


const useStyles = makeStyles((theme) => ({
    chatWrap: {
        padding: 10
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
            backgroundColor: '#f1f0f0',
            color: '#000',
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
        overflow: 'hidden'
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
    mine: {
        color: 'red'
    }
}))

export default useStyles