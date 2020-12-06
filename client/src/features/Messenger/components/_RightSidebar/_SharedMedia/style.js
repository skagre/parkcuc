import { green } from '@material-ui/core/colors'
import { makeStyles } from '@material-ui/core/styles'


const useStyles = makeStyles((theme) => ({
    accordion: {
        margin: '0 !important',
        boxShadow: 'unset',
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
    gallery: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 2,
        gridAutoRows: '1fr',    
        '&::before': {
            content: '""',
            width: 0,
            paddingBottom: '100%',
            gridRow: '1 / 1',
            gridColumn: '1 / 1',
        },
        '& > div:first-child': {
            gridRow: '1 / 1',
            gridColumn: '1 / 1',
        }
    },
    media: {
        position: 'relative',
        '&:hover': {
            cursor: 'pointer',
            opacity: 0.9,
        },
        '& > img': {
            width: '100%',
            height: '100%',
            verticalAlign: 'bottom',
            objectFit: 'cover',
        },
        '& > video': {
            width: '100%',
            height: '100%',
            objectFit: 'cover',
        }
    },
    icon: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        color: '#fff'
    }
}))

export default useStyles