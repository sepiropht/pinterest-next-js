import Header from '../components/Header'
import React, { Component } from 'react'
import withRedux from 'next-redux-wrapper'
import Home from '../components/Home'
import { initStore } from '../store'
import { fetchImages } from '../actions/Images'

class App extends Component {
  static getInitialProps (
    { store, isServer, pathname, query, res, req, jsonPageRes }
  ) {
    if (res && res.token) {
      store.dispatch({ type: 'LOGGED_IN', payload: res.resbis })
      console.log('logge success !!!!')
      console.log(store)
      return { user: res.user, token: res.token }
    }
  }
  componentDidMount () {
    this.props.dispatch(fetchImages())
    console.log('Load')
    console.log(this.props)
    if (window && this.props.token) {
      window.localStorage.setItem('jwt', this.props.token)
      window.localStorage.setItem('user', JSON.stringify(this.props.user))
      this.props.dispatch({ type: 'LOGGED_IN', payload: this.props.user })
    }
    if (
      window &&
      window.localStorage.getItem('jwt') &&
      window.localStorage.getItem('user')
    ) {
      this.props.dispatch({
        type: 'LOGGED_IN',
        payload: JSON.parse(window.localStorage.getItem('user'))
      })
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
