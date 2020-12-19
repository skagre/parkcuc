import axiosClient from './axiosClient'


const url = process.env.REACT_APP_API_URL
const authApi = {
    login: ({ params }) => {
        const data = {
            query: 
            `mutation login($emailOrSomething: String!, $password: String!) {
                login(emailOrSomething: $emailOrSomething, password: $password) {
                    user_id
                    avatar
                    token
                }
            }`,
            variables: {
                emailOrSomething: params.emailOrSomething,
                password: params.password
            }
        }
        return axiosClient.post(url, data)
    },
    register: ({ params }) => {
        const data = {
            query: 
            `mutation register($name: String!, $email: String!, $password: String!) {
                register(name: $name, email: $email, password: $password) {
                    _id
                    name
                    email
                }
            }`,
            variables: {
                name: params.name,
                email: params.email,
                password: params.password
            }
        }
        return axiosClient.post(url, data)
    }
}

export default authApi