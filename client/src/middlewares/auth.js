import store from 'app/store'


const isAuth = store => next => action => {
    const state = store.getState()

    const authToken = state.currentUser.login.token
    console.log(authToken)


}

export default isAuth