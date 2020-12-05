import axiosClient from './axiosClient'


const url = process.env.REACT_APP_API_URL
const userApi = {
    // fetchFriendLists: ({ params }) => {
    //     const data = {
    //         query: 
    //         `mutation fetchFriendLists($emailOrSomething: String!, $password: String!) {
    //             login(emailOrSomething: $emailOrSomething, password: $password) {
    //                 user_id
    //                 token
    //             }
    //         }`,
    //         variables: {
    //             emailOrSomething: params.emailOrSomething,
    //             password: params.password
    //         }
    //     }
    //     return axiosClient.post(url, data)
    // },
}

export default userApi