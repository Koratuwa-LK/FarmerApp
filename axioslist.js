import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://guides-app-project.firebaseio.com/'
})

export default instance;