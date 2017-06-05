import fetch from 'isomorphic-fetch'
import superagentPromise from 'superagent-promise'
import _superagent from 'superagent'
export const ADD_IMAGE = 'ADD_IMAGE'
export const LOAD_IMAGES = 'LOAD_IMAGES'
export const REMOVE_IMAGE = 'REMOVE_IMAGE'
const url = 'http://sepiropht.freeboxos.fr:3000'
const superagent = superagentPromise(_superagent, global.Promise)
export function loadImages (collectionImages) {
  return {
    payload: collectionImages,
    type: LOAD_IMAGES
  }
}
function updateImage (image) {
  return {
    payload: image,
    type: 'UPDATE_IMAGE'
  }
}
export function addImage (image) {
  return {
    payload: image,
    type: ADD_IMAGE
  }
}

export function removeImage (image) {
  return {
    payload: image,
    type: REMOVE_IMAGE
  }
}

export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const updateLike = payload => {
  console.log('pAYLOAD update like', payload)
  const tokenPlugin = req => {
    if (window.localStorage.getItem('jwt')) {
      req.set('authorization', `Bearer ${window.localStorage.getItem('jwt')}`)
    }
  }
  return dispatch =>
    superagent
      .post(url + '/updateLike', payload)
      .use(tokenPlugin)
      .then(res => dispatch(updateImage(res.body)))
}
export const addRemoteImage = imageInfo => {
  console.log(imageInfo, 'from+user')
  let str = []
  let form = imageInfo
  Object.keys(form).forEach(key => {
    str.push(encodeURIComponent(key) + '=' + encodeURIComponent(form[key]))
  })
  const body = str.join('&')
  const req = {
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body
  }
  return dispatch =>
    fetch('/api/image', req)
      .then(response => response.json())
      .then(json => dispatch(addImage(json)))
}
export function fetchImages (merdier) {
  return function (dispatch) {
    console.log('waht the fuck happen')
    return fetch('/api/image').then(response => response.json()).then(json => {
      console.log('JSONNN', json)
      return dispatch(loadImages(json))
    })
  }
}
