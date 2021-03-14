import axios from "axios";
import {API_ROOT} from "../../constants";
import {tokenManager} from "../../helpers";

const orderToApi = async function(order) {
    try {
        const accessToken = tokenManager.getToken();
        const url = `https://test.rocksteady.pizza/api/orders/add?access_token=${accessToken}&request_timeout=0:0:30`;
        return await axios.post(url, order);
    } catch (err) {
        return err;
    }
}

export default orderToApi;