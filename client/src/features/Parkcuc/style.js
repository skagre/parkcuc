import { green } from '@material-ui/core/colors'
import { makeStyles } from '@material-ui/core/styles'


const useStyles = makeStyles({
    container: {
        overflow: 'hidden'
    },
    leftSidebar: {
        minWidth: 300,
        maxWidth: 480,
        flexBasis: '27%',
        display: 'flex'
    },
    mainContent: {
        flex: 1,
        backgroundColor: green[50],
        position: 'relative'
    },
    rightSidebar: {
        minWidth: 280,
        maxWidth: 360,
        flexBasis: '23%'
    }
})

export default useStyles