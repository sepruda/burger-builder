import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-myburger-7beae.firebaseio.com/' 
});

export default instance;