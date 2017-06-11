import React, { Component } from 'react'
import Image from './Image'
import { connect } from 'react-redux'
import { updateLike } from '../actions/Images'
import { compose, lifecycle } from 'recompose'
import { stylesheet, classNames } from './home.css'

const mapStateToProps = state => ({
  images: state.Images,
  user: state.User
})
const withConfig = lifecycle({
  getInitialState () {
    return {}
  },
  componentWillMount () {
    console.log('yeah')
  }
})
const home = props => {
  console.log(props.images, 'IMAGGGGE')
  const ImagesCollection = props.images
    .filter(image => image.url.indexOf('http') > -1)
    .map((image, index) => (
      <Image
        key={index}
        data={image}
        isUserLike={image.likes.some(id => id === props.user.user_id)}
        updateLike={() => {
          if (!props.user.user_id) return
          props.dispatch(
            updateLike({
              imageId: image._id,
              userId: props.user.user_id
            })
          )
        }}
      />
    ))
  return (
    <div>
      <div className={classNames.columns}>
        <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
        {ImagesCollection}
        <figure>
          <img
            src="//s3-us-west-2.amazonaws.com/s.cdpn.io/4273/cinderella.jpg"
          />
          <figcaption>
            Cinderella wearing European fashion of the mid-1860’s
          </figcaption>
        </figure>

        <figure>
          <img src="//s3-us-west-2.amazonaws.com/s.cdpn.io/4273/rapunzel.jpg" />
          <figcaption>Rapunzel, clothed in 1820’s period fashion</figcaption>
        </figure>

        <figure>
          <img src="//s3-us-west-2.amazonaws.com/s.cdpn.io/4273/belle.jpg" />
          <figcaption>Belle, based on 1770’s French court fashion</figcaption>
        </figure>

        <figure>
          <img src="//s3-us-west-2.amazonaws.com/s.cdpn.io/4273/mulan_2.jpg" />
          <figcaption>Mulan, based on the Ming Dynasty period</figcaption>
        </figure>

        <figure>
          <img
            src="//s3-us-west-2.amazonaws.com/s.cdpn.io/4273/sleeping-beauty.jpg"
          />
          <figcaption>
            Sleeping Beauty, based on European fashions in 1485
          </figcaption>
        </figure>

        <figure>
          <img
            src="//s3-us-west-2.amazonaws.com/s.cdpn.io/4273/pocahontas_2.jpg"
          />
          <figcaption>
            Pocahontas based on 17th century Powhatan costume
          </figcaption>
        </figure>

        <figure>
          <img
            src="//s3-us-west-2.amazonaws.com/s.cdpn.io/4273/snow-white.jpg"
          />
          <figcaption>
            Snow White, based on 16th century German fashion
          </figcaption>
        </figure>

        <figure>
          <img src="//s3-us-west-2.amazonaws.com/s.cdpn.io/4273/ariel.jpg" />
          <figcaption>Ariel wearing an evening gown of the 1890’s</figcaption>
        </figure>

        <figure>
          <img src="//s3-us-west-2.amazonaws.com/s.cdpn.io/4273/tiana.jpg" />
          <figcaption>
            Tiana wearing the <i>robe de style</i> of the 1920’s
          </figcaption>
        </figure>
        <small>
          Art © <a href="http://sepiropht.freeboxos.fr/cms_3wa/">sepiropht</a>
        </small>
      </div>
    </div>
  )
}

const Home = connect(mapStateToProps)(home)
export default Home
