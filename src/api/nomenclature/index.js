import {API_ROOT} from "../../constants";
import axios from "axios";
import {tokenManager} from "../../helpers";

const getNomenclatureFromApi = async function(id) {
    const accessToken = tokenManager.getToken();
    const url = `${API_ROOT}/nomenclature/${id}?access_token=${accessToken}&revision=13985090`;
    return await axios.get(url);
}

export default getNomenclatureFromApi;