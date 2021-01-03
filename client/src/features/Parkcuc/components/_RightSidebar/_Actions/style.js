import { green } from '@material-ui/core/colors'
import { makeStyles } from '@material-ui/core/styles'


const useStyles = makeStyles((theme) => ({
    accordion: {
        margin: '0 !important',
        borderBottom: '1px solid #00000020',
        '&::before': {
            backgroundColor: 'unset'
        }
    },
    accordionDetails: {
        padding: 0
    },
    heading: {
        color: '#00000060',
        fontWeight: 700
    },
    list: {
        width: '100%',
        paddingTop: 0,
        paddingBottom: 0
    },
    listItem: {
        padding: '8px 16px 16px'
    },
    inputNickname: {
        width: '100%'
    }
}))

export default useStyles