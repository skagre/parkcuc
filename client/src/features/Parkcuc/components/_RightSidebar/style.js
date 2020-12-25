import { green } from '@material-ui/core/colors'
import { makeStyles } from '@material-ui/core/styles'


const useStyles = makeStyles((theme) => ({
    rightSidebar: {
        height: '100vh',
        overflowY: 'scroll',
        overflowX: 'hidden',
        backgroundColor: '#fff',
        padding: '30px 0'
    }
}))

export default useStyles