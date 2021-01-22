import axios from "axios";
import {API_ROOT, API_CLIENT_ID, API_CLIENT_SECRET} from '../../constants/index';
import {tokenManager} from '../../helpers/index';

const getAccessToken = async function() {
    if (tokenManager.getToken()) {
        return;
    }

    const url = `${API_ROOT}/auth/access_token?user_id=${API_CLIENT_ID}&user_secret=${API_CLIENT_SECRET}`;

    const response = await axios.get(url);

    if (response.status === 200) {
        tokenManager.setToken(response.data);
    }
}

export default getAccessToken;