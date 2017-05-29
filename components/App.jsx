import React from 'react'
import {Route, Link} from 'react-router-dom'
import Home from './Home'
import {connect} from 'react-redux'
import Profil from './Profil'
import Modal from './Modal/modal'
import {LOAD_IMAGES} from './action/Images'

const mapStateToProps = state => ({user: state.User})
const handler = () => Router.replace({
  pathname: '/'
})
const app = ({user}) => (
  <div>
    <div>
      <h2><span onClick={handler}>Welcome to Pinterest-clone</span></h2>
      <h3
        style={user.logged ? {display: 'none'} : {}}
        onClick={() => {
          window.location = 'http://sepiropht.freeboxos.fr:3000/login'
        }}
      >
        Login
      </h3>
      <h3
        style={!user.logged ? {display: 'none'} : {}}
        onClick={() => {
          window.location = 'http://sepiropht.freeboxos.fr:3000/logout'
        }}
      >
        Logout
      </h3>

      <div style={!user.logged ? {display: 'none'} : {}}>
        <Modal />
      </div>
    </div>
    <Route exact path="/" component={Home} />
    <Route path="/profil/?id" as="/profil/id" component={Profil} />
  </div>
)
const App = connect(mapStateToProps)(app)
export default App
