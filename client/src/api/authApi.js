import axiosClient from './axiosClient'

const url = process.env.API_URL
const authApi = {
    login: params => {
        return axiosClient.post(url, { params })
    }
}

export default authApi