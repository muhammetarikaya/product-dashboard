import React from "react";
import {message} from "antd";
import ProductForm from "../../forms/product/product.form";
import PrimaryLayout from "../../components/Layout/PrimaryLayout";
import {AppleFilled} from "@ant-design/icons";
import {bindActionCreators} from "redux";
import {fetchProduct, updateProduct} from "../../api/products.api";
import {connect} from "react-redux";
import history from "../../history";
import ShopOutlined from "@ant-design/icons/lib/icons/ShopOutlined";
import ZoomOutOutlined from "@ant-design/icons/lib/icons/ZoomOutOutlined";

class ProductDetailPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            data: null,
            currentProductId: props.match.params.id
        }
    }

    componentDidMount() {
        this.props.fetchProduct(this.state.currentProductId).then((data) => {
            console.log("asdasdsa")
            this.setState({
                data: data.data
            })
        }).catch((message) => {
            console.log(message);
        })

    }


    onFinished = values => {
        this.props.updateProduct(values).then(data => {
            message.success("Product has been saved successfully");
            history.push("/products");
        }).catch(error => {
            console.log(error)
        })
    };

    onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    render() {
        return (
            <PrimaryLayout pageName={"Product Details"} pageIcon={<ZoomOutOutlined  style={{fontSize: '36px', color: '#08c'}}/>} loading={this.props.loading}>
                {this.state.data &&
                <ProductForm onFinished={this.onFinished} onFinishFailed={this.onFinishFailed} data={this.state.data}/>}
            </PrimaryLayout>
        );
    }
}


function mapStateToProps(state) {
    return {
        auth: state.auth.isLoggedIn,
        loading: state.data.loading
    };
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        updateProduct: updateProduct,
        fetchProduct: fetchProduct
    }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(ProductDetailPage)