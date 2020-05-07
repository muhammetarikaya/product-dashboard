import React from "react";
import "./Header.less";
import PropTypes from "prop-types";
import {SyncOutlined,} from '@ant-design/icons';

class Header extends React.Component {
    render() {
        return (
            <div className={"header"}>
                <div className={"app-name"}>Product Dashboard {this.props.loading && <span className={"loading"}>
                    <SyncOutlined spin/>
                </span>}</div>

                <div className={"right-side"}>
                    {this.props.rightSide}
                </div>
            </div>
        )
    }
}


Header.propTypes = {
    loading: PropTypes.bool.isRequired,
    rightSide: PropTypes.element
};

export default Header;