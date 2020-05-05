import React from "react";
import '../../global.less';
import "./LayoutSecondary.less"

class LayoutSecondary extends React.Component {
    render() {
        return (
            <div className={"centered"}>
                {this.props.children}
            </div>
        );
    }
}

export default LayoutSecondary;