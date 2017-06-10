import Router from 'next/router'
import Head from 'next/head'
import { stylesheet, classNames } from './image.css'
const handler = id => Router.replace({
  pathname: '/profil',
  query: { id: id }
})
const Image = props => {
  console.log(props)
  return (
    <figure>
      <figcaption>
        <img src={props.data.url} alt={'nothing'} />
        <h3 className={classNames.title}>{props.data.title}</h3>
        <div className={classNames.footer}>
          <div onClick={handler.bind(undefined, props.data.userId)}>
            <a>
              <img
                className={classNames.profilePicture}
                src="images.png"
                alt="nothing"
              />
            </a>
          </div>
          <div
            className={classNames.heart}
            onClick={props.updateLike}
            style={!props.isUserLike ? { display: 'none!important' } : {}}
          />
          <span>{props.data.likes.length}</span>
        </div>
      </figcaption>
      <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
    </figure>
  )
}

export default Image
