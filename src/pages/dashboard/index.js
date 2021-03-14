import React, {Component, lazy, Suspense} from 'react';
import './index.css';
import {connect} from 'react-redux';
import {
    getOrganizations,
    getNomenclature,
    addToCart,
    removeFromCart,
    incrementProductCount,
    addToCartForSnapshot
} from '../../actions/dashboard';
import LoaderWrapper from "../../components/spinner";
import {deepEqual} from "../../helpers";
import {Footer} from "../../components/footer";

const Category = lazy(() => import('../../components/category'));
const TabPanel = lazy(() => import('../../components/tab-panel'));
const ModalWrapper = lazy(() => import('../../components/modal'));
const Header = lazy(() => import('../../components/header'));

class Dashboard extends Component {
    state = {
        tab: 1,
        modalIsOpen: false,
        currentProduct: undefined,
        currentProductModifiers: [],
        currentProductTotalPrice: 0,
    }

    componentDidMount() {
        this.getDashboardData();

        this.setDataFromSnapshot();
    }

    setDataFromSnapshot = () => {
        const { addToCartForSnapshot, incrementProductCount } = this.props;

        const cartSnapshot = JSON.parse(window.localStorage.getItem("cart-snapshot"));

        if (cartSnapshot == null) {
            return;
        }

        if (cartSnapshot.length < 1) {
            return;
        }

        for (let i = 0; i < cartSnapshot.length; i++) {

            const newItem = {
                price: cartSnapshot[i].price,
                products: cartSnapshot[i].products,
                modifiers: cartSnapshot[i].modifiers,
                count: cartSnapshot[i].count,
                uuid: cartSnapshot[i].uuid
            };

            addToCartForSnapshot(newItem);
        }
    }

    getDashboardData = () => {
        const { getOrganizations } = this.props;
        getOrganizations();
    }

    changeTab = (e, value) => {
        this.setState({ tab: value })
    }

    openModal = (e, product) => {

        if (e.target.type === "submit") {
            return;
        }

        this.setState({
            currentProduct: product,
            modalIsOpen: true,
            currentProductTotalPrice: product.price
        })
    }

    closeModal = () => {
        this.setState({
            currentProduct: undefined,
            modalIsOpen: false,
            currentProductModifiers: [],
            currentProductTotalPrice: 0
        })
    }

    setModifier = (modifier, e) => {
        const { currentProductModifiers, currentProductTotalPrice } = this.state;

        if (e.target.checked) {
            this.setState({
                currentProductModifiers: [...currentProductModifiers, modifier],
                currentProductTotalPrice: currentProductTotalPrice + modifier.price
            })
        } else {
            this.setState({
                currentProductModifiers: [...currentProductModifiers.filter(x => x.id !== modifier.id)],
                currentProductTotalPrice: currentProductTotalPrice - modifier.price
            })
        }
    }

    addToCart = () => {
        const { addToCart, cart, incrementProductCount } = this.props;
        const { currentProductModifiers, currentProduct, currentProductTotalPrice } = this.state;

        const newItem = {
            price: currentProductTotalPrice,
            products: currentProduct,
            modifiers: currentProductModifiers,
        };

        let isExist = null;


        cart.map(i => {
            if (JSON.stringify(i.products) == JSON.stringify(newItem.products) && JSON.stringify(i.modifiers) == JSON.stringify(newItem.modifiers)) {
                isExist = i;
            }
        });

        if (isExist == null) {
            addToCart(newItem);

        } else {
            incrementProductCount(isExist);
        }

        this.closeModal();
    }

    addToCartWithoutModal = (product) => {
        const { addToCart, cart, incrementProductCount } = this.props;
        const { currentProductModifiers, currentProduct, currentProductTotalPrice } = this.state;

        const newItem = {
            price: product.price,
            products: product,
            modifiers: [],
            count: product.count,
            uuid: product.uuid
        };

        let isExist = null;

        cart.map(i => {
            if (JSON.stringify(i.products) == JSON.stringify(newItem.products) && JSON.stringify(i.modifiers) == JSON.stringify(newItem.modifiers)) {
                isExist = i;
            }
        });

        if (isExist == null) {
            addToCart(newItem);
        } else {
            incrementProductCount(isExist);
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        window.localStorage.setItem("cart-snapshot", JSON.stringify(nextProps.cart))
    }

    componentWillUnmount() {
        window.localStorage.removeItem("cart-snapshot")
    }

    removeFromCart = (product) => {
        const { removeFromCart } = this.props;

        removeFromCart(product);
    }

    render() {
        const { groups } = this.props.nomenclature;
        const { logo, phone } = this.props.dashboard.organizations.length && this.props.dashboard.organizations[0];
        const { isLoading, cart } = this.props;
        const {
            tab,
            modalIsOpen,
            currentProduct,
            currentProductTotalPrice
        } = this.state;

        if (isLoading) {
            return <LoaderWrapper/>
        }

        return (
            <Suspense fallback={<LoaderWrapper/>}>
                <div className="dashboard">
                    <Header
                        logo={logo}
                        tel={phone}
                        cart={cart}
                        onRemove={this.removeFromCart}
                    />
                    <ModalWrapper
                        modalIsOpen={modalIsOpen}
                        currentProduct={currentProduct}
                        totalPrice={currentProductTotalPrice}
                        onClose={this.closeModal}
                        onSetModifier={this.setModifier}
                        onSetToCart={this.addToCart}
                    />
                    

                        <div className="tab-panels">
                            {groups.map((grp, idx) =>
                                <TabPanel key={`${grp.id}${grp.name}`} value={tab} index={idx + 1}>
                                    <Category
                                        title={grp.name}
                                        categories={grp.subgroups}
                                        onOpenModal={this.openModal}
                                        onSelect={this.addToCartWithoutModal}/>
                                </TabPanel>
                            )}
                        </div>
                    <Footer/>
                </div>
            </Suspense>
        )
    }
}

const mapStateToProps = state => {
    return {
        dashboard: state.organizations,
        isLoading: state.organizations.isLoading || state.nomenclature.isLoading || state.order.isLoading,
        nomenclature: state.nomenclature.nomenclature,
        cart: state.cart.products,
    }
}

const mapDispatchToProps = {
    getOrganizations,
    getNomenclature,
    addToCart,
    removeFromCart,
    incrementProductCount,
    addToCartForSnapshot
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);