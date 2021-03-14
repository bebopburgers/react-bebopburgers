import {API_ROOT} from "../../constants";
import axios from "axios";
import {tokenManager} from "../../helpers";

const getDeliveryPriceFromApi = async function(obj) {
    // const accessToken = tokenManager.getToken();
    const url = `https://test.rocksteady.pizza/api/delivery/price?address=${obj.value}&price=${obj.price}`;
    return await axios.get(url);
}

export default getDeliveryPriceFromApi;