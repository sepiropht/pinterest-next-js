import Link from 'next/link'
import Router from 'next/router'
import {connect} from 'react-redux'
import Modal from './Modal/modal'

const mapStateToProps = state => ({user: state.User})
const handler = () => Router.replace({
  pathname: '/'
})
const app = ({children, user}) => (
  <div className="App">
    <div className="App-header">
      <h2 style={{color: 'gold'}}>

        <span onClick={handler}>Welcome to Pinterest-clone</span>
      </h2>
      <h3
        style={user.logged ? {display: 'none'} : {color: 'yellow'}}
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
    {children}
    <style jsx>
      {
        `
      .App {
        text-align: center;
      }

      .App-logo {
        animation: App-logo-spin infinite 20s linear;
        height: 80px;
      }

      .App-header {
        background-color: #222;
        height: 150px;
        padding: 20px;
        color: white;
      }

      .App-intro {
        font-size: large;
      }
      .container {
        margin: auto;
        text-align: center;
        box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.3), 0px 0px 20px rgba(128, 128, 128, 0.1) inset;
        background-color: white;
      }
      li {
        display: inline-flex;
        flex-direction: column;
        flex-flow: column wrap;

      }
      .footer {
        background-color: #E8E8E8;
        width: 90%;
        margin: auto;
      }
      .picture {
        margin: 10px;
        max-width: 30px;
        max-height: 30px;

      }

      .profile-picture {
        width: 30px;
        height: 30px;
        cursor: pointer;
        display: inline-block;
      }
      .star {
        width: 30px;
        height: 30px;
        cursor: pointer;
        display: inline-block;


      }

`
      }
    </style>
  </div>
)
const App = connect(mapStateToProps)(app)
export default App
