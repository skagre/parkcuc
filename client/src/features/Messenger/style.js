import { makeStyles } from '@material-ui/core/styles'


const useStyles = makeStyles({
    leftSidebar: {
        minWidth: '300px',
        maxWidth: '480px',
        flexBasis: '27%',
        display: 'flex'
    },
    mainContent: {
        flex: 1,
        backgroundColor: 'green'
    },
    rightSidebar: {
        minWidth: '280px',
        maxWidth: '360px',
        flexBasis: '23%',
        backgroundColor: 'blue'
    }
})

export default useStyles