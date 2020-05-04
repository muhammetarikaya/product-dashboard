import React from 'react'
import {Route, Switch} from 'react-router'

import Homepage from './containers/login/LoginPage'

export default class Routes extends React.Component {
    render() {
        return (
            <Switch>
                <Route exact path="/" component={Homepage}/>
            </Switch>
        )
    }
}
