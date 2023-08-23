import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './app/store'
import App from './app/App'
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

import './index.css'
import './components/style.css'

const container = document.getElementById('root')
const root = createRoot(container)


root.render(
    // <React.StrictMode>
    <Provider store={store}>
        <App />
    </Provider>
    // </React.StrictMode>
)

serviceWorkerRegistration.register();