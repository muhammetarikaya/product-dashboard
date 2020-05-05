import React from "react";
import '../../global.less';
import Navigation from "../Navigation/Navigation";
import Header from "../Header/Header";
import {Col, Layout, Row} from "antd";
import Content from "../Content/Content";
import AppLink from "../AppLink/AppLink";

class PrimaryLayout extends React.Component {
    render() {
        return (
            <Layout>
                <Header>
                    Header
                </Header>
                <Row>
                    <Col span={4}>
                        <Navigation>
                            <AppLink to={"/"}>Home</AppLink>
                            <AppLink to={"/products"}>Products</AppLink>
                            <AppLink to={"/login"}>Login ?</AppLink>
                        </Navigation>
                    </Col>
                    <Col span={20}>
                        <Content>
                            {this.props.children}
                        </Content>
                    </Col>
                </Row>

            </Layout>
        );
    }
}

export default PrimaryLayout;