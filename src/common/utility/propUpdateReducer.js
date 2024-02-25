import { v4 } from "uuid";

export const propUpdateReducer = (state, action) => {
  let _newState = {
  };

  switch (action.type) {
    case 'update':
      _newState = {
        ...state,
        [action.payload.key]: action.payload.value,
      };
      break;
    case 'updateMany':
      _newState = {
        ...state,
        ...action?.payload
      };
      break;
    case 'destructure':
      _newState = {
        ...state,
        ...action?.payload
      };

      break;
    case 'push':
      _newState = {
        ...state,
      };
      if (!_newState[action?.payload.key].includes(action.payload.value)) {
        _newState[action?.payload.key].push(action.payload.value);
      }
      break;
    case 'replace':
      _newState = {
        ...action?.payload
      };
      break;
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }

  if (action?.callback) {
    const invokeCallbackAsync = async () => {
      action.callback(_newState);
    }
    invokeCallbackAsync();
  }

  // console.log("propUpdateReducer", _newState);

  return _newState;
};