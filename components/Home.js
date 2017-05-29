import React, {Component} from 'react'
import Image from './Image'
import {connect} from 'react-redux'
import {CSSGrid, measureItems, makeResponsive, layout} from 'react-stonecutter'
import {updateLike} from '../actions/Images'
import {compose, lifecycle} from 'recompose'
const Grid = makeResponsive(measureItems(CSSGrid, {measureImages: true}), {
  maxWidth: 1920,
  minPadding: 100
})

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
  const ImagesCollection = props.images.map((image, index) => (
    <li key={index}>
      <Image
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
    </li>
  ))
  return (
    <div className="container">
      <Grid
        component="ul"
        columns={4}
        columnWidth={250}
        gutterWidth={5}
        gutterHeight={10}
        layout={layout.pinterest}
        duration={800}
        easing="ease-out"
        springConfig={{stiffness: 170, damping: 26}}
      >
        {ImagesCollection}
      </Grid>
    </div>
  )
}

const Home = connect(mapStateToProps)(home)
export default Home
