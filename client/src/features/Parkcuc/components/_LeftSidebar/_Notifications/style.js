import { green } from '@material-ui/core/colors'
import { makeStyles } from '@material-ui/core/styles'


const useStyles = makeStyles((theme) => ({
    list: {
        height: 'calc(100vh - 106px)',
        overflowY: 'scroll',
    },
    listItem: {
        borderBottom: '1px solid #00000015',
        flexFlow: 'row wrap',
        '&:hover': {
            cursor: 'pointer',
            backgroundColor: green[50]
        }
    },
    box: {
        flexBasis: '100%',
        textAlign: 'center',
        '& > button': {
            margin: '5px 10px',
            padding: '5px 20px',
            '&:first-child': {
                color: green[300]
            },
            '&:last-child': {
                color: '#00000060'
            }
        }
    }
}))

export default useStyles