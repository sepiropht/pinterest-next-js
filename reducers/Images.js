import {ADD_IMAGE, LOAD_IMAGES, REMOVE_IMAGE} from '../actions/Images'
const initialState = []
function Images (state = initialState, action) {
  switch (action.type) {
    case LOAD_IMAGES:
      return action.payload
    case ADD_IMAGE:
      return [...state, action.payload]
    case 'UPDATE_IMAGE':
      return state.map(
        image => image._id === action.payload._id ? action.payload : image
      )
    case REMOVE_IMAGE:
      return state.filter(img => img !== action.payload.id)
    default:
      return state
  }
}

export default Images
