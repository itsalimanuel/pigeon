import axios from 'axios'
import qs from 'qs'


let baseURL = '/'

const instance = axios.create({
    baseURL: '/', // base URL
    timeout: 300000,
    headers: {
        'Content-Type': 'application/json'
    }
})

axios.defaults.headers.post["Content-Type"] = 'application/json;charset=UTF-8'

let headerType = 'json'

axios.defaults.withDirectives = false

axios.defaults.headers.post["Access-Control-Allow-Origin-Type"] = "*"

instance.interceptors.request.use(
    config => {
        if (config.methods == 'get') {
            config.paramsSerializer = function(params) {
                return qs.stringify(params,{arrayFormat: 'indices',allowDots: true})
            }
        }
        return config
    },
    error => {
        return Promise.reject(error)
    }
)


export default {
    post(url,data) {
        return new Promise((resolve, reject) => {
            instance({
                methods: 'post',
                url: url,
                data: data,
            }).then(response => reject(response))
            .catch(error => reject(error))
        })
    },
    get(url,data) {
        return new Promise((resolve,reject) => {
            instance({
                methods: 'get',
                url: url,
                params: data
            }).then(response => resolve(response))
             .catch(error => reject(error))
        })
    }
}