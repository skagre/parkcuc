import { green } from '@material-ui/core/colors'
import { makeStyles } from '@material-ui/core/styles'


const useStyles = makeStyles((theme) => ({
    form: {
        height: '100vh',
        maxWidth: 'unset !important',
        backgroundColor: green[100]
    },
    box: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        display: 'flex',
        flexFlow: 'column',
        width: '350px',
        backgroundColor: '#fff',
        padding: '50px 30px',
        borderRadius: 12
    },
    icon: {
        color: green[900],
        textAlign: 'center',
        marginBottom: 10,
        '& > svg': {
            fontSize: 48
        }
    },
    input: {
        margin: '10px 0',
        '& input:valid:hover + fieldset': {
            borderColor: green[200]
        },
        '& input:valid + fieldset': {
            borderColor: green[400],
            borderWidth: 2
        },
        '& input:valid:focus + fieldset': {
            borderColor: green[400],
            borderLeftWidth: 6,
            padding: '4px !important'
        }
    },
    button: {
        marginTop: 10,
        backgroundColor: green[200],
        '&:hover': {
            backgroundColor: green[300]
        }
    },
    link: {
        color: green[500],
        textDecoration: 'none',
        '&:hover': {
            cursor: 'pointer',
            color: green[800],
        }
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    alert: {
        color: 'red',
        fontSize: 14,
        marginTop: -5,
        '&:last-of-type': {
            marginBottom: 5
        },
        '&::before': {
            display: 'inline',
            content: '"⚠ "'
        }
    }
}))

export default useStyles