import { green } from '@material-ui/core/colors'
import { makeStyles } from '@material-ui/core/styles'


const useStyles = makeStyles((theme) => ({
    profile: {
        position: 'relative',
        
    },
    avatar: {
        width: 100,
        height: 100,
        objectFit: 'cover',
        verticalAlign: 'bottom',
        margin: '0 auto',
        position: 'relative',
        '&::before': {
            position: 'absolute',
            content: '""',
            top: 0,
            left: 0,
            zIndex: 2,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            backgroundColor: '#00000060',
            display: 'none'
        },
        '&:hover::before': {
            cursor: 'pointer',
            display: 'block'
        },
        '&:hover + svg': {
            display: 'block'
        }
    },
    icon: {
        position: 'absolute',
        zIndex: 1,
        color: '#fff',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        display: 'none'
    },
    info: {
        textAlign: 'center',
        marginTop: 10
    },
    textField: {
        '& > *': {
            textAlign: 'center'
        }
    }
}))

export default useStyles