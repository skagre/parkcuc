import { green } from '@material-ui/core/colors'
import { makeStyles } from '@material-ui/core/styles'


const useStyles = makeStyles((theme) => ({
    chatHeader: {
        backgroundColor: '#fff',
        height: 100,
        margin: 30,
        width: 'calc(100% - 60px)',
        position: 'absolute',
        left: 0,
        top: 0,
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: '0 30px',
        zIndex: 1,
        boxShadow: '0 -30px 0px 25px #e8f5e9'
    },
    avatar: {
        width: 60,
        height: 60,
        objectFit: 'cover',
        verticalAlign: 'bottom',
        borderRadius: 20
    },
    info: {
        paddingLeft: 10,
        paddingRight: 20,
        borderRight: '1px solid #00000040',
        '& > p:first-child': {
            fontWeight: 700
        },
        '& > p:last-child': {
            fontSize: 14
        }
    },
    iconGroup: {
        marginLeft: 'auto'
    },
    icon: {
        fontSize: 42,
        padding: 10,
        borderRadius: '50%',
        backgroundColor: '#00000010',
        margin: '0 10px',
        '&:hover': {
            cursor: 'pointer',
            backgroundColor: '#00000020',
        }
    }
}))

export default useStyles