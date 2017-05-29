import React from 'react'
import Router from 'next/router'
import {connect} from 'react-redux'

class Profil extends React.Component {
  static getInitialProps ({query: {id}}) {
    console.log(id, 'Profil')
    return {id}
  }
  componentWillMount () {}
  render () {
    console.log('Profil', this.props)
    console.log('Router', Router)
    const images = this.props.images
      ? this.props.images
          .filter(img => img.userId === Router.query.id)
          .map((img, i) => <li key={i}>{img.url}</li>)
      : []
    console.log('Images', images)
    return (
      <div className="container">
        <h1>Profil de {Router.query.id}</h1>
        <ul>{images}</ul>
      </div>
    )
  }
}
const mapStateToProps = state => ({images: state.Images})
export default connect(mapStateToProps)(Profil)
