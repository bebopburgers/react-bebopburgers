import {call} from 'redux-saga/effects';
import getAccessToken from '../../api/root/index';

const workerAccessToken = function* () {
    try {
        yield call(getAccessToken);
    } catch (err) { }
}

export default workerAccessToken;