import fetch from "isomorphic-fetch";
export const ADD_IMAGE = "ADD_IMAGE";
export const LOAD_IMAGES = "LOAD_IMAGES";
export const REMOVE_IMAGE = "REMOVE_IMAGE";

export function loadImages(collectionImages) {
  return {
    payload: collectionImages,
    type: LOAD_IMAGES
  };
}
function updateImage(image) {
  return {
    payload: image,
    type: "UPDATE_IMAGE"
  };
}
export function addImage(image) {
  return {
    payload: image,
    type: ADD_IMAGE
  };
}

export function removeImage(image) {
  return {
    payload: image,
    type: REMOVE_IMAGE
  };
}

export const RECEIVE_POSTS = "RECEIVE_POSTS";
function receivePosts(subreddit, json) {
  return {
    type: RECEIVE_POSTS,
    subreddit,
    posts: json.data.children.map(child => child.data),
    receivedAt: Date.now()
  };
}
export const updateLike = payload => {
  console.log("pAYLOAD update like", payload);
  if (!payload || !payload.userId) return;
  let str = [];
  let form = payload;
  Object.keys(form).forEach(key => {
    str.push(encodeURIComponent(key) + "=" + encodeURIComponent(form[key]));
  });
  const body = str.join("&");
  const req = {
    method: "post",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body
  };
  console.log("req", req);
  return dispatch =>
    fetch("/updateLike", req)
      .then(response => response.json())
      .then(json => dispatch(updateImage(json)));
};
export const addRemoteImage = imageInfo => {
  console.log(imageInfo, "from+user");
  let str = [];
  let form = imageInfo;
  Object.keys(form).forEach(key => {
    str.push(encodeURIComponent(key) + "=" + encodeURIComponent(form[key]));
  });
  const body = str.join("&");
  const req = {
    method: "post",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body
  };
  return dispatch =>
    fetch("/image", req)
      .then(response => response.json())
      .then(json => dispatch(addImage(json)));
};
export function fetchImages(merdier) {
  return function(dispatch) {
    console.log("waht the fuck happen");
    return fetch("/images").then(response => response.json()).then(json => {
      console.log("JSONNN", json);
      return dispatch(loadImages(json));
    });
  };
}
