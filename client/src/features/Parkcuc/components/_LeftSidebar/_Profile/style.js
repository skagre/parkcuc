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
        border: '2px solid green',
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
    },
    label: {
        display: 'block',
        width: 100,
        height: 100,
        margin: '30px auto 0 auto',
        borderRadius: '50%',
        '& > input': {
            display: 'none'
        },
        '&:hover > svg': {
            display: 'block'
        }
    },
    progress: {
        width: 100,
        margin: '10px auto 0 auto'
    },
    username: {
        '&:hover': {
            cursor: 'pointer',
            textDecoration: 'underline'
        },
        '& > svg': {
            verticalAlign: 'text-bottom'
        }
    },
    list: {
        '& > li:not(:first-child):hover': {
            backgroundColor: '#00000007',
            cursor: 'pointer'
        }
    }
}))

export default useStyles