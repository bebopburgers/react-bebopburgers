import {call, put} from 'redux-saga/effects';
import getOrganizationsFromApi from '../../api/organization/index';
import getNomenclatureFromApi from '../../api/nomenclature/index';
import {
    putNomenclature,
    putOrganizations, putToCart,
    rejectNomenclature,
    rejectOrganizations, removeFromCart
} from "../../actions/dashboard";
import { v4 as uuidv4 } from 'uuid';
import { BEBOPBURGERS_ID } from '../../constants';

export const workerDashboardData = function* () {
    try {
        const result = yield call(getOrganizationsFromApi);
        yield put(putOrganizations(result.data));

        const nomenclature = yield call(getNomenclatureFromApi, result.data[0].id);

        const sortDate = (dates) => {
            return dates.sort((a,b) => new Date(b.uploadDate) - new Date(a.uploadDate))[0];
        };

        const getModifiers = (arr) => {
            return [...arr.groupModifiers.map(x => {
                const tempId = nomenclature.data.products.filter(f => f.groupId === x.modifierId)[0].groupId;
                return {
                    category: nomenclature.data.groups.filter(x => x.id === tempId)[0],
                    additionals: [...nomenclature.data.products.filter(f => f.groupId === x.modifierId)]
                }
            })]
        }

        const grouped = [...nomenclature.data.groups.map(opt => {
            if (opt.parentGroup === null) {
                return {
                    ...opt,
                    isActive: false,
                    products: [
                        ...nomenclature.data.products
                            .filter(pr => pr.parentGroup === opt.id)
                            .map(it => ({
                                ...it,
                                image: sortDate(it.images),
                                groupedModifiersMapped: getModifiers(it)
                            }))
                    ],
                    subgroups: [
                        ...nomenclature.data.groups.map(sub => {
                            if (sub.parentGroup !== null && sub.parentGroup === opt.id) {
                                return {
                                    ...sub,
                                    products: [
                                        ...nomenclature.data.products
                                            .filter(it => it.parentGroup === sub.id)
                                            .map(it => ({
                                                ...it,
                                                image: sortDate(it.images),
                                                groupedModifiersMapped: getModifiers(it)
                                            }))
                                    ]
                                }
                            }
                        }).filter(gr => gr)
                    ]
                }
            }
        }).filter(gr => gr)];

        const payload = {
            groups: [...grouped.filter(x => x.id === BEBOPBURGERS_ID)],
            revision: nomenclature.data.revision,
            uploadDate: nomenclature.data.uploadDate,
            productsList: nomenclature.data.products
        }

        yield put(putNomenclature(payload));

    } catch (err) {
        yield put(rejectOrganizations());
        yield put(rejectNomenclature());
    }
}

export const workerNomenclatureData = function* (action) {
    try {
        const result = yield call(getNomenclatureFromApi, action.payload);
        yield put(putNomenclature(result.data))

    } catch (err) {
        yield put(rejectNomenclature())
    }
}

export const workerCartSetData = function* (action) {
    try {
        action.payload.count = 1;
        action.payload.uuid = uuidv4();
        yield put(putToCart(action.payload))
    } catch (err) {

    }
}

export const workerCartRemoveData = function* (action) {
    try {
        yield put(removeFromCart(action.payload))
    } catch (err) {

    }
}