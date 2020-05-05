import {Link} from "react-router-dom";
import React from "react";


class AppLink extends React.Component {
    render() {
        return (
            <div>
                <Link to={this.props.to}>{this.props.children}</Link>
            </div>
        );
    }
}

export default AppLink;