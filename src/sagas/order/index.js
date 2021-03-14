import {call, put, select} from 'redux-saga/effects';
import orderToApi from "../../api/order";
import {rejectOrder, resetOrder, resolveOrder} from "../../actions/order";
import {resetCart} from "../../actions/dashboard";

export const getCart = (state) => state.cart
export const getOrganization = (state) => state.organizations.organizations[0];

export const workerOrderData = function* (action) {
    try {
        let cart = yield select(getCart);
        let organization = yield select(getOrganization);

        const order = {
            organization: organization.id,
            customer: {
                id: "",
                name: action.payload.name.value,
                phone: action.payload.phone.value
            },
            coupon: cart.promo,
            order: {
                id: "",
                phone: action.payload.phone.value,
                isSelfService: action.payload.isSelfService,
                comment: `Notes: ${action.payload.notes}. Payment method: ${action.payload.paymentMethod}`,
                address: {
                    street: action.payload.street,
                    home: action.payload.house,
                    housing: action.payload.block,
                    apartment: action.payload.flat,
                    entrance: action.payload.entrance,
                },
                date: `${action.payload.day} ${action.payload.time}`,
                personsCount: "1",
                items: [
                    ...cart.products.map(pr => ({
                        id: pr.products.id,
                        name: pr.products.name,
                        amount: pr.count,
                        modifiers: [
                            ...pr.modifiers.map(m => ({
                                id: m.id,
                                name: m.name,
                                amount: "1",
                                groupId: m.groupId,
                                groupName: ""
                            }))
                        ]
                    })),
                    {
                        id: "",
                        name: "delivery",
                        sum: action.payload.delivery
                    }
                ]
            }
        }

        const result = yield call(orderToApi, order);

        if (result.status === 200) {
            yield put(resolveOrder(result.data));
            yield put(resetCart());
        } else {
            window.alert("ORDER NOT CREATED - http error")
        }
    } catch (err) {
        yield put(rejectOrder());
    }
}