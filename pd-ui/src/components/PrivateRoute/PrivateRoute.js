import React from 'react'
import {Redirect, Route} from 'react-router-dom'


class PrivateRoute extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const isLoggedIn = sessionStorage.getItem("token");
        const {
            Component,
            ...rest
        } = this.props;
        if ( isLoggedIn != null){
            return <Route {...rest} render={props => <Component {...props}/>}/>
        }else{
            return <Redirect to="login"/>
        }
    }
}


export default PrivateRoute