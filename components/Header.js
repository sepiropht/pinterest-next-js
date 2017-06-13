import Link from 'next/link'
import Router from 'next/router'
import { connect } from 'react-redux'
import Modal from './Modal/modal'

const mapStateToProps = state => ({ user: state.User })
const handler = () => Router.replace({
  pathname: '/'
})
const app = ({ children, user }) => (
  <div className="App">
    <div className="App-header">
      <div className="title">
        <h2 style={{ color: 'red' }}>

          <span onClick={handler}>lipicture</span>
        </h2>
      </div>
      <div className="profil">
        <img
          style={
            user.logged
              ? { display: 'none' }
              : { height: '40px', cursor: 'pointer' }
          }
          src="http://www.clker.com/cliparts/e/3/7/2/11949972101916454416kuser.svg.thumb.png"
          onClick={() => {
            window.location = 'http://sepiropht.freeboxos.fr:3000/login'
          }}
        />
      </div>
      <h3
        style={!user.logged ? { display: 'none' } : {}}
        onClick={() => {
          window.location = 'http://sepiropht.freeboxos.fr:3000/logout'
        }}
      >
        Logout
      </h3>
      <div style={!user.logged ? { display: 'none' } : {}}>
        <Modal />
      </div>

    </div>
    {children}
    <style jsx>
      {
        `

      .App-header {
        background-color: white;
        height: 60px;
        padding: 20px;
        color: white;
        position: fixed;
        top: 0px;
        left:0px;
        padding: 12px 16px;
        width: 100%;
      }
       .App-header  {
         display: flex;
         vertical-align: cneter;
         border-bottom: 1px solid gray;

       }
       .title {
         align-self: flex-start;
         margin-left: 30px;
       }
       .profil {
         margin-left: 1200px
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
