import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import BrowserRouter from 'react-router-dom/BrowserRouter'
// import routes from './modules/routing/routes'

// const router = new UniversalRouter(routes, {})

// function render(location) {
// 	router.resolve(location.pathname).then(route => {
// 		document.title = route.title
// 		ReactDOM.render(route.component, document.getElementById('app'))
// 	})
// }

// render(history.location)
// history.listen(location => render.location)

ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
