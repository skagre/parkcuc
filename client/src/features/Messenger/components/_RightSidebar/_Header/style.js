import { green } from '@material-ui/core/colors'
import { makeStyles } from '@material-ui/core/styles'


const useStyles = makeStyles((theme) => ({
    headerWrap: {
        display: 'flex',
        flexFlow: 'column',
        alignItems: 'center',
        gap: 10,
        padding: '30px 0',
        borderBottom: '1px solid #00000020'
    },
    avatar: {
        width: 100,
        height: 100,
        objectFit: 'cover',
        verticalAlign: 'bottom'
    },
    text: {
        '&:first-of-type': {
            fontWeight: 'bold'
        },
        '&:last-of-type': {
            marginTop: -15,
            fontSize: 14,
            color: '#00000080'
        }
    },
    icon: {
        fontSize: 42,
        padding: 10,
        backgroundColor: '#00000010',
        borderRadius: '50%',
        margin: '0 10px',
        '&:hover': {
            backgroundColor: '#00000020',
            cursor: 'pointer'
        }
    }
}))

export default useStyles