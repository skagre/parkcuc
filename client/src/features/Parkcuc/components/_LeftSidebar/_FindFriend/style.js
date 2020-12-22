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
            backgroundColor: '#00000007'
        }
    },
    text: {
        maxWidth: '65%',
        '&:last-child': {
            color: '#0000008A'
        }
    }
}))

export default useStyles