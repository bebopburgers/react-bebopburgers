import axios from 'axios';
// import {getAccessToken} from '../actions/root/index';
import {API_CLIENT_ID, API_CLIENT_SECRET, API_ROOT} from "../constants";

const accessToken = 'accessToken';

export const tokenManager = {
    getToken: () => {
        return localStorage.getItem(accessToken);
    },
    setToken: (token) => {
        localStorage.setItem(accessToken, token);
    },
    removeToken: () => {
        localStorage.removeItem(accessToken);
    }
}

const refreshToken = async (exUrl, exToken, method, data) => {
    const url = `${API_ROOT}/auth/access_token?user_id=${API_CLIENT_ID}&user_secret=${API_CLIENT_SECRET}`;
    const response = await fetch(url);
    const newToken = await response.json();
    tokenManager.setToken(newToken);
    axios({
        method: method,
        url: exUrl.replace(exToken, newToken),
        data: data
    })
}

axios.interceptors.response.use(
    response => response,
    async error => {
        if (error.response.status === 401) {
            let exUrl = error.response.config.url,
                newUrl = new URL(exUrl),
                exToken = newUrl.searchParams.get('access_token');

            // const refreshUrl = `${API_ROOT}/auth/access_token?user_id=${API_CLIENT_ID}&user_secret=${API_CLIENT_SECRET}`;
            // const response = await fetch(refreshUrl);
            // const newToken = await response.json();
            // tokenManager.setToken(newToken);
            // exUrl = exUrl.replace(exToken, newToken);
            //
            // error.config.url = exUrl;
            // await axios.request(error.config);

            return new Promise(async (resolve, _) => {
                const refreshUrl = `${API_ROOT}/auth/access_token?user_id=${API_CLIENT_ID}&user_secret=${API_CLIENT_SECRET}`,
                      response = await fetch(refreshUrl),
                      newToken = await response.json();

                tokenManager.setToken(newToken);

                error.config.__isRetryRequest = true
                error.config.url = exUrl = exUrl.replace(exToken, newToken);
                resolve(axios(error.config))
            });
        }
        return Promise.reject(error);
    }
)

export const deepEqual = (x, y) => {
    if (x === y) {
        return true;
    }
    else if ((typeof x == "object" && x != null) && (typeof y == "object" && y != null)) {
        if (Object.keys(x).length !== Object.keys(y).length)
            return false;

        for (let prop in x) {
            if (y.hasOwnProperty(prop))
            {
                if (! deepEqual(x[prop], y[prop]))
                    return false;
            }
            else
                return false;
        }

        return true;
    }
    else
        return false;
}