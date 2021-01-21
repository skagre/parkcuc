import { green } from '@material-ui/core/colors'
import { makeStyles } from '@material-ui/core/styles'
import img from 'app/images/bg-img.png'
import img2 from 'app/images/bg-img2.png'


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
        position: 'relative',
        background: `url(${img}) no-repeat center`,
        backgroundSize: '100%'
    },
    rightSidebar: {
        minWidth: 280,
        maxWidth: 360,
        backgroundColor: green[50],
        flexBasis: '23%',
        background: `url(${img2}) no-repeat center`,
        backgroundSize: '100%'
    }
})

export default useStyles