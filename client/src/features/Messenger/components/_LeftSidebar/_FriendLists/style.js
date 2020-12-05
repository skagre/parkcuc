import { green } from '@material-ui/core/colors'
import { makeStyles } from '@material-ui/core/styles'


const useStyles = makeStyles((theme) => ({
    list: {
        height: 'calc(100vh - 164px)',
        overflowY: 'scroll',
    },
    listItem: {
        borderBottom: '1px solid #00000015',
        '&:hover': {
            cursor: 'pointer',
            backgroundColor: green[50]
        }
    }
}))

export default useStyles