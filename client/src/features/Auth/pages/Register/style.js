import { green } from '@material-ui/core/colors'
import { makeStyles } from '@material-ui/core/styles'


const useStyles = makeStyles((theme) => ({
    container: {
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
        width: '500px',
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
    group: {
        display: 'flex'
    },
    input: {
        margin: 10
    },
    button: {
        margin: 10,
        backgroundColor: green[200],
        '&:hover': {
            backgroundColor: green[300]
        }
    },
    link: {
        color: green[500],
        textDecoration: 'none',
        marginLeft: 10,
        '&:hover': {
            cursor: 'pointer',
            color: green[800],
        }
    }
}))

export default useStyles