import { green } from '@material-ui/core/colors'
import { makeStyles } from '@material-ui/core/styles'


const useStyles = makeStyles((theme) => ({
    chatInput: {
        backgroundColor: '#fff',
        height: 95,
        width: '100%',
        position: 'absolute',
        left: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: '0 20px'
    },
    input: {
        width: '100%',
        padding: '8px 16px',
        backgroundColor: '#00000010',
        borderRadius: 999
    },
    icon: {
        fontSize: 42,
        backgroundColor: green[50],
        color: green[700],
        padding: 10,
        borderRadius: '50%',
        '&:hover': {
            cursor: 'pointer',
            backgroundColor: green[100]
        }
    },
    inputIcon: {
        color: green[700],
        '&:hover': {
            cursor: 'pointer',
            color: green[900],
        },
    },
    quickEmoji: {
        fontSize: 32,
        lineHeight: '42px',
        width: 42,
        height: 42,
        '&:hover': {
            cursor: 'pointer'
        }
    }
}))

export default useStyles