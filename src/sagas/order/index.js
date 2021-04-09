import {call, put, select} from 'redux-saga/effects';
import orderToApi from "../../api/order";
import {rejectOrder, resetOrder, resolveOrder} from "../../actions/order";
import {resetCart} from "../../actions/dashboard";

export const getCart = (state) => state.cart
export const getOrganization = (state) => state.organizations.organizations[0];

const paymentMethods = [ // bank , cash
    {
        id: "09322f46-578a-d210-add7-eec222a08871",
        code: "CASH",
        name: "Наличные",
        comment: "",
        combinable: true,
        externalRevision: 1289503,
        applicableMarketingCampaigns: null,
        deleted: false
    },
    {
        id: "9cd5d67a-89b4-ab69-1365-7b8c51865a90",
        code: "CARD",
        name: "Банковская карта",
        comment: "",
        combinable: true,
        externalRevision: 1289503,
        applicableMarketingCampaigns: null,
        deleted: false
    }
];

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
                    city: action.payload.address.city,
                    street: action.payload.address.street,
                    home: action.payload.address.home,
                    streetClassifierId: action.payload.address.streetClassifierId
                },
                date: new Date(),
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
                    }))
                ],
                paymentItems: [
                    {
                        sum: action.payload.delivery,
                        isProcessedExternally: true,
                        paymentType: action.payload.paymentMethod === "cash" ? paymentMethods[0] : paymentMethods[1]
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