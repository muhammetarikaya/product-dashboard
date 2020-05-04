import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import App from './containers/root'

const render = Component => {
    ReactDOM.render(
        <AppContainer>
            <Component />
        </AppContainer>,
        document.getElementById('container'),
    )
}

render(App)

// Webpack Hot Module Replacement API
if (module.hot) {
    module.hot.accept('./containers/root', () => { render(App) })
}