import React, { Component } from 'react'
import { Provider } from 'react-redux'
import store from './redux/store'
import Header from './components/header/header'
import Footer from './components/footer/footer'
import Main from './components/main/main'
class App extends Component {
    render () {
        return (
					<Provider store={store}>
            <div className="app">
							<Header />
							<Main />
							<Footer />
            </div>
					</Provider>
        )
    }
}

export default App