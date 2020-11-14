import {API_ROOT} from "../../constants";
import axios from "axios";
import {tokenManager} from "../../helpers";

const getOrganizationsFromApi = async function() {
    const accessToken = tokenManager.getToken();
    const url = `${API_ROOT}/organization/list?access_token=${accessToken}`;
    return await axios.get(url);
}

export default getOrganizationsFromApi;