import { green } from '@material-ui/core/colors'
import { makeStyles } from '@material-ui/core/styles'


const useStyles = makeStyles((theme) => ({
    tabs: {
        width: 70,
        height: '100vh',
        overflow: 'unset !important',
        borderRight: '1px solid #00000015'
    },
    tab: {
        minWidth: 0,
        padding: '18px 12px',
        '@media (min-width: 600px)': {
            minWidth: 0
        }
    },
    tabPanel: {
        width: 'calc(100% - 70px)',
    },
    icon: {
        fontSize: 28,
        color: green[600],
    }
}))

export default useStyles