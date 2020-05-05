import React from "react";

class Navigation extends React.Component{
    render() {
        return(
            <div>
                {this.props.children}
            </div>
        )
    }
}

export default Navigation;