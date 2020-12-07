import axios from 'axios';
import store from '../store';
import {
    authLogout
} from '../store/actions/auth';

axios.interceptors.response.use(
    response => response,
    (error) => {
        if(error.response) {
            if (error.response.status === 401) {
                store.dispatch(authLogout());
            }
        }
        return Promise.reject(error);
    },
);

export default axios;