import Router from 'next/router'
const handler = id => Router.replace({
  pathname: '/profil',
  query: {id: id}
})
const Image = props => {
  const me = 'willo'
  console.log(props)
  return (
    <div>
      <img
        style={{maxWidth: '300px', maxHeight: '300px'}}
        src={props.data.url}
        alt={'nothing'}
      />
      <h3 className="title">{props.data.title}</h3>
      <div className="footer">
        <div onClick={handler.bind(undefined, props.data.userId)}>
          <a>
            <img className="profile-picture" src="images.png" alt="nothing" />
          </a>
        </div>
        <div
          className="heart"
          onClick={props.updateLike}
          style={!props.isUserLike ? {display: 'none!important'} : {}}
        />
        <span>{props.data.likes.length}</span>
      </div>
      <style jsx>
        {
          `
        .heart {
            margin: auto;
            background-color: pink;
            height: 15px;
            width: 15px;
            transform: rotate(-45deg);
          }
          .heart:after {
            background-color: pink;
            content: "";
            border-radius: 50%;
            position: absolute;
            width: 15px;
            height: 15px;
            top: 0px;
            left: 7.5px;
          }
          .heart:before {
            content: '';
            background-color: pink;
            border-radius: 50%;
            position: absolute;
            width: 15px;
            height: 15px;
            top: -7.5px;
            left: 0px;
          }
          .heart:hover {
             transform: scale(2.25);

          }
  `
        }
      </style>
    </div>
  )
}

export default Image
