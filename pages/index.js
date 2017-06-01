import Header from '../components/Header'
import React, {Component} from 'react'
import withRedux from 'next-redux-wrapper'
import Home from '../components/Home'
import {initStore} from '../store'
import {fetchImages} from '../actions/Images'

class App extends Component {
  static getInitialProps (
    {store, isServer, pathname, query, res, req, jsonPageRes}
  ) {
    if (res && res.token) {
      store.dispatch({type: 'LOGGED_IN', payload: res.resbis})
      console.log('logge success !!!!')
      console.log(store)
      return {user: res.resbis, token: res.token}
    }
  }
  componentWillMount () {
    this.props.dispatch(fetchImages())
    console.log(this.props)
    if (this.props.user) {
      this.props.dispatch({type: 'LOGGED_IN', payload: this.props.user[0]})
    }
  }
  render () {
    return (
      <Header>
        <Home />
      </Header>
    )
  }
}
export default withRedux(initStore)(App)
