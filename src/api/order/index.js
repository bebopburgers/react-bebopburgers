import axios from "axios";
import {API_ROOT} from "../../constants";
import {tokenManager} from "../../helpers";

const orderToApi = async function(order) {
    const accessToken = tokenManager.getToken();
    const url = `${API_ROOT}/orders/add?access_token=${accessToken}&request_timeout=0:0:30`;
    return await axios.post(url, order);
}

export default orderToApi;