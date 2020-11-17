import React, {Component} from 'react';
import './index.css';
import {connect} from 'react-redux';
import {
    getOrganizations,
    getNomenclature,
    addToCart,
    prepareToRemoveFromCart, incrementProductCount
} from '../../actions/dashboard';
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import AppBar from "@material-ui/core/AppBar";
import Category from "../../components/category";
import { TabPanel } from "../../components/tab-panel";
import ModalWrapper from "../../components/modal";
import Header from "../../components/header";
import LoaderWrapper from "../../components/spinner";
import {deepEqual} from "../../helpers";
import {Footer} from "../../components/footer";

class Dashboard extends Component {
    state = {
        tab: 4,
        modalIsOpen: false,
        currentProduct: undefined,
        currentProductModifiers: [],
        currentProductTotalPrice: 0,
    }

    componentDidMount() {
        this.getDashboardData();
    }

    getDashboardData = () => {
        const { getOrganizations } = this.props;
        getOrganizations();
    }

    changeTab = (e, value) => {
        this.setState({ tab: value })
    }

    openModal = (product) => {
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
            if (deepEqual(i.products, newItem.products) && deepEqual(i.modifiers, newItem.modifiers)) {
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

    removeFromCart = (product) => {
        const { prepareToRemoveFromCart } = this.props;
        prepareToRemoveFromCart(product);
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
                <AppBar className="disable-org">
                    <Tabs
                        variant="scrollable"
                        scrollButtons="auto"
                        value={tab}
                        aria-label="simple tabs example"
                        onChange={this.changeTab}
                    >
                        { groups.map((grp, idx) => <Tab key={`${grp.name}${grp.id}`} label={grp.name} value={idx + 1}/>) }
                    </Tabs>
                </AppBar>
                <div className="tab-panels">
                    {groups.map((grp, idx) =>
                         <TabPanel key={`${grp.id}${grp.name}`} value={tab} index={idx + 1}>
                             <Category title={grp.name} categories={grp.subgroups} onSelect={this.openModal}/>
                         </TabPanel>
                    )}
                </div>
                <Footer/>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        dashboard: state.organizations,
        isLoading: state.organizations.isLoading || state.nomenclature.isLoading || state.order.isLoading,
        nomenclature: state.nomenclature.nomenclature,
        cart: state.cart.products
    }
}

const mapDispatchToProps = { getOrganizations, getNomenclature, addToCart, prepareToRemoveFromCart, incrementProductCount }

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);