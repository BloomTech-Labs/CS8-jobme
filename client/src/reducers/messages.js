import actionTypes from '../actions/actionTypes';

const defaultState = {
  messageHistory: {},
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.GET_MESSAGES.IN_PROGRESS:
      return {
        ...state,
        inProgress: true,
      };
    case actionTypes.GET_MESSAGES.SUCCESS:
      return {
        ...state,
        inProgress: false,
        messageHistory: action.messageHistory,
      };
    case actionTypes.SEND_MESSAGE.IN_PROGRESS:
      return {
        ...state,
        inProgress: true,
      };
    case actionTypes.SEND_MESSAGE.SUCCESS:
      return {
        ...state,
        inProgress: false,
        messageHistory: action.messageHistory,
      };
    case actionTypes.SEND_MESSAGE.ERROR:
      return {
        ...state,
        inProgress: false,
      };
    case actionTypes.GET_CONVERSATIONS.SUCCESS:
      return {
        ...state,
        conversations: action.conversations,
      };
    case actionTypes.CLEAR_STATE:
      return defaultState;
    default:
      return state;
  }
};
