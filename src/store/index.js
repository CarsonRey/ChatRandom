import {createStore} from 'redux';
export * from './actions.js'

const initialState = {
  users: {'hello': "world"}
}


const reducer = (state = initialState, action) => {
  switch( action.type) {
    case 'UPDATE_USER_ROOM': {
      let updatedUsers = Object.assign({}, state.users, {[action.payload.user]: `${action.payload.room}`})

      return {...state, users: updatedUsers}
    }
    default:
    return state
  }
}

const store = createStore(reducer)
export default store;
