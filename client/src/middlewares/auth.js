


const isAuth = store => next => action => {
    console.log(action)
    if(action.type === 'authLogin/fulfilled' && !action.payload.errors) {
        alert('2')
    }
    
    return next(action)
}

export default isAuth