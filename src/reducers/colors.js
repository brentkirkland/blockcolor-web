import {
  Map,
  fromJS
} from 'immutable'

const initial_state = {
  colors: {},
  data: Map(),
  color: 0
}

const colors = (state = initial_state, action) => {
  switch (action.type) {
    case 'INITIATE_COLOR':
      return { ...state,
        color: action.color
      };
    case 'ADD_COLOR_ARRAY':
      if (!(action.color in state.colors)) {
        state.colors[action.color] = {}
      }
      var map = state.data;
      for (var i = 0; i < action.arr.length; i++) {
        if (!map.has(action.arr[i])) {
          map = map.set(action.arr[i], fromJS({
            timestamp: null,
            subject: null,
            paragraph: null,
            attachments: null,
            color: null,
            block: null,
            hash: action.arr[i]
          }))
        }
      }
      state.colors[action.color].array = action.arr;
      state.colors[action.color].hasBaseArray = true;
      if (typeof action.color === "number") {
        return { ...state,
          colors: state.colors,
          data: map,
          color: action.color
        }
      } else {
        return { ...state,
          colors: state.colors,
          data: map,
          thread: action.color
        }
      }

    case 'ADD_PENDING_TRANSACTION':
      const newMap = state.data.set(action.hash, fromJS({
        timestamp: null,
        data: null,
        block: null,
        hash: action.hash
      }))
      state.colors[action.color].array.push(action.hash);
      return { ...state,
        colors: state.colors,
        data: newMap
      }
    case 'ADD_COLOR_HASH':
      const setNewData = state.data.set(action.hash, fromJS({
        timestamp: action.data.timestamp,
        hash: action.hash,
        color: action.data.color,
        subject: action.data.subject,
        paragraph: action.data.paragraph,
        attachments: action.data.attachments,
      }))
      return { ...state,
        data: setNewData
      };
    default:
      return state;
  }
}

export default colors
