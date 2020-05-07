import React from "react";
import "./Navigation.less";
import PropTypes from "prop-types";
import "./Navigation.less";

class Navigation extends React.Component{
    render() {
        return(
            <div className={"navbar"}>
                {this.props.children}

            </div>
        )
    }
}
Navigation.propTypes = {
};

export default Navigation;