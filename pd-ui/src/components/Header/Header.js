import React from "react";
import "./Header.less";

class Header extends React.Component {
    render() {
        return (
            <div className={"header"}>
                <div className={"app-name"}>Product Dashboard</div>
            </div>
        )
    }
}

export default Header;