


const isAuth = store => next => action => {
    
    console.log(store.getState())
    next(action)
}

export default isAuth