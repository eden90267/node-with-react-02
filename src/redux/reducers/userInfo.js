export function userInfo(state={}, action) {
  switch (action.type) {
    case 'USER_INFO':
      return {
        ...state,
        account: action.payload.account,
        email: action.payload.email,
        name: action.payload.name,
        login: true
      };
    case 'LOG_OUT':
      return {
        ...state,
        account: '',
        email: '',
        name: '',
        login: false
      };
    default:
      return state;
  }
}