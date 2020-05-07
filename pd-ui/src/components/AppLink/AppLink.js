import {Link} from "react-router-dom";
import React from "react";
import PropTypes from "prop-types";
import "./AppLink.less";
import {ProfileTwoTone} from "@ant-design/icons";


class AppLink extends React.Component {
    render() {
        return (
            <div className={this.props.withoutStyle ? '' : 'nav-link'}>
                <Link to={this.props.to}>{this.props.icon} {this.props.children}</Link>
            </div>
        );
    }
}
AppLink.propTypes = {
    withoutStyle: PropTypes.bool,
    icon: PropTypes.element
};
export default AppLink;