import axios from 'axios'
import queryString from 'query-string'

const getJWT = async () => {
    return localStorage.getItem('jwt')
}

const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    header: {
        'content-type': 'application/json'
    },
    paramsSerializer: params => queryString.stringify(params)
})

axiosClient.interceptors.request.use(async (config) => {
    const token = await getJWT()
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }

    return config
})

axiosClient.interceptors.response.use((response) => { 
    if (response && response.data) { 
        return response.data
    } 
    return response
}, (error) => { 
    throw error
})

export default axiosClient