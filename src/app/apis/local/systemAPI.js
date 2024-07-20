import axios from 'axios';

const instance = axios.create({
    // baseURL: 'http://ian.firstasia.edu.ph/'
    // baseURL: 'http://172.16.6.152' // office
    //baseURL: 'http://192.168.1.7:1024' // venjo house
    baseURL: 'http://hris-web-api.runasp.net/' // swagger

    // baseURL: 'http://192.168.1.10' // venjo house
    // baseURL: 'http://192.168.254.147' // joyce house
    // baseURL: 'http://192.168.254.133' // joyce house
    // baseURL: 'http://192.168.254.190:1024' // joyce house
    // baseURL: 'localhost' // localhost
    // baseURL: 'http://172.16.6.91' // office
    // baseURL: 'http://172.16.6.152' // office wifi
    // baseURL: 'http://192.168.1.67' // bitSpace wifi
    // baseURL: 'http://172.16.16.132' // bitSpace2 wifi
    //baseURL: 'http://172.16.6.162:1024' // bitSpace3 wifi
    // baseURL: 'http://192.168.0.105' // nanay house
    // baseURL: 'http://192.168.0.101:1024'  // nanay house 2
    // baseURL: 'http://172.16.250.11'
    // baseURL:'http://192.168.1.191/onlineapplication_api'
    // baseURL:'http://172.16.96.38/onlineapplication_api'
    // baseURL:'http://melvs.firstasia.edu.ph/onlineapplication_api'
    // baseURL: 'http://192.168.254.108:1024' // joyce house 2
    // baseURL: 'http://192.168.1.101' // beverly house
    //  baseURL: 'http://192.168.254.153' // Inses House
    //  baseURL: 'http://172.20.10.12' // Venjo Iphone
    // baseURL: 'http://172.16.10.110' // mitsubishi batangas
    // baseURL: 'http://192.168.0.100:1024' // randevoo wifi

})

instance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('AccessToken');
        config.headers.Authorization = token ? `Bearer ${token}` : '';
        return config;
    }
);

export default instance;